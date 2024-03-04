import vscode from "vscode"
import { App } from "./util/app"
import { ToolboxBarProvider } from "./component/toolbox_bar_view_provider"

const activate = (context: vscode.ExtensionContext) => {
    App.instance().setContext(context);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(ToolboxBarProvider.name, new ToolboxBarProvider())
    )
}

export {
    activate,
}