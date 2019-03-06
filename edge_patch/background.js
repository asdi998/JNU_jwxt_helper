chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if(request.haslogin=='true') sessionStorage['hasLogin']='true';
    sendResponse({code: "ok",hasLogin: sessionStorage['hasLogin']});
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