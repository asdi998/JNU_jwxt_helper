skipstart='1'; //跳过重筛选
var form = document.getElementById('form1');
if(!form) location.reload();
else{
	footer = "-暨大教务系统";
	if(sessionStorage['autolist'])
		autolist=(sessionStorage['autolist'].split(','));
	else
		autolist=false;
	if(top.window.location.pathname=="/Secure/PaiKeXuanKe/wfrm_XK_XuanKe.aspx"){
		var status=sessionStorage['status'];
		if(status=='undefined') status='ready';
		if(!status) status='ready';
		if(status=="ready") ready();
		else if(status=="start") start();
		else if(status=="run") run(form);
		else if(status=="success") success();
	}else{
		var l=document.getElementById("btnExport0");
		l.outerHTML=l.outerHTML+'&nbsp;<input type="button" name="qiangkemode" value="进入抢课模式" id="qiangkemode" style="width:87px;">'
		var b = document.getElementById("qiangkemode"); 
		b.onclick=function(){ 
			enterqiangke();
			return false;
		}
		var ts=document.getElementById("lblTs");
		if(ts && sessionStorage['hasUpdate']=='true') ts.innerHTML=ts.innerHTML+'（<a href="'+sessionStorage['updateUrl']+'" target="JNU_jwxt_update">获取新版插件<\/a>）';
	}
}

function enterqiangke(){
	window.open("/Secure/PaiKeXuanKe/wfrm_XK_XuanKe.aspx","qiangke");
}

