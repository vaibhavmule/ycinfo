
var rules = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { urlMatches: 'airbnb\..*'}
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { urlMatches: 'stripe\..*' },
    }),
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rules]);
  });
});
