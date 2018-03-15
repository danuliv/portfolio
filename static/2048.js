var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
startGame();

changeSize.onclick = function () {
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    size = sizeInput.value;
    width = canvas.width / size - 6;
    
    canvasClean();
    startGame();
  }
}

function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  var i, j;
  for(i = 0; i < size; i++) {
    cells[i] = [];
    for(j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);
  switch (cell.value){
    case 0 : ctx.fillStyle = '#A9A9A9'; break;
    case 2 : ctx.fillStyle = '#D2691E'; break;
    case 4 : ctx.fillStyle = '#FF7F50'; break;
    case 8 : ctx.fillStyle = '#ffbf00'; break;
    case 16 : ctx.fillStyle = '#bfff00'; break;
    case 32 : ctx.fillStyle = '#40ff00'; break;
    case 64 : ctx.fillStyle = '#00bfff'; break;
    case 128 : ctx.fillStyle = '#FF7F50'; break;
    case 256 : ctx.fillStyle = '#0040ff'; break;
    case 512 : ctx.fillStyle = '#ff0080'; break;
    case 1024 : ctx.fillStyle = '#D2691E'; break;
    case 2048 : ctx.fillStyle = '#FF7F50'; break;
    case 4096 : ctx.fillStyle = '#ffbf00'; break;
    default : ctx.fillStyle = '#ff0080';
  }
  ctx.fill();
  if (cell.value) {
    fontSize = width/2;
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
}

function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!loss) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      moveUp(); 
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown(); 
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft(); 
    }
    scoreLabel.innerHTML = 'Score : ' + score;
  }
}

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
}

function finishGame() {
  canvas.style.opacity = '0.5';
  loss = true;
}

function drawAllCells() {
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  var countFree = 0;
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      if(!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if(!countFree) {
    finishGame();
    return;
  }
  while(true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if(!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}

function moveRight () {




for(var y = 0;y<cells.length;y++){
	 for(var x = 0; x<cells.length-1; x++){
		  if(cells[y][x].value && !cells[y][x+1].value){
		    cells[y][x+1].value=cells[y][x].value;
		    cells[y][x].value=0;
		    x = -1;
		    
		  }
	  }
}
 

  
for(var x =0 ;x<cells.length;x++){
    for(var y=0;y<cells.length-1;y++){
	      if(cells[x][y].value==cells[x][y+1].value&&cells[x][y].value){
	        cells[x][y+1].value*=2;
	        cells[x][y].value=0;
	        y++;
	      }
    }
}




for(var y = 0;y<cells.length;y++){
	 for(var x = 0; x<cells.length-1; x++){
		  if(cells[y][x].value && !cells[y][x+1].value){
		    cells[y][x+1].value=cells[y][x].value;
		    cells[y][x].value=0;
		    x = -1;
		    
		  }
	}
}

 

  pasteNewCell();
}

function moveLeft() {
  for(var y = 0;y<cells.length;y++){
	 for(var x = cells.length-1; x>0; x--){
		  if(cells[y][x].value && !cells[y][x-1].value){
		    cells[y][x-1].value=cells[y][x].value;
		    cells[y][x].value=0;
		    x = cells.length;
		    
		  }
	  }
}
 

  
for(var x =0 ;x<cells.length;x++){
    for(var y=cells.length-1;y>0;y--){
	      if(cells[x][y].value==cells[x][y-1].value&&cells[x][y].value){
	        cells[x][y-1].value*=2;
	        cells[x][y].value=0;
	        y--;
	      }
    }
}




for(var y = 0;y<cells.length;y++){
	 for(var x = cells.length-1; x>0; x--){
		  if(cells[y][x].value && !cells[y][x-1].value){
		    cells[y][x-1].value=cells[y][x].value;
		    cells[y][x].value=0;
		    x = cells.length;
		    
		  }
	  }
}


  pasteNewCell();
}

function moveUp() {
  for(var y = 0;y<cells.length;y++){
	 for(var x = cells.length-1; x>0; x--){
		  if(cells[x][y].value && !cells[x-1][y].value){
		    cells[x-1][y].value=cells[x][y].value;
		    cells[x][y].value=0;
		    x = cells.length;
		    
		  }
	  }
}
 

  
for(var x =0 ;x<cells.length;x++){
    for(var y=cells.length-1;y>0;y--){
	      if(cells[y][x].value==cells[y-1][x].value&&cells[y][x].value){
	        cells[y-1][x].value*=2;
	        cells[y][x].value=0;
	        y--;
	      }
    }
}




 for(var y = 0;y<cells.length;y++){
	 for(var x = cells.length-1; x>0; x--){
		  if(cells[x][y].value && !cells[x-1][y].value){
		    cells[x-1][y].value=cells[x][y].value;
		    cells[x][y].value=0;
		    x = cells.length;
		    
		  }
	  }
}

  pasteNewCell();
}

function moveDown() {
  for(var y = 0;y<cells.length;y++){
	 for(var x = 0; x<cells.length-1; x++){
		  if(cells[x][y].value && !cells[x+1][y].value){
		    cells[x+1][y].value=cells[x][y].value;
		    cells[x][y].value=0;
		    x = -1;
		    
		  }
	  }
}
 

  
for(var x =0 ;x<cells.length;x++){
    for(var y=0;y<cells.length-1;y++){
	      if(cells[y][x].value==cells[y+1][x].value&&cells[y][x].value){
	        cells[y+1][x].value*=2;
	        cells[y][x].value=0;
	        y++;
	      }
    }
}




for(var y = 0;y<cells.length;y++){
	 for(var x = 0; x<cells.length-1; x++){
		  if(cells[x][y].value && !cells[x+1][y].value){
		    cells[x+1][y].value=cells[x][y].value;
		    cells[x][y].value=0;
		    x = -1;
		    
		  }
	  }
}
  pasteNewCell();
}
