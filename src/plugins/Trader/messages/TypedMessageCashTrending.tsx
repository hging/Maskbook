import React, { useState } from 'react'
import { TypedMessageAnchor, registerTypedMessageRenderer } from '../../../protocols/typed-message'
import { Link, Typography } from '@material-ui/core'
import type { TypedMessageRendererProps } from '../../../components/InjectedComponents/TypedMessageRenderer'
import { MessageCenter } from '../messages'
import Services from '../../../extension/service'

export interface TypedMessageCashTrending extends Omit<TypedMessageAnchor, 'type'> {
    readonly type: 'x-cash-trending'
    readonly name: string
}

export function makeTypedMessageCashTrending(message: TypedMessageAnchor) {
    return {
        ...message,
        type: 'x-cash-trending',
        name: message.content.substr(1).toLowerCase(),
    } as TypedMessageCashTrending
}

registerTypedMessageRenderer('x-cash-trending', {
    component: DefaultTypedMessageCashTrendingRenderer,
    id: 'co.maskbook.trader.cash_trending',
    priority: 0,
})

function DefaultTypedMessageCashTrendingRenderer(props: TypedMessageRendererProps<TypedMessageCashTrending>) {
    const [openTimer, setOpenTimer] = useState<NodeJS.Timeout | null>(null)
    const onMouseEnter = async (ev: React.MouseEvent<HTMLAnchorElement>) => {
        // should cache before async operations
        const element = ev.currentTarget
        const timer = setTimeout(async () => {
            const available = await Services.Plugin.invokePlugin(
                'maskbook.trader',
                'checkAvailability',
                props.message.name,
            )
            if (available)
                MessageCenter.emit('cashTagObserved', {
                    name: props.message.name,
                    element,
                })
        }, 300)
        if (openTimer !== null) clearTimeout(timer)
        setOpenTimer(timer)
    }
    const onMouseLeave = () => {
        if (openTimer !== null) clearTimeout(openTimer)
    }
    return (
        <Typography component="span" color="textPrimary" variant="body1">
            <Link href={props.message.href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {props.message.content}
            </Link>
        </Typography>
    )
}
