
function getCurrentTab(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		callback(tabs[0].url);
	});
}

// Thanks to BlackDivine on https://stackoverflow.com/a/16934798/3259815 
function parseURL(url){
	parsed_url = {}

	if ( url == null || url.length == 0 )
			return parsed_url;

	protocol_i = url.indexOf('://');
	parsed_url.protocol = url.substr(0,protocol_i);

	remaining_url = url.substr(protocol_i + 3, url.length);
	domain_i = remaining_url.indexOf('/');
	domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
	parsed_url.domain = remaining_url.substr(0, domain_i);
	parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

	domain_parts = parsed_url.domain.split('.');
	switch ( domain_parts.length ){
			case 2:
				parsed_url.subdomain = null;
				parsed_url.host = domain_parts[0];
				parsed_url.tld = domain_parts[1];
				break;
			case 3:
				parsed_url.subdomain = domain_parts[0];
				parsed_url.host = domain_parts[1];
				parsed_url.tld = domain_parts[2];
				break;
			case 4:
				parsed_url.subdomain = domain_parts[0];
				parsed_url.host = domain_parts[1];
				parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
				break;
	}

	parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;

	return parsed_url;
}

document.addEventListener('DOMContentLoaded', function() {
	getCurrentTab(function(url) {
		var startup = ycStartups[(parseURL(url)).host];
		var htmlToAppend = ""
		Object.keys(startup).forEach(function(key, index){
			if (key != "name" && key != "url" && key != "class" && key != "description") {
				var titleCaseKey = key.charAt(0).toUpperCase() + key.substr(1);
				htmlToAppend += ("<strong>" + titleCaseKey + ":</strong> " + startup[key] + "<br/><br/>" )
			}
		})

		document.getElementById('ycinfo').innerHTML += `
		
		<h2>${startup.name}</h2>
		<strong>Description:</strong> ${startup.description} <br/><br/>
		<strong>Class: </strong> ${startup.class} <br/><br/>
		<strong>Website: </strong> <a href=${startup.url} target="_blank">${startup.name}</a> <br/><br/>
		
		` + htmlToAppend
	})
})
