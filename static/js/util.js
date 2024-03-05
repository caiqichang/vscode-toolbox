const vscode = acquireVsCodeApi()

const copy = obj => obj ? JSON.parse(JSON.stringify(obj)) : obj

const getEditorColorTheme = theme => {
    return ({
        "Light": "vs",
        "Dark": "vs-dark",
        "HighContrast": "hc-black",
        "HighContrastLight": "hc-light",
    })[theme];
}

