var Tarr = {
	data:{},
	init:function(){
		var obj = getParmas()
		console.log(obj)
		this.data = obj
		this.create()
	},
	create:function(){
		var formation = this.data.formation
		var kind = this.data.kind
		var data = this.data.data


		for(var i=0;i<data.length;i++){
			var Arrays = this[formation][i];//当前牌阵

			var box = document.createElement("div");
			box.className = 'box'
			box.style.top = Arrays.y + 'px'
			box.style.left = Arrays.x + 'px'
			box.style.transform = 'rotate('+ Arrays.ag +'deg)'
			box.setAttribute('order',i)//牌的位置序号

			createPai(box, data[i].No, data[i].direction, kind) //  生成牌

			var p = document.createElement('p');
			p.className = 'caption';
			p.innerHTML = Arrays.conte
			box.appendChild(p);
			document.querySelector('.zhen').appendChild(box)
		}
	},
	kerte:{
		0:{
			y:200,
			x:200,
			ag:0,
			conte: "现状"
		},
		1:{
			y:211,
			x:211,
			ag:90,
			conte: "障碍"
		},
		2:{
			y:0,
			x:200,
			ag:0,
			conte: "理想"
		},
		3:{
			y:400,
			x:200,
			ag:0,
			conte: "基础"
		},
		4:{
			y:200,
			x:0,
			ag:0,
			conte: "不久"
		},
		5:{
			y:200,
			x:400,
			ag:0,
			conte: "将来"
		},
		6:{
			y:480,
			x:550,
			ag:30,
			conte: "自我"
		},
		7:{
			y:320,
			x:550,
			ag:30,
			conte: "环境"
		},
		8:{
			y:160,
			x:550,
			ag:30,
			conte: "预期"
		},
		9:{
			y:0,
			x:550,
			ag:30,
			conte: "结果"
		},
		type: "全性质"
	}

}
Tarr.init()