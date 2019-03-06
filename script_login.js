document.title='登录-暨大教务系统';
var btnLogin =document.getElementById('btnLogin');
if(!btnLogin) location.reload();
sessionStorage['page']='login';
reload_times=0;
var vcode = document.getElementsByTagName('img')[1];
vcode.onerror=function(){ 
	if(reload_times<100){
		vcode.src=vcode.src+'?';
		reload_times++;
	}
}