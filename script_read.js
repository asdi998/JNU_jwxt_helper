var btnY = document.getElementById('btnYes');
if (!btnY) {
	document.location.reload();
} else {
	sessionStorage['page'] = 'read';
	btnY.click();
}