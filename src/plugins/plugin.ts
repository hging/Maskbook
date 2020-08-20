import type { TypedMessage } from '../protocols/typed-message'

type PluginInjectFunction<T> =
    | {
          type: 'raw'
          init: (post: PostInfo, props: T, mountingPoint: HTMLDivElement) => () => void
      }
    | React.ComponentType<T>

export interface PluginConfig {
    pluginName: string
    identifier: string
    successDecryptionInspector?: PluginInjectFunction<{ message: TypedMessage }>
    postInspector?: PluginInjectFunction<{}>
    postDialogMetadataBadge?: Map<string, (metadata: any) => string>
}

const plugins = new Set<PluginConfig>()
export const PluginUI: ReadonlySet<PluginConfig> = plugins

import { GitcoinPluginDefine } from './Gitcoin/define'
import { RedPacketPluginDefine } from './Wallet/define'
import type { PostInfo } from '../social-network/PostInfo'
import { StorybookPluginDefine } from './Storybook/define'
import { FileServicePluginDefine } from './FileService/define'
import { TraderPluginDefine } from './Trader/define'
plugins.add(GitcoinPluginDefine)
plugins.add(RedPacketPluginDefine)
if (webpackEnv.genericTarget === 'browser') plugins.add(FileServicePluginDefine)
plugins.add(TraderPluginDefine)
if (process.env.STORYBOOK) {
    plugins.add(StorybookPluginDefine)
}
