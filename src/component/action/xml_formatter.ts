import vscode from "vscode"
import { initWebviewPanel } from "../../util/webview_panel_util"

let panel: vscode.WebviewPanel | null = null

const key = "xml_formatter"

const initPanel = () => {
    initWebviewPanel(key, "XML Formatter", `static/action/${key}.html`)
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