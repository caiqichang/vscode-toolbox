import vscode from "vscode"
import { initWebviewPanel } from "../../util/webview_panel_util"

class xml_formatter {
    private panel: vscode.WebviewPanel | null = null

    private key = "xml_formatter"
    
    private initPanel = () => {
        initWebviewPanel(this.key, "XML Formatter", `static/action/${this.key}.html`)
    }
    
    public showPanel = () => {
        if (this.panel === null) {
            this.initPanel()
        }else if (!this.panel.visible) {
            this.panel.reveal()
        }
    }
}
const instance = new xml_formatter()

export default {
    showPanel: instance.showPanel,
}