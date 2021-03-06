

// Функція для створення елементів і установлення їм 
// атрибутів а також добавлення в них інших елементів

function elt(name,attributes){
	var node =document.createElement(name);
	if(attributes){
		for(var attr in attributes){
			if(attributes.hasOwnProperty(attr)){
				node.setAttribute(attr,attributes[attr])
			}
		}
	}
	for(var i = 2;i<arguments.length;i++){
		var child = arguments[i];
		if(typeof child == 'string'){
			child=document.createTextNode(child);
		}
			node.appendChild(child);
		
	}
	return node ;
}


var controls = Object.create(null);
function createPaint(parent){
	var canvas = elt('canvas',{width:1200,height:450,style:'border:1px solid black'});
	var cx = canvas.getContext('2d');
	var toolbar = elt('div',{class:'toolbar'});
	for(var name in controls){
		toolbar.appendChild(controls[name](cx));
	}
	var panel = elt('div',{class:'picturepanel'},canvas);
	parent.appendChild(elt('div',null,panel,toolbar));
}



var tools = Object.create(null);

controls.tool=function(cx){
	var select = elt('select');
	for(var name in tools){
		select.appendChild(elt('option',null, name));
	}
	cx.canvas.addEventListener('mousedown',function(e){
		if(e.which==1){
			tools[select.value](e,cx);
			e.preventDefault();
		}


	});
	return elt('span',null,'Інструменти: ',select);
};

function relativePos(event,element){
	var rect = element.getBoundingClientRect();
	return {
		x:Math.floor(event.clientX - rect.left),
		y:Math.floor(event.clientY - rect.top)
	};
}

function trackDrag(onMove,onEnd){
	function end(event){

		removeEventListener('mousemove',onMove);
		removeEventListener('mouseup',end);
		if(onEnd){
			onEnd(event);
		}
	}
		
		addEventListener('mousemove',onMove);
		addEventListener('mouseup',end);
	

}
tools.Line=function(e,cx,onEnd){
	cx.lineCap='round';
	var pos = relativePos(e,cx.canvas);
	trackDrag(function(event){
		cx.beginPath();
		cx.moveTo(pos.x,pos.y);
		pos=relativePos(event,cx.canvas);
		cx.lineTo(pos.x,pos.y);
		cx.stroke();
		
	},onEnd);
	
};
tools.Erase=function(event,cx){
	cx.globalCompositeOperation="destination-out";
	tools.Line(event,cx,function(){
		cx.globalCompositeOperation="source-over";
	});
};

controls.color=function(cx){
	var input = elt('input',{type:'color'});
	input.addEventListener('change',function(){
		cx.fillStyle=input.value;
		cx.strokeStyle=input.value;
	});
	return elt('span',null,'Колір: ',input);
};
controls.brushSize=function(cx){
	var select = elt('select');
	var sizes = [1,2,3,4,5,6,7,8,12,25,35,50,75,100];
	sizes.forEach(function(size){
		select.appendChild(elt('option',{value:size},size + ' pixels'));
	});
	select.addEventListener('change',function(e){
		cx.lineWidth=select.value;
	});
	return elt('span',null,'Розмір кисті: ',select);
};
controls.save=function(cx){
	var link = elt('a',{href:'/',class:'save'},'Зберегти');
	function update(){
		try{
			link.href=cx.canvas.toDataURL();

		}catch(e){
			if(e instanceof SecurityError){
				link.href='javascript:alert('+
				JSON.stringify('Can\'t save: ' + e.toString()) +
					')';
			}else{
				throw e;
			}
		}
	}
	link.addEventListener('focus',update);
	link.addEventListener('mouseover',update);
	return link;
};


function loadImageURL(cx,url){
	var image = document.createElement('img');
	image.addEventListener('load',function(){
		var color = cx.fillStyle,size= cx.lineWidth;
		
		
		cx.drawImage(image,0,0,1200,450);
		cx.fillStyle=color;
		cx.lineWidth=size;
		cx.strokeStyle=color;


	});
	
	image.src=url;
	
}

controls.openFile=function(cx){
	var input = elt('input',{type:'file'});
	input.addEventListener('change',function(){
		if(input.files.length==0) return;
		var reader = new FileReader();
		reader.addEventListener('load',function(){
			loadImageURL(cx,reader.result);
			
			
		});
		reader.readAsDataURL(input.files[0]);
	});
	return elt('div',null,'Відкрити файл: ',input);
};	
controls.openURL=function(cx){
	var input = elt('input',{type:'text'});
	var form = elt('form',null,"Введіть URL: ",input,elt('button',{type:'submit'},'Загрузити'));
	form.addEventListener('submit',function(e){
		e.preventDefault();
		loadImageURL(cx,form.querySelector('input').value);
	});
	return form;
};

