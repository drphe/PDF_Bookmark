const HOST = "https://vi.zlibrary-global.se/s/?q=";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Tìm trên z-library",
        id: "searchPDF",
        contexts: ["selection"]
    })
});
chrome.contextMenus.onClicked.addListener(({
    menuItemId,
    selectionText
}) => {
    if (menuItemId === 'searchPDF') {
        var o = selectionText.trim();
        var dest = HOST + encodeURI(o);
        chrome.tabs.create({
            url: dest
        });

    }
});


chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        url: 'popup.html'
    })
})
chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.action === "open_new_tab") {
        chrome.tabs.create({
            url: req.url
        });
        res({});
    }
});
