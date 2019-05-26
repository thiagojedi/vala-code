import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
    RevealOutputChannelOn
} from 'vscode-languageclient';

import {
    ExtensionContext
} from 'vscode'

import * as path from 'path'

export class ValaLanguageClient {

    ls: LanguageClient | null

    constructor(context: ExtensionContext) {

        let serverModule = context.asAbsolutePath(path.join('vala-language-server', 'build', 'vala-language-server'));
        // let gvlsModule = context.asAbsolutePath(path.join('gvls', 'build', 'src','lsp','org.gnome.GVls'));

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
