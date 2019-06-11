var bg = chrome.extension.getBackgroundPage();
var BtnLogin = document.getElementById("btnLogin"); 
var vcode = document.getElementById("vcode"); 
var BtnSave = document.getElementById("btnFogetPswd"); 
var reload_times=0;
BtnLogin.onclick=function(){ 
	return checkUserPassword();
}
vcode.onerror=function(){ 
	if(reload_times<100){
		vcode.src=vcode.src+'?';
		reload_times++;
	}
}
vcode.onclick=function(){ 
	vcode.src=vcode.src+'?';
}
chrome.storage.local.get(['jwxt_account','jwxt_passwd','jwxt_save','hostUrl'], function(result) {
	if(result.jwxt_save=='true' && result.jwxt_account && result.jwxt_passwd){
		document.getElementById("txtYHBS").value=result.jwxt_account;
		document.getElementById("txtYHMM").value=result.jwxt_passwd;
	}else{
		chrome.storage.local.set({'jwxt_account': '','jwxt_passwd': '','jwxt_save': ''}, function(){});
	}
	if(result.hostUrl.indexOf('http') == -1) chrome.storage.local.set({'hostUrl': 'https://jwxt.jnu.edu.cn/'}, function(){});
	else{
		if(result.hostUrl.indexOf('172') != -1){
			if(location.href.indexOf('login.htm') != -1) location.href='login2.htm';
			else if(bg.isLogin('2')) location.href=result.hostUrl+'IndexPage.aspx';
		}else if(bg.isLogin('1')) location.href=result.hostUrl+'IndexPage.aspx';
	}
});
BtnSave.onclick=function(){ 
	var account=document.getElementById("txtYHBS").value; 
	var passwd=document.getElementById("txtYHMM").value;
	chrome.storage.local.set({'jwxt_account': account,'jwxt_passwd': passwd,'jwxt_save': 'true'}, function() {
		if(account&&passwd) alert('已保存账号信息。');
		else  alert('已清除账号信息。');
	});
}
function checkUserPassword() {
	var password = document.getElementById("txtYHMM").value;
	if (password == "") {
		alert("请输入登录密码");
		return false;
	}
	return true;
}
