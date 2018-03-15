Vue.component('pagination',{
	template:'#pagination-template',
	data(){
		return{

		}
	},
	props:{
		current:{
			type:Number,
			default:1
		},
		total:{
			type:Number,
			default:0
		},
		perpage:{
			type:Number,
			default:9
		}
	},
	computed:{

		pages(){
			var pages = [];
			for(let i =this.rangeStart;i<=this.rangeEnd;i++){
				pages.push(i);
			}
			return pages;
		},
		rangeStart(){
			var start = this.current - 2;
			return start > 0?start:1;
		},
		rangeEnd(){
			var end = this.current + 2;
			return end < this.totalPages?end:this.totalPages;
		},
		totalPages(){
			return Math.ceil(this.total/this.perpage);
		},
		nextPage(){
			return this.current+1;
		},
		prevPage(){
			return this.current-1;
		},
		hasPrev(){
			
			return this.current>1;
		},
		hasNext(){
			return this.current < this.totalPages;
		},
		
	},
	methods:{
		changePage(page){
			this.$emit('page-change',page);
		},hasFirst(){
			return (this.rangeStart !=1) ;
		},
		hasLast(){
			return this.rangeEnd != this.totalPages;
		}
		
	}
})