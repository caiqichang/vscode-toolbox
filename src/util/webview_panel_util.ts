import vscode from "vscode"
import * as fileUtil from "../util/file_util"
import * as common from "../util/common"

const initWebviewPanel = (id: string, title: string, htmlPath: string) => {
    let panel: vscode.WebviewPanel | null = common.createWebviewPanel(id, title)
    panel.onDidDispose(() => panel = null)
    panel.webview.html = fileUtil.readExtensionFile(htmlPath).toString()
        .replaceAll("${extensionPath}", common.createWebviewUri(panel, "").toString())
        .replaceAll("${version}", Math.random().toString())
        .replaceAll("${colorTheme}", common.getColorTheme())
    panel.iconPath = common.createUri("/resources/logo.png")
    return panel
}

export {
    initWebviewPanel,
}