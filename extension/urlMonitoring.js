const API_URL = "https://your-backend.com/api/check-url";
const INCOGNITO_ALERT_URL = "http://localhost:5000";
const ACTIVE_TAB_UPDATE_URL = "http://localhost:5000/api/monitor/active-tab"; // Backend endpoint to receive active tab data
console.log("Background worker loaded");

let currentTabId = null;
let currentUrl = null;
let intervalId = null;

// Send alert if incognito is being used without permission
async function alertIncognitoOpen(url) {
  console.log("Incognito tab detected without permission. Sending alert to backend:", url);

  chrome.storage.local.get("token", async ({ token }) => {
    if (!token) {
      console.warn("No JWT token found.");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/monitor/incognito-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          incognitoDetected: true,
          url: url,
          timestamp: new Date().toISOString(),
        }),
      });
      console.log("Incognito alert sent successfully.");
    } catch (error) {
      console.error("Failed to send incognito alert:", error);
    }
  });
}

// Send the active tab information to the backend
async function updateActiveTabToBackend() {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];

    if (activeTab && activeTab.url) {
      const currentTabUrl = new URL(activeTab.url).hostname;
      console.log("Sending active tab data to backend:", currentTabUrl);

      chrome.storage.local.get("token", async ({ token }) => {
        if (!token) {
          console.warn("No JWT token found.");
          return;
        }

        try {
          await fetch("http://localhost:5000/api/monitor/check-url", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
              url: currentTabUrl,
              timestamp: new Date().toISOString(),
            }),
          });
          console.log("Active tab data sent successfully.");
        } catch (error) {
          console.error("Failed to send active tab data:", error);
        }
      });
    }
  });
}

// Check if the URL is blocked or exceeds time limits
async function checkUrlStatus(url) {
  const data = { blocked: false, timeLimitExceeded: false };

  // Check if the URL is blocked or exceeds time limits
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

// Start tracking the URL on a set interval
function startTracking(tabId, url) {
  clearInterval(intervalId); // Clear any existing interval
  currentTabId = tabId;
  currentUrl = url;

  intervalId = setInterval(() => {
    checkUrlStatus(currentUrl);
  }, 5000); // Check every 5 seconds
}

// Monitor active tab and handle URL checks
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.log("Tab activated", activeInfo.tabId);
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

// Monitor when a tab's URL is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Tab updated", changeInfo.url);

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

// Monitor incognito window access permissions
function monitorIncognitoPermission() {
  console.log('Monitoring Incognito Permission');

  setInterval(() => {
    chrome.extension.isAllowedIncognitoAccess((isAllowed) => {
      if (!isAllowed) {
        console.log("Incognito window detected without permission");
        alertIncognitoOpen("unknown"); // Send generic alert if incognito detected
      }
    });
  }, 10000); // Check every 10 seconds
}

// Start monitoring for incognito access
monitorIncognitoPermission();

// Send active tab data to the backend every 60 seconds
setInterval(() => {
  updateActiveTabToBackend();
}, 600); // Update backend every 1 minute
