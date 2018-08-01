function getParmas(){
	var parmas = {}
	var search = unescape(window.location.search.substr(1))
	var keys = search.split('&')
	for(var i=0;i<keys.length;i++){
		if(keys[i]){
			var arr = keys[i].split('=');
			// parmas[arr[0]] = !/^\[?\{(\{*|\w*|\s*|\,*|\:*|\}*\'*\"*)*\}\]?$/.test(arr[1]) ? arr[1] : eval('('+arr[1]+')')
			// parmas[arr[0]] = !/^[\[*\{+\%*\w*\:*\d*\"*\,*\,*\}+\s*\]*]*$/.test(arr[1]) ? arr[1] : eval('('+arr[1]+')')
			parmas[arr[0]] = !/^\[*\{+\s*\S+\}+\]*$/.test(arr[1]) ? arr[1] : eval('('+arr[1]+')')
		}
	}
	return parmas;
}

function angleZ(el){
	var checkStr = el.style.transform;
	if(!checkStr || !/rotate/.test(checkStr)){
		return ''
	}
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

function ZNWei(_ag,s){
	if(typeof(_ag) == "number"){
		_ag %= 360
		ag = _ag < 0 ? _ag + 360 : _ag;
		if(s){
			return ag >= 90 && ag < 270 ? 180 : 0;
		}
		return ag >= 0 && ag < 180 ? 90 : 270;
	}
}

function createPai(father,i,wei,kind){
	kind = kind || 'waite/'
	var div = document.createElement('div')
	var divb = document.createElement('div')
	var divbg = document.createElement('div')

	div.className = 'pai';
	div.zinx = 1;
	div.num = i;
	div.reg = 0;
	div.setAttribute('No.',i)
	div.setAttribute('wei',"")
	div.style.transform = "rotate("+ (wei == 'positive' ? 0 : 180) + "deg)"

	divb.className = 'biao'
	divb.style.backgroundImage = 'url("img/'+kind+i+'.jpg")'

	divbg.className = 'bei'
	div.appendChild(divb)
	div.appendChild(divbg)
	father.appendChild(div)
}