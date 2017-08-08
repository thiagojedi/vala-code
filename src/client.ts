import {
    Position,
    LanguageClient,
    LanguageClientOptions,
    SettingMonitor,
    ServerOptions,
    TransportKind,
    ClientCapabilities,
    RevealOutputChannelOn,
    NotificationType0
} from 'vscode-languageclient';

import {
    ExtensionContext
} from 'vscode'

import { spawn } from 'child_process'
import * as path from 'path'

export class ValaLanguageClient {

    ls: LanguageClient | null
    
    constructor(context: ExtensionContext) {

        let serverModule = context.asAbsolutePath(path.join('vala-language-server', 'build', 'vala-language-server'));

        let clientOptions: LanguageClientOptions = {
            documentSelector: ['vala'],
            revealOutputChannelOn: RevealOutputChannelOn.Info            
        };

        let serverOptions: ServerOptions = {
            run: {
                command: serverModule,
                transport: TransportKind.stdio
            },
            debug: {
                command: serverModule,
                options: {
                    env: {
                        G_MESSAGES_DEBUG: 'all',
                        JSONRPC_DEBUG: 1
                    }
                },
                transport: TransportKind.stdio
            }
        };

        this.ls = new LanguageClient('Vala Language Server', serverOptions, clientOptions)

        this.ls.start()
    }

    dispose() {
        this.ls!.stop()

        this.ls = null
    }
}
