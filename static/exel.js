

var grid = new Vue({
	el:"#grid",
	data:{
		options:{
			rows:5,
			cols:5
		},
		grid:[],
		currentCell:'',
		selectedCells:null,


	},
	methods:{
		editCell:function(cell,event){
			
			this.currentCell = cell;
			var td = event.target.parentNode;
			td.appendChild(this.$refs.inputCell);
			
			
			
		},
		saveCell:function(){
			var that  =this;
			this.grid.forEach(function(row){
				row.forEach(function(col){
					if(col.raw.charAt(0)=='=')
					col.value = that.processFormula(col.raw);
				    else
				    col.value=col.raw;
				});
			});
			if(this.currentCell.raw.charAt(0)=='='){

				this.currentCell.value=this.processFormula(this.currentCell.raw);
			}else{
				this.currentCell.value = this.currentCell.raw;
				
			}
			if(this.selectedCells && this.selectedCells.cells){
				this.selectedCells.cells.forEach(function(cell){
					cell.selected=false;
				});
			}
		
			
			this.selectedCells=null;
			this.currentCell='';
		},
		processFormula:function(str){
			var cells = this.formulaCells(str),
				formula = str.substring(1);
				cells.titles.forEach(function(name,i){
					formula = formula.replace(name,cells.cells[i].value);
				});
				return eval(excelFormulaUtilities.formula2JavaScript(formula));
		},
		formulaCells:function(str){
			var matches = str.match(/[A-Z]+[0-9]/g) || [],
				result = {titles:[],cells:[]},that=this;
			matches.forEach(function(cell){
				var coords = that.cellCoords(cell);
				result.cells.push(that.grid[coords.row][coords.col]);
				result.titles.push(cell);
			});
			return result;
		},
		cellCoords:function(name){
			return {
				row:name.charAt(1)-1,
				col:name.charCodeAt(0)-65,
			};
		},
		highlight:function(value){
			
			if(!value || value.charAt(0) != '='){
				return value;
			}
			if(this.selectedCells && this.selectedCells.cells){
				this.selectedCells.cells.forEach(function(cell){
					cell.selected=false;
				});
			}



			var cells = this.formulaCells(value),
			cCoords=this.currentCell.position
			,that=this;
			cells.cells.forEach(function(cell){
				var coords = cell.position;
				
				return cell.selected ? cell.selected : cell.selected = true;
			});
			this.selectedCells=cells;
			return value;
		},
		borderCol(grid){
			if(grid.borderColor == 'transparent' && 
				grid.selected){
				qwe='#'+Math.floor(Math.random()*16777215).toString(16);
				grid.borderColor=qwe;
				return {borderColor:qwe};
			}else if(grid.selected){
				return  {borderColor:grid.borderColor};
			}else{
				return  {borderColor:'transparent'};
			}
		}
	},
	filters:{
		columnName(index){
			return String.fromCharCode(65 + index);
		}

	},
	computed:{
		color:{
			cache:false,
			get:function(){
				return '#'+Math.floor(Math.random()*16777215).toString(16);
			}
		}
	},
	created:function(){

		for(var i = 0 ;i<this.options.rows;i++){
			this.grid.push([]);
			for(var j = 0 ; j<this.options.cols ; j++){
				this.grid[i].push({
					value:'',
					raw:'',
					selected:false,
					position:{
						row:i,
						col:j
					},
					links:[],
					borderColor:'transparent',
				});
			}
		}
	},
});