const HOST = "https://vi.zlibrary-global.se/s/?q=";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Tìm trên z-library",
        id: "searchPDF",
        contexts: ["selection"]
    })
     chrome.contextMenus.create({
                title: 'Tạo mã QR',
                type: 'normal',
                id: 'qrcode',
                contexts: ['action','page']
     });
    chrome.contextMenus.create({
        id: "tools",
        title: "Cho phép Copy...",
        contexts: ["action"]
    })
    chrome.contextMenus.create({
        id: "coban",
        parentId: "tools",
        title: "Cơ bản",
        contexts: ["action"]
    })
    chrome.contextMenus.create({
        id: "nangcao",
        parentId: "tools",
        title: 'Nâng cao',
        contexts: ['action']
    });
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
    } else if ("coban" === menuItemId) {
        injectContent(0);
    } else if ("nangcao" === menuItemId) {
        injectContent(1);
    }else if (menuItemId === 'qrcode') {
            chrome.windows.create({
                url: chrome.runtime.getURL("qrcode.html"),
                width: 300,
                height: 420,
                type: "popup",
                focused: !0,
                left: 500,
                top: 100
            })
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

// enable copy

async function injectContent(aggressiveMode) {
    var crStorageNameEnableProduct = "enable_product";
    var crStorageNameAggressiveMode = "aggressive_mode";

    var newStorageData = {};
    var jsarr = ["./copy/enable_copy.js"]
    newStorageData[crStorageNameEnableProduct] = true;
    newStorageData[crStorageNameAggressiveMode] = aggressiveMode;
    // set as enabled
    await chrome.storage.local.set(newStorageData);
    console.log(newStorageData);

    try {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            if (tabs.length > 0) {
                let tabId = tabs[0].id;
                let tabUrl = tabs[0].url;
                !tabUrl.startsWith("edge://") && !tabUrl.startsWith("chrome://") &&
                    !tabUrl.startsWith("chrome-extension://") &&
                    chrome.scripting.executeScript({
                        target: {
                            tabId: tabId
                        },
                        files: jsarr
                    }, function() {
                        console.log("Enable copy Tab: " + tabs[0].title);
                    });
            }
        });
    } catch (error) {
        console.error(error);
    }
}