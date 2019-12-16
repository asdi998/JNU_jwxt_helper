var form = document.getElementById('Form1');
if(!form) location.reload();

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
		if(request.page=='get') sendResponse({result:"tongshi"});
		else{
			all=document.getElementsByClassName('DGItemStyle');
			if(request.m[3]){
				for( var i = 0 ; i < all.length ; i++ ){
					if(request.m[4]){
						for( var k = 0 ; k < request.m[0].length ; k++ ){
							if(all[i].childNodes[5].innerHTML.indexOf(request.m[0][k]) != -1){
								all[i].style.display="none";
							}
						}
					}
					if(request.m[5]){
						for( var k = 0 ; k < request.m[1].length ; k++ ){
							if(all[i].childNodes[4].innerHTML.indexOf(request.m[1][k]) != -1){
								all[i].style.display="none";
							}
						}
					}
				}
			}else{
				for( var i = 0 ; i < all.length ; i++ ){
					var a=false;var b=false;
					if(request.m[4]){
						for( var k = 0 ; k < request.m[0].length ; k++ ){
							if(all[i].childNodes[5].innerHTML.indexOf(request.m[0][k]) != -1){
								a=true;
								break;
							}
						}
					}else a=true;
					if(request.m[5]){
						for( var k = 0 ; k < request.m[1].length ; k++ ){
							if(all[i].childNodes[4].innerHTML.indexOf(request.m[1][k]) != -1){
								b=true;
								break;
							}
						}
					}else b=true;
					if(!a || !b) all[i].style.display="none";
				}
			}
			if(request.m[2]){
				for( var i = 0 ; i < all.length ; i++ ){
					if(Number(all[i].childNodes[10].innerHTML) <= Number(all[i].childNodes[11].innerHTML)){
						all[i].style.display="none";
					}
				}
			}
			if(all.length){
				addrec();
				alert("已隐藏不需要的课程。");
				sendResponse({result:true});
			}
		}
	}
)
function addrec() {
	var l=document.getElementById("pnlPg");
	if(l){
		l.childNodes[1].childNodes[1].childNodes[1].innerHTML='<input type="submit" value="取消筛选" id="btnRec">&nbsp;'+l.childNodes[1].childNodes[1].childNodes[1].innerHTML;
		var b = document.getElementById("btnRec"); 
		b.onclick=function(){ 
			recover();
			b.style.display='none';
			return false;
		} 
	}
}
function recover() {
	for( var i = 0 ; i < all.length ; i++ ) all[i].style.display="";
}
