var slideindex = 1;
showslides(slideindex);
function plusslides(n){
	showslides(slideindex += n);
}
function currentslide(n){
	showslides(slideindex=n);
}

function showslides(n){
	var i;
	var d=document;
	var slides = d.getElementsByClassName('slide');
	var dots = d.getElementsByClassName('dot');

	if(n > slides.length){
		slideindex = 1;
	} 
	if(n < 1 ){
		slideindex = slides.length;

	}
	for(i = 0; i < slides.length; i++){
		slides[i].style.display="none";
	}
	for(i = 0; i < dots.length; i++){
		dots[i].className=dots[i].className.replace("active","");
	}
	slides[slideindex-1].style.display="flex";
	dots[slideindex-1].className+=" active";

    $('.text span').removeClass('wow');
    $('.text span').addClass('wow');

}

new WOW().init();
var show =true;
$(window).on('scroll',function(){

if(!show) return false;
var w_top=$(window).scrollTop();
var e_top=$('.circles').offset().top;
if(w_top >=600){
	$('.spin').spincrement({
	duration:4000,
});
	show=false;
}
console.log(w_top + " " + e_top);

});
var show_2 =true;
$(window).on('scroll',function(){

if(!show_2) return false;
var w_top=$(window).scrollTop();
var e_top=$('.load_wrap').offset().top;
if(w_top >=e_top-$(window).height()-50){
	$('.number').spincrement({
	duration:5000
});
	$('.load div').css('animation-name','name');
	setTimeout(function(){
		$('.load div').css('animation-play-state','paused');

	},4700);
	show_2=false;
}
console.log(w_top + " " + e_top);

});
$(window).on('scroll',function(){
var sc=$(window).scrollTop();
if( sc>400 ){
   $('header').css('position','fixed');
   $('header').css('left',0);
   $('header').css('top',0);
   $('header').css('z-index',9999);
     $('header').height(60);
    $('.menu-link').addClass('top2');

}else{
	$('header').css('position','relative');
	 $('header').height(80);
	 $('.menu-link').removeClass('top2');

}

});
$('.slider_2').slick({
	autoplay:true,
	arrows:false,
	autoplaySpeed:2000,
	slidesToShow:6,
	responsive:[
    {
        breakpoint:1180,
        settings:{
        autoplay:true,
	    arrows:false,
	    autoplaySpeed:2000,
	    slidesToShow:1
	}
        
    }
    ]
});



$('.top-up').on('click',function(){

	$('html,body').animate({  scrollTop : 0 },600);
});
$(window).on('scroll',function(){
     if($(window).scrollTop() >  400){
     	$('.top-up').css('display','flex');
     }else{
     	$('.top-up').css('display','none');
     }
});

$('.burger').click(function(){

	$(this).toggleClass('menu-open');
	$('.menu-link').slideToggle();
});