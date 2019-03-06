chrome.runtime.sendMessage({}, function(response) {
	var btnY = document.getElementById('btnYes');
	if(response.hasLogin=='true' && !btnY) document.location.reload();
	if(btnY){
		sessionStorage['page']='read';
		btnY.click();
	}
});
