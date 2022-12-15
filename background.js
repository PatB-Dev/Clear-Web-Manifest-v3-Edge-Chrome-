const onIcon = "./icons/PatOn.png";
const offTicon = "./icons/PatOff.png";
let removeElement = false;

const setDefaultIcon = (tabId) => {
    removeElement = false;
    chrome.browserAction.setIcon({ path: offTicon });

    // Quand on change de fenêtre
    if (tabId) {
        chrome.tabs.sendMessage(tabId, { removeElement });
    }
};

// Lorsque les onglets changent, setDefaultIcon est appelé
chrome.tabs.onActivated.addListener((activeInfo) => setDefaultIcon(activeInfo.tabId));

chrome.browserAction.onClicked.addListener((tab) => {
    removeElement = !removeElement;
    chrome.browserAction.setIcon({ path: removeElement ? onIcon : offTicon });
    chrome.tabs.sendMessage(tab.id, { removeElement });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const status = changeInfo.status;
    if (status !== "loading") {
        return;
    }
    setDefaultIcon();
});
