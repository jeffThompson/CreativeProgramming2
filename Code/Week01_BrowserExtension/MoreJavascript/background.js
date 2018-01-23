// sit in the background, waiting for the extension button to be clicked...
chrome.browserAction.onClicked.addListener( function(tab) {

	// ...when it's clicked, run the extension on the current tab
	chrome.tabs.executeScript( tab.id, {file: "extension.js"} );
});