var express = require('express');
var app = express();
var path = require('path');
var server = app.listen(process.env.PORT || 8000,function(){
	console.log('listening');
});

app.use('/static',express.static(path.join(__dirname,'static')));
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'static/index.html'));
});
app.get('/2048',function(req,res){
	res.sendFile(path.join(__dirname,'static/2048.html'));
});
app.get('/krestiki',function(req,res){
	res.sendFile(path.join(__dirname,'static/krestiki.html'));
});
app.get('/pjatnashki',function(req,res){
	res.sendFile(path.join(__dirname,'static/pjatnashki.html'));
});
app.get('/tetris',function(req,res){
	res.sendFile(path.join(__dirname,'static/tetris.html'));
});
app.get('/zmiyka',function(req,res){
	res.sendFile(path.join(__dirname,'static/zmiyka.html'));
});
app.get('/tanks',function(req,res){
	res.sendFile(path.join(__dirname,'static/tanks.html'));
});
app.get('/platformer',function(req,res){
	res.sendFile(path.join(__dirname,'static/platformer.html'));
});
app.get('/exel',function(req,res){
	res.sendFile(path.join(__dirname,'static/exel.html'));
});
app.get('/todolist',function(req,res){
	res.sendFile(path.join(__dirname,'static/todolist.html'));
});
app.get('/galery',function(req,res){
	res.sendFile(path.join(__dirname,'static/galery.html'));
});
app.get('/paint',function(req,res){
	res.sendFile(path.join(__dirname,'static/paint.html'));
});
app.get('/blackagency',function(req,res){
	res.sendFile(path.join(__dirname,'static/blackagency.html'));
});
app.get('/shopno',function(req,res){
	res.sendFile(path.join(__dirname,'static/shopno.html'));
});
app.get('/startup',function(req,res){
	res.sendFile(path.join(__dirname,'static/startup.html'));
});
app.get('/bootsup',function(req,res){
	res.sendFile(path.join(__dirname,'static/bootsup.html'));
});
app.get('/crypto',function(req,res){
	res.sendFile(path.join(__dirname,'static/crypto.html'));
});
app.get('/altay',function(req,res){
	res.sendFile(path.join(__dirname,'static/altay.html'));
});

