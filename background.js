function onError(error) {
    console.log(`Error: ${error}`);
}

function sendCommand(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            { command: "true" }
        ).then(_ => { }
        ).catch(onError)
    }
}

browser.commands.onCommand.addListener(function (command) {
    if (command != "toggle-compact") return
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendCommand).catch(onError);
})