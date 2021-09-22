let isCompact = false
let selectors = [
    '[aria-label="Servers sidebar"]',
    '[class^=sidebar]'
]

function doCompact() {
    isCompact = !isCompact
    let visibility = isCompact ? "collapse" : "visible"
    selectors.forEach(selector =>
        document.querySelector(selector).style.visibility = visibility
    )
}

browser.runtime.onMessage.addListener(_ => {
    doCompact()
    return Promise.resolve({ response: "OK" })
})