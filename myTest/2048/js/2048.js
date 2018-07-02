var board = new Array();//块存储数组
var conflictArr = new Array();//叠加限制数组,（每一块位置只能叠加一次）
var isMove = true;//是否可以移动
var score = 0;//分数
var suo = true;//锁gameover的alert


//初始化
function init(){
	//数组准备
	for(i=0;i<4;i++){
		board[i] = new Array();
		for(var j=0;j<4;j++){
			board[i][j] = 0;
		}
	}
	randomCell();
	randomCell();
	suo = true;
}

init()

//数组中随机出现一个2/4
function randomCell(){
	var w=1;
	while(w){
		var ranX = Math.floor(Math.random()*4);
		var ranY = Math.floor(Math.random()*4);
		if(board[ranX][ranY] == 0){
			board[ranX][ranY] = Math.random()>0.5?2:4;
			//动画执行完后再重绘页面
			setTimeout("renderNumCell()",210)
			w=0;
		}
	}
	
}

//重绘页面
function renderNumCell(){
	$(".num-cell").remove();//类似于canvas清除重绘
	for(var i=0;i<4;i++){
		conflictArr[i] = new Array();
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				var html = '<div class="num-cell" id="num-cell-'+i+'-'+j+'"></div>';
				$('#grid-cell-'+i+'-'+j).append(html);
				$('#num-cell-'+i+'-'+j).text(board[i][j]);
				var numScore = $('#num-cell-'+i+'-'+j).text(board[i][j]);
				$('#num-cell-'+i+'-'+j).css("backgroundColor",bgColor(board[i][j]));
				$('#num-cell-'+i+'-'+j).css("color",board[i][j]>4?"white":"black");
			}
			conflictArr[i][j] = true;
		}
	}
}

//背景颜色
function bgColor(num){
	switch(num){
		case 2:return"#eee4da";break;
        case 4:return"#ede0c8";break;
        case 8:return"#f2b179";break;
        case 16:return"#f59563";break;
        case 32:return"#f67e5f";break;
        case 64:return"#f65e3b";break;
        case 128:return"#edcf72";break;
        case 256:return"#edcc61";break;
        case 512:return"#9c0";break;
        case 1024:return"#33b5e5";break;
        case 2048:return"#09c";break;
        case 4096:return"#a6c";break;
        case 8192:return"#93c";break;
        default:break;
	}
}


//上下左右
$(document).keydown(function(event){
	var Code = event.keyCode;
	if(event.preventDefault){
		event.preventDefault();
	}else{
		returnVaule = false;
	}
	switch(Code){
		case 37:
			if(moveLeft()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		case 38:
			if(moveTop()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		case 39:
			if(moveRight()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		case 40:
			if(moveDown()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		case 65:
			if(moveLeft()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		case 87:
			if(moveTop()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		case 68:
			if(moveRight()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		case 83:
			if(moveDown()){
				randomCell()
			}
			setTimeout("isGameOver()",220)
			break;
		default:
			alert('可点击键盘方向键或"w","a","s","d"来操作游戏');
			break;
	}
})

//具体计算与控制

//是否还有空块
function isBlank(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return true;
			}
		}
	}
	return false;
}

//是否GG
function isGameOver(){
	if(!isMove && !isBlank()){
		for(var i=0;i<4;i++){
			if(i!=0&&i!=3){
				for(var j=0;j<4;j++){
					if(board[i][j]==board[i][j+1]||board[i][j]==board[i-1][j]||board[i][j]==board[i+1][j]){
						return;
					}
				}
			}
		}
		if(suo){
			suo = false;//锁一下
			alert("游戏结束，您的得分是"+score)
		}
		//init();//游戏结束立刻重新开始
	}
}

//左移动函数主要返回true/false，用以判断是否随机生成块
function moveLeft(){
	isMove = false;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0 && (board[i][j-1]==0||board[i][j]==board[i][j-1])){
				leftCount(i,j);//具体计算方法在这个函数中
			}
		}
	}
	if(isMove){
		return true;
	}
}

function moveTop(){
	isMove = false;
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0&& (board[i-1][j]==0||board[i][j]==board[i-1][j])){
				topCount(i,j);
			}
		}
	}
	if(isMove){
		return true;
	}
}

