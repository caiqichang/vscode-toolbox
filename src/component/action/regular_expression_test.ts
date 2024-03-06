import vscode from "vscode"
import { initWebviewPanel } from "../../util/webview_panel_util"

let panel: vscode.WebviewPanel | null = null

const key = "regular_expression_test"

const initPanel = () => {
    initWebviewPanel(key, "Regular Expression Test", `static/action/${key}.html`)
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