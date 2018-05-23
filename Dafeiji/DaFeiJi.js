var ksyx=document.getElementById("ksyx");
var box=document.getElementById("box");
var wdfj=document.getElementById("wdfj");
var fen=document.getElementById("fen");
var cxks=document.getElementById("cxks");
var end=document.getElementById("end");
var endF=end.getElementsByTagName("span")[0];
var kaiF=fen.getElementsByTagName("span")[0];
box.onmousemove=function(e){//我方飞机移动
	var evt=e||event;
	var _x = evt.pageX - box.offsetLeft -wdfj.offsetWidth / 2;
	var _y = evt.pageY - box.offsetTop - wdfj.offsetHeight / 2;
	if(_x<=0){
		_x=0;
	}
	if(_y<=0){
		_y=0;
	}
	if(_x>=box.offsetWidth-wdfj.offsetWidth ){
		_x=box.offsetWidth-wdfj.offsetWidth ;
	}
	if(_y>=box.offsetHeight-wdfj.offsetHeight){
		_y=box.offsetHeight-wdfj.offsetHeight;
	}
	wdfj.style.left=_x+"px";
	wdfj.style.top=_y+"px";
}	
ksyx.onclick=function(){
	box.style.backgroundImage="url(image/background_1.png)";
	ksyx.style.display="none";
	wdfj.style.display="block";
	fen.style.display="block";
    timer =setInterval(star, 50)
}
//创建子弹数组 用于子弹运动
var zdArr=[];
//创建敌方飞机数组  和子弹相似
var djArr=[];
//创建子弹
function zd(x,y){
	this.btNode=document.createElement("img");
	this.btNode.src="image/bullet1.png";
	this.btNode.style.left=x+"px";
	this.btNode.style.top=y+"px";
	this.btGjl=1;
	box.appendChild(this.btNode);
}
//子弹运动
zd.prototype.zdyd=function(){
		this.btNode.style.top=this.btNode.offsetTop-10+"px";
}	
//函数结合体
function star(){
zdArr.push(new zd(parseInt(wdfj.style.left)+(wdfj.offsetWidth/2),parseInt(wdfj.style.top)-(wdfj.offsetHeight/2)));	
	for(var i=0;i<zdArr.length;i++){
		zdArr[i].zdyd();//子弹运动
		if(zdArr[i].btNode.offsetTop<=0){//删除子弹
			box.removeChild(zdArr[i].btNode);
			zdArr.splice(i, 1);
		}
	}
	dzx();//运行创造飞机函数
	for(var i=0;i<djArr.length;i++){
		djArr[i].djyd();//敌机运动
		if(djArr[i].djNode.offsetTop>=box.offsetHeight-djArr[i].djNode.offsetHeight){
			box.removeChild(djArr[i].djNode);//超过box自动删除
			djArr.splice(i, 1);
		}
	}
	//敌机生命值
	for(var i=0;i<zdArr.length;i++){
		for(var j=0;j<djArr.length;j++){
			//判断敌机与我机位置
			if(wdfj.offsetLeft>djArr[j].djNode.offsetLeft&&wdfj.offsetLeft<djArr[j].djNode.offsetLeft+djArr[j].djNode.offsetWidth){
				if(wdfj.offsetTop<=djArr[j].djNode.offsetTop+djArr[j].djNode.offsetHeight && wdfj.offsetTop+wdfj.offsetHeight>=djArr[j].djNode.offsetTop){
					//游戏结束
					end.style.display="block";
					clearInterval(timer);
					box.onmousemove=null;
					wdfj.src="image/本方飞机爆炸.gif";
					endF.innerHTML=kaiF.innerHTML;
				}
			}
			//判断敌机与我方子弹位置
			if(zdArr[i].btNode.offsetLeft>djArr[j].djNode.offsetLeft && zdArr[i].btNode.offsetLeft<djArr[j].djNode.offsetLeft+djArr[j].djNode.offsetWidth){
				if( zdArr[i].btNode.offsetTop<=djArr[j].djNode.offsetTop+djArr[j].djNode.offsetHeight && zdArr[i].btNode.offsetTop+zdArr[i].btNode.offsetHeight>=djArr[j].djNode.offsetTop){
					djArr[j].djhealth--;
					zdArr[i].btGjl--;
				}
			}
			if(djArr[j].djhealth<=0){
				kaiF.innerHTML=parseInt(djArr[j].djfenshu)+parseInt(kaiF.innerHTML);
				djArr[j].djNode.src=djArr[j].djbommSrc;
				//console.log(djArr[j].djbommSrc)
				if(djArr[j].djNode.src=djArr[j].djbommSrc){
						djArr[j].djdieTime=parseInt(djArr[j].djdieTime+10) ;
						console.log(djArr[j].djdieTime)
						if(djArr[j].djdieTime==500){
							box.removeChild(djArr[j].djNode)//血量为0删除
							djArr.splice(j, 1);
						}			
						
				}
			
				
			}
		}
		if(zdArr[i].btGjl<=0){
				box.removeChild(zdArr[i].btNode);//攻击力为0删除
				zdArr.splice(i, 1);
		}
	}
	
}
//创造敌方飞机(和创建子弹差不多)
function dffj(imgSrc,x,y,speed,health,bommSrc,dieTime,fenshu){//图片 left top 速度 血量 死亡图片 死亡时间 分数
	this.djNode=document.createElement("img");
	this.djNode.src=imgSrc;
	this.djNode.style.left=x+"px";
	this.djNode.style.top=y+"px";
	this.djSpeed=speed;
	this.djhealth=health;
	this.djbommSrc=bommSrc;
	this.djdieTime=dieTime;
	this.djfenshu=fenshu;
	box.appendChild(this.djNode);
}
//创造敌方飞机（call改变this指向） 然而不会
//function dffj(x,y){
//	
//}

//飞机为大还是中或小
//飞机Y轴起点为0 x轴为0-事件源宽度中的随机位置
//Math.random()*box.offsetWidth-大/中/小飞机的宽度
var fjsj=0;
function dzx(){
	fjsj++;
	if(fjsj%7==0){
		djArr.push(new 			dffj("image/enemy3_fly_1.png",Math.random()*(box.offsetWidth-46),0,3,3,"image/中飞机爆炸.gif",20,3));
	}else if(fjsj==25){
		djArr.push(new	dffj("image/enemy2_fly_1.png",Math.random()*(box.offsetWidth-110),0,1,6,"image/大飞机爆炸.gif",10,6));
	fjsj=0;
	}else if(fjsj%2==0){
		djArr.push(new	dffj("image/enemy1_fly_1.png",Math.random()*(box.offsetWidth-34),0,6,1,"image/小飞机爆炸.gif",30,1));
	}
}
//飞机运动函数
dffj.prototype.djyd=function(){
		this.djNode.style.top=this.djNode.offsetTop+this.djSpeed+"px";
}	

cxks.onclick=function(){
	location.reload();
}
