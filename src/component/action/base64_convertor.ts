import vscode from "vscode"
import { initWebviewPanel } from "../../util/webview_panel_util"

let panel: vscode.WebviewPanel | null = null

const key = "base64_convertor"

const initPanel = () => {
    initWebviewPanel(key, "Base64 Convertor", `static/action/${key}.html`)
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