function moveRight(){
	isMove = false;
	for(var i=0;i<4;i++){
		for(var j=3;j>-1;j--){
			if(board[i][j]!=0 && (board[i][j+1]==0||board[i][j]==board[i][j+1])){
				rightCount(i,j);
			}
		}
	}
	if(isMove){
		return true;
	}
}

function moveDown(){
	isMove = false;
	for(var i=2;i>-1;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0 && (board[i+1][j]==0||board[i][j]==board[i+1][j])){
				downCount(i,j);
			}
		}
	}
	if(isMove){
		return true;
	}
}

//移动计算函数
function leftCount(dx,dy){
	for(var k=0;k<dy;k++){
		if(board[dx][k]==0 && isAir(dx,k,dy)){
			showMoveAnimation(dx,dy,dx,k);//小块的动画，jq动画
			board[dx][k] = board[dx][dy];
			board[dx][dy] = 0;
			isMove = true;
			break;
		}else if(board[dx][dy] == board[dx][k] && isAir(dx,k,dy) && conflictArr[dx][k]){
			showMoveAnimation(dx,dy,dx,k);
			board[dx][k]+=board[dx][dy];
			board[dx][dy] = 0;
			conflictArr[dx][k] = false;//每一个位置只可叠加一次,比如一行2,2,4如果不限制直接就等于8，实际按规则应为4,4
			score += board[dx][k];
			$('#score').text(score);
			isMove = true;
			break;
		}
	}
}

function topCount(dx,dy){
	for(var k=0;k<dx;k++){
		if(board[k][dy]==0 && isAirT(dy,k,dx)){
			showMoveAnimation(dx,dy,k,dy);
			board[k][dy] = board[dx][dy];
			board[dx][dy] = 0;
			isMove = true;
			break;
		}else if(board[dx][dy] == board[k][dy] && isAirT(dy,k,dx) && conflictArr[k][dy]){
			showMoveAnimation(dx,dy,k,dy);
			board[k][dy]+=board[dx][dy];
			board[dx][dy] = 0;
			conflictArr[k][dy] = false;
			score += board[k][dy];
			$('#score').text(score);
			isMove = true;
			break;
		}
	}
}

function rightCount(dx,dy){
	for(var k=3;k>dy;k--){
		if(board[dx][k]==0 && isAir(dx,dy,k)){
			showMoveAnimation(dx,dy,dx,k);
			board[dx][k] = board[dx][dy];
			board[dx][dy] = 0;
			isMove = true;
			break;
		}else if(board[dx][dy] == board[dx][k] && isAir(dx,dy,k) && conflictArr[dx][k]){
			showMoveAnimation(dx,dy,dx,k);
			board[dx][k]+=board[dx][dy];
			board[dx][dy] = 0;
			conflictArr[dx][k] = false;
			score += board[dx][k];
			$('#score').text(score);
			isMove = true;
			break;
		}
	}
}

function downCount(dx,dy){
	for(var k=3;k>dx;k--){
		if(board[k][dy]==0 && isAirT(dy,dx,k)){
			showMoveAnimation(dx,dy,k,dy);
			board[k][dy] = board[dx][dy];
			board[dx][dy] = 0;
			isMove = true;
			break;
		}else if(board[dx][dy] == board[k][dy] && isAirT(dy,dx,k) && conflictArr[k][dy]){
			showMoveAnimation(dx,dy,k,dy);
			board[k][dy]+=board[dx][dy];
			board[dx][dy] = 0;
			conflictArr[k][dy] = false;
			score += board[k][dy];
			$('#score').text(score);
			isMove = true;
			break;
		}
	}
}

//判断横向两个相同块中间是否有其他块存在
function isAir(fixed,Compare1,Compare2){
	for(var i=Compare1+1;i<Compare2;i++){
		if(board[fixed][i]!=0){
			return false;
		}
	}
	return true;
}
//纵向
function isAirT(fixed,Compare1,Compare2){
	for(var i=Compare1+1;i<Compare2;i++){
		if(board[i][fixed]!=0){
			return false;
		}
	}
	return true;
}
//滑动的动画
function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell=$("#num-cell-"+fromx+"-"+fromy);
    var fatherCell=$("#grid-cell-"+tox+"-"+toy);
    numberCell.animate({
    	top:fatherCell.offset().top,
    	left:fatherCell.offset().left
    },200)

}