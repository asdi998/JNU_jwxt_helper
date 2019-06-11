var ver=0.31;

document.title='首页-暨大教务系统';
var main = document.getElementById('mainFrame');
if(!main) document.location.reload();
sessionStorage['page']='index';
if(sessionStorage['hasUpdate']!='true') sessionStorage['hasUpdate']='false';
if(sessionStorage['verCheck']!='true') getUpdate(ver);
else if(sessionStorage['hasUpdate']=='true') document.title='首页-发现插件可更新！';
function getUpdate(ver){
	sessionStorage['ver']=ver;
	sessionStorage['verCheck']='true';
	var new_element = document.createElement("script");
	new_element.setAttribute("type", "text/javascript");
	new_element.setAttribute("src", "https:\/\/api.asdi998.com\/JNU_jwxt_helper_update.php");
	document.body.appendChild(new_element);
}