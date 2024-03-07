import vscode from "vscode"
import { initWebviewPanel } from "../../util/webview_panel_util"

class javascript_playground {
    private panel: vscode.WebviewPanel | null = null

    private key = "javascript_playground"
    
    private initPanel = () => {
        initWebviewPanel(this.key, "JavaScript Playground", `static/action/${this.key}.html`)
    }
    
    public showPanel = () => {
        if (this.panel === null) {
            this.initPanel()
        }else if (!this.panel.visible) {
            this.panel.reveal()
        }
    }
}
const instance = new javascript_playground()

export default {
    showPanel: instance.showPanel,
}