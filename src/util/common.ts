import vscode from "vscode"
import { App } from "../util/app"
import * as fileUtil from "./file_util"

const getEditorSelection = (): string => {
    return vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor?.selection) ?? ""
}

const showError = (content: unknown) => {
    console.log(content)
    vscode.window.showErrorMessage(content as string)
}

const showNotification = (content: string) => {
    vscode.window.showInformationMessage(content)
}

const showStatusBar = (content: string) => {
    vscode.window.setStatusBarMessage(content)
}

const showModal = (content: string) => {
    vscode.window.showInformationMessage("Translation", {
        modal: true,
        detail: content,
    })
}

enum MessageMode {
    notification = "notification",
    modal = "modal",
    statusBar = "statusBar",
}

enum ConfigKey {
    test = "test",
}

const readPackageJson = (): any => {
    App.instance().getContext()?.extension?.packageJSON
}

const configTitle = "toolbox"

const getUserConfig = <T>(key: ConfigKey): T | null => {
    let packageConfig = readPackageJson()?.contributes?.configuration?.properties ?? {}
    let config = vscode.workspace.getConfiguration(configTitle)
    return config.get<T>(key) ?? packageConfig?.[`${configTitle}.${key}`]?.default ?? null
}

const createWebviewPanel = (id: string, title: string): vscode.WebviewPanel => {
    return vscode.window.createWebviewPanel(id, title,
        vscode.window.activeTextEditor ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active,
        {
            enableScripts: true,
            enableFindWidget: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.file(App.instance().getContext()?.extensionPath ?? "")],
        },
    )
}

const createWebviewUri = (webviewPanel: vscode.WebviewPanel, subpath: string): vscode.Uri => {
    return webviewPanel.webview.asWebviewUri(createUri(subpath))
}

const createWebviewViewUri = (webviewView: vscode.WebviewView, subpath: string): vscode.Uri => {
    return webviewView.webview.asWebviewUri(createUri(subpath))
}

const createUri = (subpath: string): vscode.Uri => {
    return vscode.Uri.file(`${App.instance().getContext()?.extensionPath ?? ""}${subpath}`)
}

const exportToFile = (content: string, fileName: string) => {
    vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
    }).then(uri => {
        if (uri && uri.length > 0) {
            let path = `${uri[0].fsPath}/${fileName}`
            fileUtil.writeFile(path, content)
            showNotification(`Export to file ${path}`)
        }
    })
}

const getColorTheme = () => {
    return ({
        1: "Light",
        2: "Dark",
        3: "HighContrast",
        4: "HighContrastLight",
    })[vscode.window.activeColorTheme.kind];
}

export {
    MessageMode,
    getEditorSelection,
    ConfigKey,
    getUserConfig,
    readPackageJson,
    showError,
    showNotification,
    showStatusBar,
    showModal,
    createWebviewPanel,
    createWebviewUri,
    createUri,
    exportToFile,
    createWebviewViewUri,
    getColorTheme,
}