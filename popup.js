/**
 * @file popup.js
 * @author asdi998 (https://www.asdi998.com/)
 * @date 2018-7-5
 * @description 暨南大学抢课插件
 */
 
var b = document.getElementById("sb"); 
b.onclick=function(){ 
	getMessage();
} 

function getMessage(){
	var t = document.getElementsByName("time[]");
	var c = document.getElementsByName("class[]");
	var sfull = document.getElementsByName("noneedfull")[1].checked;
	var mode = document.getElementsByName("mode")[0].checked;
	var stime = document.getElementsByName("stime")[1].checked;
	var sclass = document.getElementsByName("sclass")[1].checked;
	var tr=new Array();
	var cr=new Array();
	var r=new Array();
	for( var i = 0 ; i < t.length ; i++ ){
		if(t[i].checked) tr[tr.length]=t[i].value;
	}
	for( var i = 0 ; i < c.length ; i++ ){
		if(c[i].checked) cr[cr.length]=c[i].value;
	}
	r[0]=tr;
	r[1]=cr;
	r[2]=sfull;
	r[3]=mode;
	r[4]=stime;
	r[5]=sclass;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {m:r}, function(response) {
			console.log(response.result);
		});  
	});
	return true;
}