tools.Text=function(e,cx){
	var text = prompt("Text: ","");
	if(text){
		var pos = relativePos(e,cx.canvas);
		cx.font=Math.max(7,cx.lineWidth) + 'px sans-serif';
		cx.fillText(text,pos.x,pos.y);
	}
};

var r = 0;
tools.Spray=function(e,cx){
	var radius = cx.lineWidth/2;
	var area = radius * radius * Math.PI;
	
	var dotsPerTick = Math.ceil(area/30);
	var square = dotsPerTick /2;
	
	
	var currentPos = relativePos(e,cx.canvas);
	var spray = setInterval(function(){
		for(var i =0;i<dotsPerTick;i++){
			var offset = randomPointInRadius(radius);
			cx.fillRect(currentPos.x+offset.x,currentPos.y+offset.y,1,1);
			
			
		}
	},25);
	trackDrag(function(event){
		currentPos=relativePos(event,cx.canvas);
	},function(){
		clearInterval(spray);
	});
};


function randomPointInRadius(radius){
	for(;;){
		var x = Math.random() * 2 - 1;
		var y = Math.random() * 2 - 1;
		if( x * x + y * y <= 1){
			return {x: x * radius , y:y * radius};
		}
	}

}

function regTangleFrom(a,b){
	return {x:Math.min(a.x,b.x),
			y:Math.min(a.y,b.y),
			width:Math.abs(a.x - b.x),
			height:Math.abs(a.y - b.y)
	};
}
tools.Regtangle=function(e,cx){
	var relativeStart = relativePos(event,cx.canvas);
	var pageStart = { x:e.pageX,y:e.pageY};
	var trakingNode = document.createElement('div');
	trakingNode.style.position='absolute';
	trakingNode.style.background=cx.fillStyle;
	document.body.appendChild(trakingNode);
	trackDrag(function(event){
		var rect = regTangleFrom(pageStart,{x:event.pageX,y:event.pageY});
		trakingNode.style.top=rect.y+'px';
		trakingNode.style.left=rect.x+'px';
		trakingNode.style.width=rect.width+'px';
		trakingNode.style.height=rect.height+'px';
	},function(e){
		var rect = regTangleFrom(relativeStart,relativePos(e,cx.canvas));

		cx.fillRect(rect.x-2,rect.y-2,rect.width,rect.height);
		document.body.removeChild(trakingNode);
	});
};



function colorAct(cx,x,y){
	var pixel = cx.getImageData(x,y,1,1).data;
	return 'rgb('+ pixel[0] + ',' + pixel[1] + ',' + pixel[2] + ')';
}
tools['Pick color']=function(event,cx){
	var pos  = relativePos(event,cx.canvas);
	var color = colorAct(cx,pos.x,pos.y);
	
	cx.fillStyle=color;
	cx.strokeStyle=color;
};
tools['Flood fill']=function(event,cx){
	var startPos = relativePos(event,cx.canvas);
	var data = cx.getImageData(0,0,cx.canvas.width,cx.canvas.height);
	var alreadyFilled = new Array(data.width*data.height);
	var workList=[startPos];
	while(workList.length){
		var pos = workList.pop();
		var offset = pos.x+data.width*pos.y;
		if(alreadyFilled[offset]) continue;
		cx.fillRect(pos.x,pos.y,1,1);
		alreadyFilled[offset]=true;
		forAllNeighbors(pos,function(neighbor){
			if(neighbor.x>=0&&neighbor.x<data.width&&
			   neighbor.y>=0&&neighbor.y<data.height&&
			   isSameColor(data,startPos,neighbor))
				workList.push(neighbor);
		});
	}
};
function forAllNeighbors(point,fn){
	fn({x:point.x,y:point.y+1});
	fn({x:point.x,y:point.y-1});
	fn({x:point.x+1,y:point.y});
	fn({x:point.x-1,y:point.y});
}
function isSameColor(data,pos1,pos2){
	var offset1 = (pos1.x + pos1.y* data.width) * 4;
	var offset2 = (pos2.x + pos2.y* data.width) * 4;
	for(var i = 0;i<4;i++){
		if(data.data[offset1+i]!=data.data[offset2+i])
			return false;
	}
	return true;
}
















createPaint(document.body);