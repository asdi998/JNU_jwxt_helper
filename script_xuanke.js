var form = document.getElementById('form1');
if(!form) location.reload();
else{
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
	}
}

function enterqiangke(){
	window.open("/Secure/PaiKeXuanKe/wfrm_XK_XuanKe.aspx","qiangke");
}

function ready(){
	top.window.document.title='选课-暨大教务系统';
	console.log("加载抢课页面");
	var ts=document.getElementById("lblTs");
	if(ts) ts.innerText=ts.innerText+"（抢课模式）";
	var l=document.getElementById("pnlPg");
	if(l){
		l.childNodes[1].childNodes[0].childNodes[1].innerHTML='<input type="submit" value="准备抢课" id="btnReady">&nbsp;'+l.childNodes[1].childNodes[0].childNodes[1].innerHTML;
		var b = document.getElementById("btnReady"); 
		b.onclick=function(){ 
			ready2();
			b.value='已准备';
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
				this.href='wfrm_XK_XuanKe.aspx';
				sessionStorage['count']=0;
				sessionStorage['num']=this.parentNode.parentNode.childNodes[2].innerText;
				sessionStorage['status']="start";
				return true;
			}
		}
	}
}
function start(){
	top.window.document.title='准备抢课-暨大教务系统';
	var Btn = document.getElementById('btnKkLb'); 
	var Btn2 = document.getElementById('dlstSsfw');
	if(Btn.disabled) {
		if(!Btn2.childNodes[9]){
			sessionStorage['status']='ready';
			alert("非选课第二阶段，不能抢课，请手动选课。");
			console.log('#非选课第二阶段，不能抢课，请手动选课。');
			return false;
		}
		var num = sessionStorage['num']
		var Btn3 = document.getElementById('btnSearch');
		var t = document.getElementById('txtPkbh');
		t.value=num;
		Btn2.childNodes[9].selected=true;
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
	top.window.document.title='抢课中-暨大教务系统';
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
				console.log('#发生异常，重新开始');
				sessionStorage['status']='start';
				sessionStorage['wait']="yes";
				p=true;
				var resetBtn = document.getElementById('btnNewReset');
				resetBtn.click();
			}
		}, 1)
	}
}
function success(){
	var btnX = document.getElementById("btnReturnX"); 
	if (btnX) {
		top.window.document.title='抢课失败？-暨大教务系统';
		sessionStorage['status']='ready';
		console.log('#选课失败了？');
		btnX.click();
	}
	var Btn = document.getElementById('btnWdXk'); 
	if(Btn){
		Btn.click();
		if(Btn.disabled) {
			top.window.document.title='抢课成功？-暨大教务系统';
			sessionStorage['status']='ready';
			Btn.disabled=false;
			console.log("#抢课貌似成功了？共计尝试"+sessionStorage['count']+"次");
			alert("#抢课貌似成功了？共计尝试"+sessionStorage['count']+"次");
		}
	}
}
