new Vue({
	el:"#todo",
	data:{
		newTask:'',
		tasks:[
		{title:'Повторити слова',done:false,show:true},
		{title:'Написати програму',done:false,show:true},
		{title:'Читати книгу',done:false,show:true},
		],
		edit:"",

	},
	methods:{
		addTask:function(e){
			e.preventDefault();
			this.tasks.push({title:this.newTask,done:false,show:true});
			this.newTask = '';
		},
		deleteTask:function(index){
			 this.tasks.splice(index,1);
		},
		editTask:function(index){
			this.tasks[index].title=this.edit;
			this.tasks[index].show = true;

		},
		showInput(task,index){
			this.tasks.forEach(function(task){
				task.show=true;
			});
			task.show=false;
			this.edit=this.tasks[index].title;
		}
	}
});