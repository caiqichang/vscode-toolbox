import vscode from "vscode"
import { App } from "./util/app"

const activate = (context: vscode.ExtensionContext) => {
    App.instance().setContext(context);

    
}

export {
    activate,
}