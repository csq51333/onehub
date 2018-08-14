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
		var ag = _ag % 360
		ag < 0 ? ag + 360 : ag;
		var baseline = s ? (ag >= 90 && ag < 270 ? 180 : 0) : (ag >= 0 && ag < 180 ? 90 : 270);
		var extra = baseline - ag
		return _ag + extra
	}
}

//随机函数
function rd(min,max){
	return Math.round(Math.random()*(max-min)+min)
}

function createPai(father,i,wei,kinds){
	var kind = kinds || 'waite/'
	var div = document.createElement('div')
	var divb = document.createElement('div')
	var divbg = document.createElement('div')

	div.className = 'pai';
	div.zinx = 1;
	div.num = i;
	div.reg = 0;
	div.setAttribute('No.',i)
	if(wei){
		var dir = wei == 'positive' ? '正' : '逆'
		div.setAttribute('wei', dir)
	}
	div.style.transform = "rotate("+ (wei == 'positive' ? 0 : 180) + "deg)"

	divb.className = 'biao'
	divb.style.backgroundImage = 'url("img/'+kind+i+'.jpg")'

	divbg.className = 'bei'
	divbg.style.backgroundImage = 'url("img/'+kind+'b.jpg")'
	div.appendChild(divb)
	div.appendChild(divbg)
	father.appendChild(div)
}

//弹框
function mask(obj){
	var arg = obj || {}
	var cb = arg.callback
	var curtain = document.querySelector('.curtain');
	if(curtain){
		curtain.style.display = 'block'
	} else {
		var curtain = document.createElement('div')
		var prompt = document.createElement('div')
		curtain.className = "curtain"
		prompt.className = "prompt"

		prompt.innerHTML = "<h3>"+ arg.title +"</h3><textarea class='_mark'></textarea><button class='btn'>"+ arg.btn +"</button>"

		curtain.appendChild(prompt)
		document.body.appendChild(curtain)

		curtain.addEventListener('click',function(e){
			var e = e || window.e
			if(e.target.className == 'curtain'){
				this.style.display = 'none'
			}
		},true)

		var btn = document.querySelector('.btn')
		btn.addEventListener('click',function(){
			var localMark = document.querySelector('.prompt').querySelector('._mark').value
			arg.callback(localMark)
			curtainstyle.display = 'none'
		})
	}

}

//转换时间戳格式
function formatTime(n){
	if(/\d{13,}/.test(n)){
		var T = new Date()
		var Year = T.getFullYear(n)
		var Month = T.getMonth(n) + 1
		var Dates = T.getDate(n)
		var Hours = T.getHours(n)
		var Minute = T.getMinutes(n)
		var Second = T.getSeconds(n)

		return Y+"."+Month+"."+Dates+" "+Hours+":"+Minute+":"+Second
	}
	return "？？？"
}
