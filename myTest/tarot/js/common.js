function getParmas(){
	var parmas = {}
	var str = window.location.hash;
	var search = str.substr(1)
	var keys = search.split('&')
	for(var i=0;i<keys.length;i++){
		if(keys[i]){
			var arr = keys[i].split('=');
			parmas[arr[0]] = !/^\{(\{*|\w*|\s*|\,*|\:*|\}*\'*\"*)*\}$/.test(arr[1]) ? arr[1] : eval('('+arr[1]+')')
		}
	}
	return parmas;
}

function angleZ(el){
	var str = el.style.transform.replace(/([a-zA-Z]+|\(+|\)+)/g,'')
	if(/\s+/.test(str)){
		var arr = str.split(' ')
		return arr[1]*1
	}
	return str*1
}

function getRoutate(str,ag){
	var re = new RegExp("(?<=rotate" + ag + "?\\()(-?\\d+\\.?\\d*)(?=deg\\))")
	var angle = new Number(str.match(re)[0])
	return angle;
}