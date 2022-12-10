let removeElement = false
const onIcon = "icons/PatOn.png"
const offTicon = "icons/PatOff.png"

setDefaultIcon = (tabId) => {
    removeElement = false
    chrome.browserAction.setIcon({ path: offTicon })

    //qaund on change de fenetre
    if (tabId) {
        chrome.tabs.sendMessage(tabId, removeElement)
    }
}

// when tabs get changed, setDefaultIcon is called
chrome.tabs.onActivated.addListener((activeInfo) => setDefaultIcon(activeInfo.tabId))

chrome.browserAction.onClicked.addListener((tab) => {
    removeElement = !removeElement
    chrome.browserAction.setIcon({ path: removeElement ? onIcon : offTicon })
    chrome.tabs.sendMessage(tab.id, removeElement)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    status = changeInfo.status
    if (status !== "loading") {
        return
    }
    setDefaultIcon()
})