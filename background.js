function conditions() {
  var conditionList = []
  var request = new XMLHttpRequest();
  request.open('GET', 'https://raw.githubusercontent.com/vaibhavmule/ycinfo/master/ycstartup.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var ycStartups = JSON.parse(request.responseText);
      Object.keys(ycStartups).forEach(function (key) {
        conditionList.push(
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches:  key + '\\..*' }
          })
        )
      })
    } else {
      // We reached our target server, but it returned an error

    }
  };

  // request.onerror = function() {
  //   // There was a connection error of some sort
  // };

  request.send();

  return conditionList;
}

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: conditions(),
        actions: [ new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
