const API_URL = "https://your-backend.com/api/check-url";
const INCOGNITO_ALERT_URL = "https://your-backend.com/api/incognito-alert";
console.log("Background worker loaded");

let currentTabId = null;
let currentUrl = null;
let intervalId = null;

// Send alert if incognito is being used without permission
async function alertIncognitoOpen(url) {
  console.log("Incognito tab detected without permission. Sending alert to backend:", url);

  chrome.storage.local.get("token", async ({ jwtToken }) => {
    if (!jwtToken) {
      console.warn("No JWT token found.");
      return;
    }

    await fetch('http://localhost:5000/api/monitor/incognito-alert', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        incognitoDetected: true,
        url: url,
        timestamp: new Date().toISOString()
      })
    });
  });
}


async function checkUrlStatus(url) {
  const data = { blocked: false, timeLimitExceeded: false };

  if (url === 'codeforces.com') {
    data.blocked = true;
  }


  if (data.blocked || data.timeLimitExceeded) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url.includes(url)) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: function () {
              alert("This site is restricted!");
            }
          }).then(() => {
            chrome.tabs.remove(tab.id);
          });
        }
      });
    });
  }
}

function startTracking(tabId, url) {
  clearInterval(intervalId);
  currentTabId = tabId;
  currentUrl = url;

  intervalId = setInterval(() => {
    checkUrlStatus(currentUrl);
  }, 5000);
}

// Tab activated
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    console.log("Tab activated", tab);
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url && tab.url.startsWith("http")) {
    if (tab.incognito) {
      chrome.extension.isAllowedIncognitoAccess((isAllowed) => {
        if (!isAllowed) {
          alertIncognitoOpen(new URL(tab.url).hostname);
        } else {
          startTracking(tab.id, new URL(tab.url).hostname);
        }
      });
    } else {
      startTracking(tab.id, new URL(tab.url).hostname);
    }
  }
});

// Tab updated

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("Tab updated", changeInfo.url);
    // chrome.extension.isAllowedIncognitoAccess((isAllowed) => {
    //     // console.log("Is allowed incognito access?", isAllowed);
    //   });      
  if (tab.active && changeInfo.url && changeInfo.url.startsWith("http")) {
    
    if (tab.incognito) {
      chrome.extension.isAllowedIncognitoAccess((isAllowed) => {
        console.log("Is allowed incognito access?", isAllowed);
        if (!isAllowed) {
          alertIncognitoOpen(new URL(changeInfo.url).hostname);
        } else {
          startTracking(tab.id, new URL(changeInfo.url).hostname);
        }
      });
    } else {
      startTracking(tab.id, new URL(changeInfo.url).hostname);
    }
  }
});
function monitorIncognitoPermission() {
    console.log('monitorIncognitoPermission')
    setInterval(() => {
      chrome.extension.isAllowedIncognitoAccess((isAllowed) => {
        console.log(isAllowed)
        if (!isAllowed) {
        //   chrome.windows.getAll({ populate: false }, (windows) => {
        //     const hasIncognito = windows.some(win => win.incognito);
        //     if (hasIncognito) {
              console.log("Incognito window detected without permission");
              alertIncognitoOpen("unknown"); // Send generic alert
            // }
        //   });
        }
      });
    }, 10000); // check every 10 seconds
  }
  
  monitorIncognitoPermission();

