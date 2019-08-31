if(document.getElementsByTagName('i')[0] && document.getElementsByTagName('i')[0].innerText.indexOf('validationKey') != -1)
{
	chrome.extension.sendRequest({setparam: "state"}, function(response) {
		console.log(response.state);
	});
	location.href=location.href;
}else{
	document.title='登录-暨大教务系统';
	var btnLogin =document.getElementById('btnLogin');
	if(!btnLogin) location.reload();
	sessionStorage['page']='login';
	reload_times=0;
	var vcode = document.getElementsByTagName('img')[1];
	if(vcode){
		vcode.onerror=function(){ 
			if(reload_times<10){
				vcode.src=vcode.src+'?';
				reload_times++;
			}
		}
	}
}