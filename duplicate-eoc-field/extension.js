// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "duplicate-eoc-field" is now active!');
	let activeEditor = vscode.window.activeTextEditor;
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

	vscode.workspace.onDidChangeTextDocument(activeEditor => {
		
		if (activeEditor) {
			var eocfieldArray = [];
			var duplicateLineNumbers = []
			const lines = activeEditor.document.getText().split('\n');
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				if(line.includes('<eocfield')){
					var eocfieldName = line.match(/name="(.*?)"/);
					if(eocfieldArray.includes(eocfieldName[1])){
						duplicateLineNumbers.push(i);
					}
					eocfieldArray.push(eocfieldName[1]);
					
				}
			}
			const duplicates = eocfieldArray.filter((item, index) => eocfieldArray.indexOf(item) !== index);
			if (duplicates.length == 1){
				statusBarItem.text = `${duplicates.length} duplicate eocfield`;
				statusBarItem.show();
			}
			else if(duplicates.length > 1){
				statusBarItem.text = `${duplicates.length} duplicate eocfields`;
				statusBarItem.show();
			}
			else{
				statusBarItem.hide();
			}
		}
	}, null, context.subscriptions);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
