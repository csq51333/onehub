var cw = document.body.clientWidth;//屏幕宽度，兼容？
var ch = document.body.clientHeight;//屏幕宽度，兼容？
var redress = cw > ch ? ch/3 : cw/2 //矫正值，为了居中

var pArr = document.querySelectorAll('.pai');
var len = pArr.length;

//随机函数
function rd(min,max){
	return Math.round(Math.random()*(max-min)+min)
}

//初始以一个圆圈摆放牌
function circle(){
	for(var i=0;i<len;i++){
		!function(i){
			var ag = 360/len*i
			var left = coordinate(ag).x;
			var top = coordinate(ag).y
			pArr[i].style.left = left + redress + 'px';
			pArr[i].style.top = top + redress + 'px';
			pArr[i].style.transform = 'rotateZ('+ -ag +'deg)'
			pArr[i].style.zIndex = i;
		}(i)
	}
}

//洗牌函数
function xiP(){
	for(var i = 0; i<len;i++){
		var _redress = angleZ(pArr[i])
		pArr[i].style.top = rd(-200,200) + redress + 'px';
		pArr[i].style.left = rd(-200,200) + redress + 'px';
		pArr[i].style.transform = 'rotateZ(' + (rd(0,360) + _redress) + 'deg)'
	}
	daL()
}

//横向合牌,加任意参数是竖向合拍（其实由ZNWei函数决定）
function heS(s){
	for(var i = 0; i<len;i++){
		pArr[i].style.top = redress + 'px';
		pArr[i].style.left = redress + 'px';
		var ag = angleZ(pArr[i])
		var zn = ZNWei(ag,s) //规整函数，要么竖着要么横
		pArr[i].style.transform = 'rotateZ(' + zn + 'deg)'
	}
	return 'next'
}

//打乱排序，嵌在洗牌函数里
function daL(){
	var zArr = []
	for(var i=0;i<len;i++){
		zArr.push(i);
	}
	//打乱z-index
	for(var n=0;n<len;n++){
		pArr[n].style.zIndex = zArr.splice(rd(0,zArr.length-1),1)[0]
	}
}

//铺开函数
function puK(){
	//横向铺开以z-index为序列
	var _w = document.body.clientWidth;
	var cha = 0;
	for(var i=0;i<len;i++){
		var T = ch/8 //将屏幕高度分成四份，决定每行上下间距
		var f = (len*30/cw)+1 //以左右间距30铺开，得出能份成几行
		var c = parseInt(len/f) //每一行有多少张？
		pArr[i].style.top = parseInt(pArr[i].style.zIndex/c) * T + 'px';
		pArr[i].style.left = (pArr[i].style.zIndex%c)*30 + 'px';
		
		var ag = angleZ(pArr[i])
		var zn = ZNWei(ag,'s')
		// pArr[i].style.transform = 'rotateZ(' + zn + 'deg)'
		pArr[i].setAttribute('wei',(zn == 180 ? '逆' : '正'))
		pArr[i].wei = (zn == 180 ? '逆' : '正')
	}
}

//切三叠牌，再也不要用递归这种蛋疼玩意儿来写了....
function Sqie(){
	var i = arguments[0] || 0;  //记步数，这是第几次递归
	var rand = arguments[1] || 0;  // 切三叠拍，每叠随机数
	var cun = arguments[2] || null; // 存之前切好的：每叠的随机数
	var _this = arguments.callee;
	var lens = len;
	var x = 0;

	if(i >= 5){
		return next()
	}

	//操作地图
	var map = {
		top: [50,-50,50,-50,0],
		run: ['fen','fen','he','he','zo'],
		cun:[0]
	}
	if(cun){
		map.cun = cun
	}

	//分开切牌时
	if(map.run[i] == 'fen'){ 
		var mix = (len-rand)/3 + rand || parseInt(len/3);
		var max = (len-rand)/3*2 + rand || parseInt(len/3*2);
		rand = rd(mix,max)
		map.cun.push(rand)
	}

	//合起切牌时
	if(map.run[i] == 'he'){
		x = i==3 ? len - map.cun[1] : len + map.cun[2] - map.cun[1]
		var start = map.cun[i-2]
		rand = map.cun[i-1];
	}

	if(map.run[i] == 'zo'){
		rand = map.cun[2];
		lens = len;
	}
	
	setTimeout(function(){
		if(i <= 4){
			for(var n=0;n<lens;n++){
				var style = pArr[n].style
				switch(map.run[i]){
					case 'fen':
						if(style.zIndex >= rand){
							style.top = map.top[i] + redress + 'px'
						}
						break;
					case 'he':
						if(style.zIndex >= start && style.zIndex < rand || (i == 3 && style.zIndex >= map.cun[i])){
							if(style.zIndex >= start && style.zIndex < rand){
								style.zIndex = parseInt(style.zIndex) + x;
							}
							style.top = map.top[i] + redress + 'px'
						}
						break;
					case 'zo':
						style.zIndex -= map.cun[2]; // zIndex对铺开效果有影响，所以复位
						style.top = redress + 'px'
				}
				
			}
			if(map.run[i] == 'he'){
				map.cun.push(x)
			}
			_this(++i,rand,map.cun)
		}
	},1000)
}

// 自动洗牌一套动作集合，传参洗几遍，默认3次
var process = function(n){
	var lens = n || 3
	// document.getElementById('origin').style.animation = "circle "+i+"s linear"
	for(var i=0;i<lens;i++){
		setTimeout(function(){
			xiP()
		},i*1000)
	}
	setTimeout(function(){
		heS()
	},i*1000)
	setTimeout(function(){
		Sqie()
	},++i*1000)
}

function next(){
	console.log('show self or other?')
	for(var i=0;i<len;i++){
		var _redress = getRoutate(pArr[i].style.transform,'Z');
		var _ag = (90 + _redress) // 为自己占卜加90度 ，为他人占卜减90度,90从首页信息选择来还是按钮选择？
		pArr[i].style.transform = 'rotateZ(' + _ag + 'deg)'
	}

	setTimeout(function(){
		puK()
	},1000)
}










//幻想简化for循环
// function forin(callback) {
// 	for(var i=0;i<len;i++){
// 		!function(i){
// 			var pai = pArr[i]
// 			var styles = pArr[i].style
// 			callback(pai,styles)
// 		}(i)
// 	}
// }

// function he(p,s){
// 	s.top = redress + 'px';
// 	s.left = redress + 'px';
// 	var ag = angleZ(p)
// 	var zn = ZNWei(ag)
// 	s.transform = 'rotateZ(' + zn + 'deg)'
// }

// function run(type){
// 	forin(type)
// }
// 
// run(x);
// run(y);
// run.....
