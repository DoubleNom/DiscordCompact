let isCompact = false
let selectors = [
    '[aria-label="Servers sidebar"]',
    '[class^=sidebar]'
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function doCompact() {
    isCompact = !isCompact
    let visibility = isCompact ? "collapse" : "visible"
    selectors.forEach(selector =>
        document.querySelector(selector).style.visibility = visibility
    )
}

async function addIcon() {
    let element
    while (true) {
        await sleep(100)
        if (document == null) continue
        element = document.querySelector('[class^="chat"]')
        if (element == null) continue
        element = element.querySelector('[class^=children]')
        if (element == null) continue
        break
    }

    if (element.parentNode.firstChild.id != "compact_icon") {
        fetch(browser.runtime.getURL("/icon.html"))
            .then(r => {
                r.text()
                    .then(html => {
                        html = DOMPurify.sanitize(html)
                        element.insertAdjacentHTML('beforebegin', html)
                        element.parentNode.firstChild.addEventListener("click", () => doCompact())
                    })
            })
        return true
    } else {
        return false
    }
}

browser.runtime.onMessage.addListener(_ => {
    doCompact()
    return Promise.resolve({ response: "OK" })
})

addIcon()