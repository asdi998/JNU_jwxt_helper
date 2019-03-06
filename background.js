chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return {redirectUrl: chrome.runtime.getURL("files/login.htm")}; 
	},
	{urls: ["http://202.116.0.172:8083/","https://jwxt.jnu.edu.cn/"]},
	["blocking"]);
	
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if(details.initiator=="https://jwxt.jnu.edu.cn" || details.initiator=="http://202.116.0.172:8083") exitLogin();
	},
	{urls: ["http://202.116.0.172:8083/Login.aspx","https://jwxt.jnu.edu.cn/Login.aspx"]},
	["blocking"]);
	
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if(hasLogin() && isFast()){
			sessionStorage['fast']='';
			return {redirectUrl: chrome.runtime.getURL("files/qiangke.htm")}; 
		}
	},
	{urls: ["http://202.116.0.172:8083/IndexPage.aspx","https://jwxt.jnu.edu.cn/IndexPage.aspx"]},
	["blocking"]);
	
chrome.webRequest.onBeforeRedirect.addListener(
	function(details) {
		Logined();
	},
	{urls: ["http://202.116.0.172:8083/Login.aspx","https://jwxt.jnu.edu.cn/Login.aspx"]},
	["responseHeaders"]);
	
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({hasLogin: sessionStorage['hasLogin']});
  });
function hasLogin(){
	if(sessionStorage['hasLogin']=='true'){
		return true;
	}else{
		return false;
	}
}
function exitLogin(){
	sessionStorage['hasLogin']='';
}
function Logined(){
	sessionStorage['hasLogin']='true';
}
function FastGo(){
	sessionStorage['fast']='true';
}
function isFast(){
	if(sessionStorage['fast']=='true'){
		return true;
	}else{
		return false;
	}
}