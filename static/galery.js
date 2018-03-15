var id = '2c58a6bf6ac476a856c09f2438ab1ac4fc48de25f38a82f1928fcaf85f17f889';
	var v = new Vue({
		el:'#app',
		data:{
			photos:[],
			totalPhotos:0,
			perPage:9,
			currentPage:1,
		},
		methods:{
			fetchPhotos(page){
				var options = {
					params:{
						client_id:id,
						page:page,
						per_page:this.perPage
					}
				};
				this.$http.get('https://api.unsplash.com/photos',options).then((response)=>{
					this.photos = response.data;
					this.totalPhotos = parseInt(response.headers.get('x-total'));
					this.currentPage = page;


				},console.log)
			}
		},
		created(){
			this.fetchPhotos(this.currentPage);
		}
	})