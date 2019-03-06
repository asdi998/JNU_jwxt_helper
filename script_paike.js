var form = document.getElementById('Form1');
if(!form) location.reload();
sessionStorage['page']='paike';

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
		if(request.page=='get') sendResponse({result:"paike"});
		else{
			var all=document.getElementsByClassName('DGHeaderStyle')[0].parentNode.children;
			if(request.m[4]){
				if(request.m[3]){
					for( var i = 1 ; i < all.length ; i++ ){
						for( var k = 0 ; k < request.m[0].length ; k++ ){
							if(all[i].childNodes[9].innerHTML.indexOf(request.m[0][k]) != -1){
								all[i].style.display="none";
							}
						}
					}
				}else{
					for( var i = 1  ; i < all.length ; i++ ){
						var a=false;
						for( var k = 0 ; k < request.m[0].length ; k++ ){
							if(all[i].childNodes[9].innerText.indexOf(request.m[0][k]) != -1){
								a=true;
								break;
							}
						}
						if(!a) all[i].style.display="none";
					}
				}
			}
			if(request.m[2]){
				for( var i = 1 ; i < all.length ; i++ ){
					if(Number(all[i].childNodes[3].innerHTML) <= Number(all[i].childNodes[4].innerHTML)){
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
		l.childNodes[1].childNodes[0].childNodes[1].innerHTML='<input type="submit" value="取消筛选" id="btnRec">&nbsp;'+l.childNodes[1].childNodes[0].childNodes[1].innerHTML;
		var b = document.getElementById("btnRec"); 
		b.onclick=function(){ 
			recover();
			b.style.display='none';
			return false;
		} 
	}
}
function recover() {
	var all=document.getElementsByClassName('DGHeaderStyle')[0].parentNode.children;
	for( var i = 1 ; i < all.length ; i++ ) all[i].style.display="";
}
