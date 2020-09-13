var b = document.getElementById("sb");
var s = document.getElementById("sites");
var BtnLogin = document.getElementById("enter_login");
var BtnIndex = document.getElementById("enter_index");
var BtnQiang = document.getElementById("enter_qiangke");
var BtnSet = document.getElementById("setO");
var aGetKey = document.getElementById("getkey");
var pushKey = document.getElementById("key");
var BtnSetKey = document.getElementById("setkey");
var bg = chrome.extension.getBackgroundPage();

s.onchange = function () {
	if (s.value == 'jwxt') document.getElementById("sites2").style.display = '';
	else document.getElementById("sites2").style.display = 'none';
}

chrome.storage.local.get(['key'], function (result) {
	if (result.key) {
		pushKey.style.display = 'none';
		BtnSetKey.value = '更改';
	}

	BtnSetKey.onclick = function () {
		chrome.storage.local.set({
			'key': pushKey.value
		}, function () {});
		location.reload();
		return false;
	}
});

aGetKey.onclick = function () {
	focusOrCreateTab("http://sc.ftqq.com/?c=code");
	return false;
}

chrome.storage.local.get(['hostUrl'], function (result) {
	chrome.storage.local.get(['hostUrl2'], function (result2) {
		if (!result2.hostUrl2) {
			chrome.storage.local.set({
				'hostUrl2': '1'
			}, function () {});
			document.getElementById("sites2").value = '1';
		}
		document.getElementById("sites2").value = result2.hostUrl2;
		if (result2.hostUrl2 == '1') {
			bg.setstate('');
		} else {
			bg.setstate('true');
		}
	});
	if (!result.hostUrl) {
		chrome.storage.local.set({
			'hostUrl': 'https://jwxt.jnu.edu.cn/'
		}, function () {});
		sessionStorage['n'] = '1';
		document.getElementById("sites2").style.display = '';
	} else if (result.hostUrl.indexOf('172') != -1) {
		document.getElementById("sites").value = '172';
		sessionStorage['n'] = '2';
	} else {
		sessionStorage['n'] = '1';
		document.getElementById("sites2").style.display = '';
	}
	BtnIndex.onclick = function () {
		focusOrCreateTab(result.hostUrl + "IndexPage.aspx");
		return false;
	}
	b.onclick = function () {
		getMessage();
	}
	BtnSet.onclick = function () {
		var sites = document.getElementById("sites").value;
		var sites2 = document.getElementById("sites2").value;
		if (sites == 'jwxt') hostUrl = 'https://jwxt.jnu.edu.cn/';
		else if (sites == '172') hostUrl = 'http://202.116.0.172:8083/';
		chrome.storage.local.set({
			'hostUrl': hostUrl
		}, function () {});
		chrome.storage.local.set({
			'hostUrl2': sites2
		}, function () {});
		location.reload();
		return false;
	}
	if (bg.isLogin(sessionStorage['n'])) {
		BtnLogin.value = '切换账号';
		BtnLogin.onclick = function () {
			bg.exitLogin(sessionStorage['n']);
			location.reload();
			return false;
		}
		BtnQiang.onclick = function () {
			focusOrCreateTab(chrome.runtime.getURL("files/qiangke.htm"));
			return false;
		}
	} else {
		BtnIndex.style.display = 'none';
		BtnLogin.onclick = function () {
			focusOrCreateTab(chrome.runtime.getURL("files/login.htm"));
			return false;
		}
		BtnQiang.value = '快速登录并选课';
		BtnQiang.onclick = function () {
			bg.FastGo(sessionStorage['n']);
			focusOrCreateTab(chrome.runtime.getURL("files/login.htm"));
			return false;
		}
	}
});

chrome.tabs.query({
	active: true,
	currentWindow: true
}, function (tabs) {
	if (tabs[0].url.indexOf('IndexPage') != -1) {
		chrome.tabs.sendMessage(tabs[0].id, {
			page: "get"
		}, function (response) {
			if (response) {
				if (response.result == "tongshi") {
					document.getElementById("shaixuan").style.display = '';
					document.getElementById("leibie").style.display = '';
				} else if (response.result == "paike") document.getElementById("shaixuan").style.display = '';
			}
		});
	}
});

function getMessage() {
	var t = document.getElementsByName("time[]");
	var c = document.getElementsByName("class[]");
	var sfull = document.getElementsByName("noneedfull")[1].checked;
	var mode = document.getElementsByName("mode")[0].checked;
	var stime = document.getElementsByName("stime")[1].checked;
	var sclass = document.getElementsByName("sclass")[1].checked;
	var tr = new Array();
	var cr = new Array();
	var r = new Array();
	for (var i = 0; i < t.length; i++) {
		if (t[i].checked) tr[tr.length] = t[i].value;
	}
	for (var i = 0; i < c.length; i++) {
		if (c[i].checked) cr[cr.length] = c[i].value;
	}
	r[0] = tr;
	r[1] = cr;
	r[2] = sfull;
	r[3] = mode;
	r[4] = stime;
	r[5] = sclass;
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			m: r
		}, function (response) {
			console.log(response.result);
		});
	});
	return true;
}

function focusOrCreateTab(url) {
	chrome.windows.getAll({
		"populate": true
	}, function (windows) {
		var existing_tab = null;
		for (var i in windows) {
			var tabs = windows[i].tabs;
			for (var j in tabs) {
				var tab = tabs[j];
				if (tab.url == url) {
					existing_tab = tab;
					break;
				}
			}
		}
		if (existing_tab) {
			chrome.tabs.update(existing_tab.id, {
				"selected": true
			});
		} else {
			chrome.tabs.create({
				"url": url,
				"selected": true
			});
		}
	});
}