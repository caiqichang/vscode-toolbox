import vscode from "vscode"
import { initWebviewPanel } from "../../util/webview_panel_util"

let panel: vscode.WebviewPanel | null = null

const initPanel = () => {
    initWebviewPanel("json_formatter_panel", "JSON Formatter", "static/action/json_formatter.html")
}

const showPanel = () => {
    if (panel === null) {
        initPanel()
    }else if (!panel.visible) {
        panel.reveal()
    }
}

export default {
    showPanel,
}