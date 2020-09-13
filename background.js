ver = 0.39;

chrome.webRequest.onResponseStarted.addListener(
	function (details) {
		if (details.statusCode >= 500) {
			chrome.tabs.executeScript(details.tabId, {
				code: "location.reload();",
				frameId: details.frameId
			});
		}
	}, {
		urls: [
			"http://202.116.0.172:8083/",
			"https://jwxt.jnu.edu.cn/",
			"*://*/Login.aspx",
			"*://*/IndexPage.aspx",
			"*://*/Secure/PaiKeXuanKe/wfrm_XK_XuanKe.aspx",
			"*://*/Secure/PaiKeXuanKe/wfrm_Pk_RlRscx.aspx",
			"*://*/Secure/PaiKeXuanKe/wfrm_Pk_Ggxxk.aspx",
			"*://*/areaLeft.aspx",
			"*://*/Secure/PaiKeXuanKe/wfrm_Xk_ReadMeCn.aspx",
			"*://*/areaMain.aspx",
			"*://*/ValidateCode.aspx"
		]
	},
	["responseHeaders"]);

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		if (details.initiator == "https://jwxt.jnu.edu.cn") return {
			redirectUrl: chrome.runtime.getURL("files/login.htm")
		};
		else if (details.initiator == "http://202.116.0.172:8083") return {
			redirectUrl: chrome.runtime.getURL("files/login2.htm")
		};
	}, {
		urls: ["http://202.116.0.172:8083/", "https://jwxt.jnu.edu.cn/"]
	},
	["blocking"]);

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		if (details.method == 'GET') {
			if (details.initiator == "https://jwxt.jnu.edu.cn") exitLogin('1');
			else if (details.initiator == "http://202.116.0.172:8083") exitLogin('2');
		}
	}, {
		urls: ["http://202.116.0.172:8083/Login.aspx", "https://jwxt.jnu.edu.cn/Login.aspx"]
	},
	["blocking"]);

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		if (details.url.indexOf("jwxt") != -1) var n = '1';
		else var n = '2';
		if (isLogin(n) && isFast(n)) {
			sessionStorage['fast' + n] = '';
			return {
				redirectUrl: chrome.runtime.getURL("files/qiangke.htm")
			};
		}
	}, {
		urls: ["http://202.116.0.172:8083/IndexPage.aspx", "https://jwxt.jnu.edu.cn/IndexPage.aspx"]
	},
	["blocking"]);

chrome.webRequest.onBeforeRedirect.addListener(
	function (details) {
		if (details.redirectUrl.indexOf("IndexPage") != -1) {
			if (details.url.indexOf("jwxt") != -1) Logined('1');
			else Logined('2');
		}
	}, {
		urls: ["http://202.116.0.172:8083/Login.aspx", "https://jwxt.jnu.edu.cn/Login.aspx"]
	},
	["responseHeaders"]);

chrome.webRequest.onBeforeRedirect.addListener(
	function (details) {
		if (details.url.indexOf("jwxt") != -1) readed('1');
		else readed('2');
	}, {
		urls: ["http://202.116.0.172:8083/Secure/PaiKeXuanKe/wfrm_Xk_ReadMeCn.aspx", "https://jwxt.jnu.edu.cn/Secure/PaiKeXuanKe/wfrm_Xk_ReadMeCn.aspx"]
	},
	["responseHeaders"]);

chrome.extension.onRequest.addListener(
	function (request, sender, sendResponse) {
		if (request.getparam == "key") {
			chrome.storage.local.get(['key'], function (result) {
				sendResponse({
					key: result.key ? result.key : ''
				});
			});
		} else if (request.getparam == "ver") {
			sendResponse({
				ver: getVer()
			});
		} else if (request.setparam == "state") {
			setstate();
			sendResponse({
				state: getstate()
			});
		} else if (request.getkey) {
			sendResponse({
				value: sessionStorage[request.getkey]
			});
		} else if (request.setkey) {
			sessionStorage[request.setkey] = request.setvalue;
			sendResponse({
				value: sessionStorage[request.setkey]
			});
		}
	});

function getVer() {
	return ver;
}

function setstate(s) {
	sessionStorage['switchstate'] = s;
	return true;
}

function getstate() {
	if (sessionStorage['switchstate'] == 'true')
		return true;
	else
		return false;
}

function hasLogin() {
	if (sessionStorage['hasLogin1'] == 'true' || sessionStorage['hasLogin2'] == 'true') {
		return true;
	} else {
		return false;
	}
}

function isLogin(n) {
	if (sessionStorage['hasLogin' + n] == 'true') {
		return true;
	} else {
		return false;
	}
}

function exitLogin(n) {
	sessionStorage['hasLogin' + n] = '';
	sessionStorage['read' + n] = '';
}

function Logined(n) {
	sessionStorage['hasLogin' + n] = 'true';
}

function readed(n) {
	sessionStorage['read' + n] = 'true';
}

function isRead(n) {
	if (sessionStorage['read' + n] == 'true') {
		return true;
	} else {
		return false;
	}
}

function FastGo(n) {
	sessionStorage['fast' + n] = 'true';
}

function isFast(n) {
	if (sessionStorage['fast' + n] == 'true') {
		return true;
	} else {
		return false;
	}
}