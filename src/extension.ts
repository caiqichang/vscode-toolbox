import vscode from "vscode"
import { App } from "./util/app"
import { ToolboxViewProvider } from "./component/toolbox_view_provider"

const activate = (context: vscode.ExtensionContext) => {
    App.instance().setContext(context);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(ToolboxViewProvider.name, new ToolboxViewProvider())
    )
}

export {
    activate,
}