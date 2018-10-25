function conditions() {
  return fetch(`https://raw.githubusercontent.com/vaibhavmule/ycinfo/master/ycstartup.json`)
    .then(function(res) {
    if (res.status === 200) {
      return res.json();
    }
    })
    .then(function(ycStartups) {
    console.log(ycStartups);
    return Object.keys(ycStartups).map(function (key) {
      return new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlMatches:  key + '\\..*a' }
      })
    });
    })
}
 
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    conditions().then(function(res) {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: res,
          actions: [ new chrome.declarativeContent.ShowPageAction()]
        }
      ]);
    });
   
  });
});
