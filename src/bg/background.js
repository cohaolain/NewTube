// if you checked "fancy-settings" in extensionizr.com, uncomment this lines
//example of using a message handler from the inject scripts
/*
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
});
*/
/*
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.pageAction.show(tab.id);
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.message === "activate_icon") {
        chrome.pageAction.show(sender.tab.id);
    }
});

//content-script.js
chrome.runtime.sendMessage({"message": "activate_icon"});
*/


// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
    try {
        if (tab.url.indexOf('https://www.youtube.com') == 0) {
            chrome.pageAction.show(tabId);
        }
    } catch (e) {
        
    }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        sendResponse({data: localStorage[request.key]});
    }
    else
      sendResponse({}); // snub them.
});

chrome.runtime.onInstalled.addListener(function() {
    localStorage['store.settings.mainSwitch'] = "false";
});
