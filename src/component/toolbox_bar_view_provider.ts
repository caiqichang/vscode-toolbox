import vscode from "vscode"
import { App } from "../util/app"
import * as fileUtil from "../util/file_util"
import * as common from "../util/common"
import json_formatter from "./action/json_formatter"

class ToolboxBarProvider implements vscode.WebviewViewProvider {

    public static readonly name = "toolbox_bar_view"

    public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void> {

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(App.instance().getContext()?.extensionPath ?? "")],
        }

        webviewView.webview.html = fileUtil.readExtensionFile("static/toolbox_bar.html").toString()
            .replaceAll("${extensionPath}", common.createWebviewViewUri(webviewView, "").toString())
            .replaceAll("${version}", Math.random().toString())

        webviewView.webview.onDidReceiveMessage(message => {
            switch (message) {
                case "JSON Formatter": {
                    json_formatter.showPanel()
                    break;
                }
                case "Regular Expression Test": {

                    break;
                }
            }
        })
    }

}

export {
    ToolboxBarProvider,
}