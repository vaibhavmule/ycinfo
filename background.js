
var rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'stripe.com', schemes: ['https'] },
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.airbnb.co.in', schemes: ['https']}
  }),
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });
});

