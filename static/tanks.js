let d = document;
let canvas = d.getElementById('canvas');
let ctx = canvas.getContext('2d');

let tank1 = {
	x1:100,
	y1:550,
	x2:150,
	y2:500,
	width:200,
	bulids:[],
	color:'red',
	speedBulid:-2,
	
};
let tank2 = {
	x1:100,
	y1:0,
	x2:150,
	y2:50,
	width:200,
	bulids:[],
	color:'black',
	speedBulid:2,
	
};


function drawTank(tank){
	ctx.fillStyle = tank.color;
	ctx.fillRect(tank.x1,tank.y1,150,50);
	ctx.fillRect(tank.x2,tank.y2,50,50);


}
function tank2Move(){
	setTimeout(function(){
		tank2.x1=tank1.x1;
		tank2.x2=tank1.x2;
		tank2.bulids.push({x:tank2.x2+25,y:tank2.y2+30});
	},1500);
}

function drawBulidsTank1(){
	tank1.bulids.forEach(function(bulid,index){
		bulid.y+=tank1.speedBulid;
		if(bulid.y < -20){
			tank1.bulids.splice(index,1);
			return;
			
		}
		if((bulid.x  > tank2.x1 + 50 && bulid.x < tank2.x1+100 && bulid.y < tank2.y2+50)||
		   (bulid.x > tank2.x1 && bulid.x < tank2.x1+ 50 && bulid.y < tank2.y1+50) ||
		   (bulid.x > tank2.x1 + 100 && bulid.x < tank2.x1+ 150 && bulid.y < tank2.y1+50) ){
			tank1.bulids.splice(index,1);
		    tank2.width-=5;
		    whoIsWin(tank2.width,'tank1');
			return;
		}
		

		ctx.beginPath();
		ctx.fillStyle=tank1.color;
		ctx.arc(bulid.x,bulid.y, 5, 0, Math.PI*2, true); 
	    ctx.fill();

	});
}
function drawLiveTanks(){
	ctx.beginPath();
	ctx.fillStyle='black';
	ctx.moveTo(700,0);
	ctx.lineTo(700,600);
	ctx.stroke();
	ctx.font = "20px Arial";
	ctx.textStyle="black";
	ctx.fillText('tank1',710,20);
	ctx.fillText('tank2',710,80);
	ctx.fillStyle='green';
	ctx.fillRect(705,30,tank1.width,20);
	ctx.fillRect(705,90,tank2.width,20);
}

function drawBulidsTank2(){
	tank2.bulids.forEach(function(bulid,index){
		bulid.y+=tank2.speedBulid;
		if(bulid.y > 620){
			tank2.bulids.splice(index,1);
			return;
			
		}
		if((bulid.x  > tank1.x1 + 50 && bulid.x < tank1.x1+100 && bulid.y > tank1.y2)||
		   (bulid.x > tank1.x1 && bulid.x < tank1.x1+ 50 && bulid.y > tank1.y1) ||
		   (bulid.x > tank1.x1 + 100 && bulid.x < tank1.x1 + 150 && bulid.y > tank1.y1) ){
			tank2.bulids.splice(index,1);
			tank1.width-=5;
			whoIsWin(tank1.width,'tank2');
			return;
		}
		

		ctx.beginPath();
		ctx.fillStyle=tank2.color;
		ctx.arc(bulid.x,bulid.y, 5, 0, Math.PI*2, true); 
	    ctx.fill();

	});
}



    addEventListener('keydown',function(e){
    	var key = e.keyCode;
    	if(key==37){
    		tank1.x1-=30;
    		tank1.x2-=30;
    		tank2Move();
    		if(tank1.x1<0){
    			tank1.x1+=30;
    		    tank1.x2+=30;
    		}

		}
		if(key==38){
    		tank1.y1-=30;
    		tank1.y2-=30;
    		if(tank1.y2<0){
    			tank1.y1+=30;
    		    tank1.y2+=30;
    		}
		}
		if(key==39){
    		tank1.x1+=30;
    		tank1.x2+=30;
    		tank2Move();
    		if(tank1.x1>550){
    			tank1.x1-=30;
    		    tank1.x2-=30;
    		}
		}
		if(key==40){
    		tank1.y1+=30;
    		tank1.y2+=30;
    		if(tank1.y2>500){
    			tank1.y1-=30;
    		    tank1.y2-=30;
    		}
		}
		if(key==32){
			tank1.bulids.push({x:tank1.x2+25,y:tank1.y2-30});
		}

    });
    var game = true;
    var dtime=0;
    let a=0;
    var lastTime=0;
 function gameRun(time){
   
 	if(game){

 		ctx.clearRect(0,0,950,600);
    	ctx.beginPath();
    	drawTank(tank1);
    	drawTank(tank2);
    	drawBulidsTank1();
    	drawBulidsTank2();
    	drawLiveTanks();
    	dtime = time - lastTime;
 		a+=dtime;
 		if(a>800){
 			a=0;
 			tank2Move();
 		}
 		lastTime=time;

    	requestAnimationFrame(gameRun);
 	}
    	
 }

      requestAnimationFrame(gameRun);




   function whoIsWin(live,name){
   	 if(live<=0){
   	 	live=0;
   	 	game = false;
   	 	setTimeout(function(){
   	 		ctx.clearRect(0,0,700,600);
	   	 	ctx.font = "60px Arial";
	   	 	ctx.clearRect(0,0,700,600);
	   	 	ctx.fillText('Win ' + name,250,300);
	   	 },200);
   	 	
   	 	
   	 	
   	 }
   }
  