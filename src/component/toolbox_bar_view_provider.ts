import vscode from "vscode"
import { App } from "../util/app"
import * as fileUtil from "../util/file_util"
import * as common from "../util/common"
import json_formatter from "./action/json_formatter"
import xml_formatter from "./action/xml_formatter"
import javascript_playground from "./action/javascript_playground"
import base64_convertor from "./action/base64_convertor"
import regular_expression_test from "./action/regular_expression_test"

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
            .replaceAll("${colorTheme}", common.getColorTheme())

        webviewView.webview.onDidReceiveMessage(message => {
            switch (message) {
                case "JSON Formatter": {
                    json_formatter.showPanel()
                    break;
                }
                case "Regular Expression Test": {
                    regular_expression_test.showPanel()
                    break;
                }
                case "XML Formatter": {
                    xml_formatter.showPanel()
                    break;
                }
                case "Base64 Convertor": {
                    base64_convertor.showPanel()
                    break;
                }
                case "JavaScript Playground": {
                    javascript_playground.showPanel()
                    break;
                }
            }
        })
    }

}

export {
    ToolboxBarProvider,
}