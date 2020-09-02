import React from 'react'
import classNames from 'classnames'
import { useColorStyles } from '../../../utils/theme'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            fontSize: 'inherit',
            marginLeft: theme.spacing(1),
        },
        icon: {
            marginRight: theme.spacing(0.5),
        },
    })
})

export interface PriceChangedProps {
    amount: number
}

export function PriceChanged(props: PriceChangedProps) {
    const color = useColorStyles()
    const classes = useStyles()
    return (
        <span className={classNames(classes.root, props.amount > 0 ? color.success : color.error)}>
            {props.amount > 0 ? <ArrowDropUpIcon className={classes.icon} /> : null}
            {props.amount < 0 ? <ArrowDropDownIcon className={classes.icon} /> : null}
            {props.amount.toFixed(2)}%
        </span>
    )
}