function ready(){
	if(sessionStorage['hasUpdate']=='true'){
		footer = '-发现插件可更新！';
	}
	top.window.document.title='选课'+footer;
	console.log("加载抢课页面");
	if(autolist)
		sessionStorage['autolist']='';
	var ts=document.getElementById("lblTs");
	if(ts){
		ts.innerText=ts.innerText+"（抢课模式）";
		if(sessionStorage['hasUpdate']=='true') ts.innerHTML=ts.innerHTML+'（<a href="'+sessionStorage['updateUrl']+'" target="JNU_jwxt_update">获取新版插件<\/a>）';
	}
	var l=document.getElementById("pnlPg");
	if(l){
		l.childNodes[1].childNodes[0].childNodes[1].innerHTML='<input type="submit" value="准备抢课" id="btnReady">&nbsp;'+l.childNodes[1].childNodes[0].childNodes[1].innerHTML;
		l.childNodes[1].childNodes[0].childNodes[1].innerHTML='<input type="submit" value="批量选课" id="btnBat">&nbsp;'+l.childNodes[1].childNodes[0].childNodes[1].innerHTML;
		var b = document.getElementById("btnReady"); 
		b.onclick=function(){ 
			ready2();
			b.value='已准备';
			return false;
		} 
		var b2 = document.getElementById("btnBat"); 
		b2.onclick=function(){ 
			var allnumt=prompt("请输入班号，用英文逗号分开。");
			var allnum=(allnumt.split(','));
			var checknum=true;
			for(var i=0;i<allnum.length;i++){
				if(allnum[i].length!=9)
					checknum=false;
			}
			if(!checknum){
				alert('班号输入格式错误。');
			}else{
				sessionStorage['autolist']=allnumt;
				sessionStorage['status']='start';
				document.getElementById('btnNewReset').click();
			}
			return false;
		} 
	}
}
function ready2(){
	var Btn = document.getElementById('btnKkLb'); 
	if(Btn.disabled){
		var all=document.getElementsByClassName('DGHeaderStyle')[0].parentNode.children;
		for( var i = 1 ; i < all.length  ; i++ ){
			all[i].childNodes[1].childNodes[0].onclick=function(){ 
				sessionStorage['count']=0;
				sessionStorage['num']=this.parentNode.parentNode.childNodes[2].innerText;
				if(skipstart=='0'){
					this.href='wfrm_XK_XuanKe.aspx';
					sessionStorage['status']="start";
					return true;
				}else{
					sessionStorage['status']="run";
					location.reload();
					return false;
				}
			}
		}
	}
}
function start(){
	top.window.document.title='准备抢课'+footer;
	var Btn = document.getElementById('btnKkLb'); 
	var Btn2 = document.getElementById('dlstSsfw');
	if(!Btn2){
		var resetBtn = document.getElementById('btnNewReset');
		if(resetBtn){
			sessionStorage['wait']=="yes"
			resetBtn.click();
		}
	}
	if(Btn.disabled) {
		if(autolist){
			sessionStorage['num']=autolist[0];
		}
		if(Btn2.childNodes[9])
			Btn2.childNodes[9].selected=true;
		var num = sessionStorage['num'];
		var Btn3 = document.getElementById('btnSearch');
		var t = document.getElementById('txtPkbh');
		t.value=num;
		console.log('#开始抢课');
		sessionStorage['status']='run';
		if(sessionStorage['wait']=="yes"){
			setTimeout(() => {
				Btn3.click();
			}, 2000)
		}else Btn3.click();
	}else Btn.click();
}
function run(form){
	top.window.document.title='抢课中'+footer;
	var p=false;
	window.alert = function(){ return false; }
	form.onsubmit=function(){ return p; }
	var btnConfirm = document.getElementById('btnQr');
	if (btnConfirm) {
		p=true;
		sessionStorage['status']='success';
		btnConfirm.click();
	}else{
		var l=document.getElementById("pnlPg");
		if(l){
			l.childNodes[1].childNodes[0].childNodes[1].innerHTML='<input type="submit" value="退出抢课" id="btnExit">&nbsp;'+l.childNodes[1].childNodes[0].childNodes[1].innerHTML;
			var b = document.getElementById("btnExit"); 
			b.onclick=function(){ 
				p=true;
				sessionStorage['status']='ready';
				console.log('#退出抢课');
				return true;
			}
		}else{
			sessionStorage['status']='ready';
			p=true;
		}
		setTimeout(() => {
			var selectTr = document.getElementsByClassName('DGSelectedItemStyle')[0];
			if(!selectTr) var selectTr = document.getElementsByClassName('DGItemStyle')[0];
			if(selectTr){
				var selectBtn = selectTr.childNodes[1].childNodes[0];
				var selectCap = selectTr.childNodes[11].innerHTML;
				var selected = selectTr.childNodes[12].innerHTML;
				var count=Number(sessionStorage['count'])+1;
				selectTr.childNodes[1].childNodes[0].innerText='抢课中';
				sessionStorage['count']=count;
				console.log('#正在抢课中...尝试第'+count+"次");
				if (Number(selectCap) != Number(selected)) {
					p=true;
					selectBtn.click();
				} else {
					setTimeout(() => {
						p=true;
						var refreshBtn = document.getElementById('btnNewRefresh');
						refreshBtn.click();
					}, 2000)
				}
			}else{
				if(autolist){
					console.log('#发生异常，跳过课程：'+sessionStorage['num']);
					push('自动批量选课发生异常，跳过课程：'+sessionStorage['num']);
					nextAuto();
				}
				else if(skipstart=='0'){
					console.log('#发生异常，重新开始');
					sessionStorage['status']='start';
					sessionStorage['wait']="yes";
					p=true;
					var resetBtn = document.getElementById('btnNewReset');
					resetBtn.click();
				}else{
					alert('发生异常，停止抢课。');
					sessionStorage['status']='ready';
				}
			}
		}, 1)
	}
}
function success(){
	var btnX = document.getElementById("btnReturnX"); 
	if (btnX) {
		window.alert = function(){ return false; }
		top.window.document.title='抢课失败？'+footer;
		sessionStorage['status']='ready';
		console.log('#选课失败了？');
		if(autolist){
			push('自动批量选课发生异常，跳过课程：'+sessionStorage['num']);
			nextAuto();
		}else
			alert('#选课貌似失败了？');
		btnX.click();
	}else{
		var Btn = document.getElementById('btnWdXk'); 
		if(Btn){
			Btn.click();
			if(Btn.disabled) {
				top.window.document.title='抢课成功？'+footer;
				sessionStorage['status']='ready';
				Btn.disabled=false;
				console.log("#抢课貌似成功了？共计尝试"+sessionStorage['count']+"次");
				if(autolist){
					nextAuto();
				}else{
					push('抢课成功！课程班号：'+sessionStorage['num']);
					alert("#抢课貌似成功了？共计尝试"+sessionStorage['count']+"次");
				}
			}
		}
	}
}

function push(pushText){
	pushText=encodeURI(pushText);
	chrome.extension.sendRequest({getparam: "key"}, function(response) {
		if(response.key.length>50){
			xmlhttp=new XMLHttpRequest();
			xmlhttp.open("GET",'https://sc.ftqq.com/'+response.key+'.send?text='+pushText,true);
			xmlhttp.send();
		}
	});
}

function nextAuto(){
	autolist.splice(0,1);
	sessionStorage['autolist']=autolist;
	if(autolist.length>0){
		sessionStorage['status']='start';
		location.href=location.href;
	}else{
		sessionStorage['status']='ready';
		push('所有的自动批量选课完成。');
		console.log("#所有的自动批量选课完成。");
		alert("#所有的自动批量选课完成。");
	}
}