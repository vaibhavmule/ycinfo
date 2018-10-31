function conditions() {
  return fetch(`https://raw.githubusercontent.com/vaibhavmule/ycinfo/master/ycstartup.json`)
    .then(function(res) {
    if (res.status === 200) {
      return res.json();
    }
    })
    .then(function(ycStartups) {
      return Object.keys(ycStartups).map(function (key) {
        return new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { urlMatches:  key + '\\..*' }
        })
      });
    })
}
 
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    conditions().then(function(conditions) {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: conditions,
          actions: [ new chrome.declarativeContent.ShowPageAction()]
        }
      ]);
    });
   
  });
});
