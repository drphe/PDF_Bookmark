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
                contexts: ['action']
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
    chrome.contextMenus.create({
        id: "drive",
        title: "Download View-Only Google Drive",
        contexts: ["action"]
    })
});
chrome.contextMenus.onClicked.addListener(({
    menuItemId,
    selectionText
}) => {
       "youglish" === menuItemId && (console.log("open popup youglish."), chrome.windows.create({
        url: "https://drphe.github.io/myquiz/youglish.html?" + selectionText.trim(),// "https://content-media.elsanow.co/_static_/youglish.html?" + selectionText.trim(),
        width: 625,
        height: 520,
        type: "popup",
        focused: !0,
        left: 200,
        top: 100
    }))
    if (menuItemId === 'searchPDF') {
        var o = selectionText.trim();
        var dest = HOST + encodeURI(o);
        chrome.tabs.create({
            url: dest
        });
    }  else if ("drive" === menuItemId) {
        getpdf();
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
async function getpdf() {
    var jsarr = ["./drive/pdf.js"]
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
                        console.log("Insert drive pdf code: " + tabs[0].title);
                    });
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function createPopup(){
const [tab] = await chrome.tabs.query ({active: true, currentWindow: true});
  // Thực thi một hàm để mở popup
  chrome.scripting.executeScript ({
    target: {tabId: tab.id},
    function: openPopup,
  });
}
// Hàm để mở popup
function openPopup () {
    myPopup && !myPopup.closed && myPopup.close()
    myPopup = window.open("", "popup", `width=600,height=500,top=${parseInt((window.screen.height - 500) / 2)},left=${parseInt((window.screen.width - 600) / 2)}`);
    var html = ``;
    myPopup.document.write(html);
    myPopup.document.addEventListener("keyup", function(e) {
        27 === e.keyCode && (e.preventDefault(), myPopup.close())
    })
}
/////////từ điển
const rightMenudata = [{
	id : "lingq",
	title: "LingQ",
	contexts: ["action"],
	link : "https://www.lingq.com/en/learn/en/web/library"
},{
	id : "voicetube",
	title: "Voicetube",
	contexts: ["action"],
	link : "https://www.voicetube.com/"

},{
	id : "engnovate", 
	title: "Engnovate",
	contexts: ["action"],
	link: "https://engnovate.com/learn-videos/"

}];
function getLink(menuid) {
  for (let i = 0; i < rightMenudata.length; i++) {
    if (rightMenudata[i].id === menuid) {
      return rightMenudata[i].link;
    }
  }
  return null;
}
chrome.runtime.onInstalled.addListener(async() =>{
        chrome.contextMenus.create({
                title: 'Learn English through Video',
                type: 'normal',
                id: 'link',
                contexts: ["action"]
         });
	rightMenudata.forEach(s => chrome.contextMenus.create({
	    parentId: "link",
            id: s.id,
            title: s.title,
            contexts: s.contexts
        }));
});
chrome.contextMenus.onClicked.addListener(({menuItemId, selectionText}) => {
	var link = getLink(menuItemId);
	link && chrome.tabs.create({ url: link})
});
