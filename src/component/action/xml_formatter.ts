import vscode from "vscode"
import { initWebviewPanel } from "../../util/webview_panel_util"

let panel: vscode.WebviewPanel | null = null

const initPanel = () => {
    initWebviewPanel("xml_formatter_panel", "XML Formatter", "static/action/xml_formatter.html")
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