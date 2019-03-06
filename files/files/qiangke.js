chrome.storage.local.get(['hostUrl'], function(result) {
	if(location.href.indexOf('qiangke.htm') != -1 && result.hostUrl.indexOf('172') != -1) location.href='qiangke2.htm';
	else document.getElementById('btnYes').click();
});