var bg = chrome.extension.getBackgroundPage();
chrome.storage.local.get(['hostUrl'], function(result) {
	if(result.hostUrl.indexOf('172') != -1){
		if(location.href.indexOf('qiangke.htm') != -1) location.href='qiangke2.htm';
		
		else if(bg.isRead('2')) location.href=result.hostUrl+'Secure/PaiKeXuanKe/wfrm_XK_XuanKe.aspx';
		else document.getElementById('btnYes').click();
	}
	else if(location.href.indexOf('qiangke3.htm') == -1 && bg.getstate()) location.href='qiangke3.htm';
	else if(bg.isRead('1')) location.href=result.hostUrl+'Secure/PaiKeXuanKe/wfrm_XK_XuanKe.aspx';
	else document.getElementById('btnYes').click();

});
