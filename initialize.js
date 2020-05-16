//console.log("Initialize");
// to autoresize iframes
function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  obj.style.width = obj.contentWindow.document.body.scrollWidth + 'px';
}

//Clear all the Storage
localStorage.removeItem("reactorStart");
localStorage.removeItem("talentStart");
localStorage.removeItem("reactorVOL");
localStorage.removeItem("talentVOL");
localStorage.removeItem("provider");
localStorage.removeItem("talentURL");
localStorage.removeItem("reactorURL");
localStorage.removeItem("reactortimer");
sessionStorage.clear();
// get the url parameters
var url_string = window.location.href;
var url = new URL(url_string);
// This section reads in the various commands and pops them on the storage stack
// Reactor start time
//console.log("Start parameter is: " + url.searchParams.get("Start"));
if (url.searchParams.get("Start") !== null) {
	var reactorStart = url.searchParams.get("Start");
	//  console.log("Reactor Start Time: " + url.searchParams.get("Start"));
	var hms = reactorStart;   // your input string
	var a = hms.split(':'); // split it at the colons
	var seconds = 0;
	var mult = 1;
	while (a.length > 0) {
		seconds += mult * parseInt(a.pop(), 10);
		mult *= 60;
	}
//  console.log(seconds);
  localStorage.setItem("reactorStart", seconds );
}

if (url.searchParams.get("talentStart") !== null) {
	var TalentStart = url.searchParams.get("talentStart");
	var hms = TalentStart;   
	var a = hms.split(':');
	var seconds = 0;
	var mult = 1;
	while (a.length > 0) {
		seconds += mult * parseInt(a.pop(), 10);
		mult *= 60;
	}
  localStorage.setItem("talentStart", seconds );
}

// Control commands
if (url.searchParams.get("Control") !== null) {
  controlList = url.searchParams.get("Control");
//  console.log("Control list is: " + controlList);
  //3:08,pause;3:15,play;3:20,pause;3:30,play
  //localStorage.setItem("reactorVOL", reactorVOL );
}
// split the control list to pairs, then single items and store
// in the sessionStorage as <hh:mm:ss>:<command> key:pair
  var commandPairs = controlList.split(";");
  var j;
  for (j=0;j<commandPairs.length;j++) {
//    console.log("command pairs are: " + commandPairs[j]);
    // Split again on the , and add to sessionStorage
    var commandPair = commandPairs[j].split(",")
//    console.log("the pair is: " + commandPair[0] + " : " + commandPair[1]);

	var hms = commandPair[0];   // your input string
	var a = hms.split(':'); // split it at the colons
	var seconds = 0;
	var mult = 1;
	while (a.length > 0) {
		seconds += mult * parseInt(a.pop(), 10);
		mult *= 60;
	}
//    console.log("***** Cseconds is: " + Cseconds + " The commandPair for this is: " + commandPair[1]);
    sessionStorage.setItem(seconds,commandPair[1]);
  }
  var k = 0;
  for (k=0;k<sessionStorage.length;k++) {
//    console.log("@@@@@@@@@@@@@@ session storage item " + k + " is: " + sessionStorage.getItem(sessionStorage.key(k)));
  }

// default volume
var reactorVOL = 50;
if (url.searchParams.get("reactorVOL") !== null) {
  reactorVOL = url.searchParams.get("reactorVOL");
}
localStorage.setItem("reactorVOL", reactorVOL);

var talentVOL = 50;
if (url.searchParams.get("talentVOL") !== null) {
  talentVOL = url.searchParams.get("talentVOL");
}
// ---- retro compatibility ----
// Youtube talent video
if (url.searchParams.get("YTtalentVOL") !== null) {
  talentVOL = url.searchParams.get("YTtalentVOL");
}
// DailyMotion talent video
if (url.searchParams.get("DMtalentVOL") !== null) {
  talentVOL = url.searchParams.get("DMtalentVOL");
}
if (url.searchParams.get("VMtalentVOL") !== null) {
  talentVOL = url.searchParams.get("VMtalentVOL");
}
if (url.searchParams.get("StreamabletalentVOL") !== null) {
  talentVOL = url.searchParams.get("StreamabletalentVOL");
}
// ---- retro compatibility end ----
localStorage.setItem("talentVOL", talentVOL);


localStorage.setItem("provider", URLUtils.detectProvider(url.searchParams.get("talent")));
localStorage.setItem("talentURL", decodeURIComponent(url.searchParams.get("talent")));
localStorage.setItem("reactorURL", decodeURIComponent(url.searchParams.get("reactor")));

// ---- retro compatibility ----
if (url.searchParams.get("YTtalent") !== null) {
	localStorage.setItem("talentURL", url.searchParams.get("YTtalent"));
	localStorage.setItem("provider", "YT");
}
if (url.searchParams.get("DMtalent") !== null){
	localStorage.setItem("talentURL", url.searchParams.get("DMtalent"));
	localStorage.setItem("provider", "DM");
}
if (url.searchParams.get("VMtalent") !== null){
	localStorage.setItem("talentURL", url.searchParams.get("VMtalent"));
	localStorage.setItem("provider", "VM");
}
if (url.searchParams.get("Streamabletalent") !== null){
	localStorage.setItem("talentURL", url.searchParams.get("Streamabletalent"));
	localStorage.setItem("provider", "Streamable");
}
// ---- retro compatibility ----
 
  var i;
  for (i = 0; i < localStorage.length; i++) {
//    console.log("Local storage #" + i + "is: " + localStorage.key(i));
  }
//  console.log("=======================================================");
  for (i = 1; i <= sessionStorage.length; i++) {
//    console.log("Session storage #" + i + "is: " + sessionStorage.key(i));
  }
  // console.log("talentVideoURL: " + talentVideoURL);

