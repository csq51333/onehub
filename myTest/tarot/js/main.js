(function(){
	var main = {
		init:function(){
			// 多少张total，牌阵formation，测类型nature,牌类型kind
			var obj = getParmas()
			obj = {
				total:78,
				formation:'凯尔特十字',
				nature:'财富',
				kind:'waite/'
			}
			var paiClass = obj.paiClass;


			this.create(obj)
		},
		create:function(obj){
			//生成78，56，22？
			var i = obj.total != 56? 0 : 23;
			var len = obj.total != 56? obj.total : obj.total + 23
			for(i;i<obj.total;i++){
				var div = document.createElement('div')
				var divb = document.createElement('div')
				var divbg = document.createElement('div')

				div.className = 'pai';
				div.zinx = 1;
				div.num = i;
				div.reg = 0;

				divb.className = 'biao'
				divb.style.backgroundImage = 'url("img/waite/1.jpg")'

				divbg.className = 'bei'
				div.appendChild(divb)
				div.appendChild(divbg)
				document.getElementById('origin').appendChild(div)
			}

			this.pArr = [].slice.call(document.querySelectorAll('.pai'));
			this.len = this.pArr.length
		}
	}
	main.init();
})()