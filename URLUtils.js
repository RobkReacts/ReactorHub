var URLUtils = {
	
	YT : {},
	DM : {},
	VM : {},
	Streamable : {}
	
}

//general
URLUtils.detectProvider = function detectProvider(url)
{
	var youtubeUrls = [/youtube/,/youtu\.be/];
	var dailymotionUrls = [/dailymotion/,/dai\.ly/];
	var vimeoUrls = [/vimeo/];
	var streamableUrls = [/streamable/];
	
	if(youtubeUrls.some(function(rx) { return rx.test(url);})) return "YT";
	if(dailymotionUrls.some(function(rx) { return rx.test(url);})) return "DM";
	if(vimeoUrls.some(function(rx) { return rx.test(url);})) return "VM";
	if(streamableUrls.some(function(rx) { return rx.test(url);})) return "Streamable";
	
	return "UNKNOWN";
}


// YT
URLUtils.YT.getVideoIdFromURL = function getVideoIdFromURL(param_url) {

	// from : https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
	var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	var matches = param_url.match(rx);
	var result = matches[1];

	return result;
}

URLUtils.YT.getStartTimeFromURL = function getStartTimeFromURL(param_url) {
	var startTime = 0;
	
	var url = new URL(param_url);

	if (url.searchParams.get("t") !== null) {
		startTime = url.searchParams.get("t");
	}
	
	return startTime;
}
	
	
	
// DM	
URLUtils.DM.getVideoIdFromURL = function getVideoIdFromURL(param_url) {
	var url = new URL(param_url);
	var url_splitted = url.pathname.split("/");
	var result = url_splitted[url_splitted.length - 1];

	return result;
}

URLUtils.DM.getStartTimeFromURL = function getStartTimeFromURL(param_url) {
	var startTime = 0;
	
	var url = new URL(param_url);
	if (url.searchParams.get("start") !== null) {
		startTime = url.searchParams.get("start");
	}
	return startTime;
}
			
			
// VM 
URLUtils.VM.getVideoIdFromURL = function getVideoIdFromURL(param_url) {
	var url = new URL(param_url);
	var url_splitted = url.pathname.split("/");
	var result = url_splitted[url_splitted.length - 1];

	return result;
}
			
URLUtils.VM.getStartTimeFromURL = function getStartTimeFromURL(param_url) {
	var startTime = 0;
	
	var url = new URL(param_url);
	var rx = /t=(\d+)s/;
	var matches = url.hash.match(rx);
	
	if(matches)
	{
		startTime = matches[1];
	}
	return startTime;
}
			
			
			
// streamable
URLUtils.Streamable.getVideoIdFromURL = function getVideoIdFromURL(param_url) {
	var url = new URL(param_url);
	var url_splitted = url.pathname.split("/");
	var result = url_splitted[url_splitted.length - 1];

	return result;
}

URLUtils.Streamable.getStartTimeFromURL = function getStartTimeFromURL(param_url) {
	var startTime = 0;
	// no way to have a custom start time in the url AFAIK
	
	return startTime;
}