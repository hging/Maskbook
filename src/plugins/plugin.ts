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
import { RedPacketPluginDefine } from './RedPacket/define'
import type { PostInfo } from '../social-network/PostInfo'
import { StorybookPluginDefine } from './Storybook/define'
import { FileServicePluginDefine } from './FileService/define'
import { Flags } from '../utils/flags'
plugins.add(GitcoinPluginDefine)
plugins.add(RedPacketPluginDefine)
if (Flags.file_service_enabled) plugins.add(FileServicePluginDefine)
if (process.env.STORYBOOK) {
    plugins.add(StorybookPluginDefine)
}
