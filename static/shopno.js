$('.slider_container').slick({
	dots:true,
	arrows:false
});

$('.know_more').click(function(){
	$(this).parent().fadeOut(1000);
	$(this).parent().next().fadeIn(1000).css('display','flex');
});


$('.close_click').click(function(){
	$(this).parent().fadeOut(1000);
	$(this).parent().siblings().fadeIn(1000).css('display','flex');
});


$('#slider_says').slick({
	dots:true,
	prevArrow:"<div class='prev_arrow'><img src='static/img/left_slide.png'></div>",
	nextArrow:"<div class='next_arrow'><img src='static/img/right_slide.png'></div>",
});
$('.right_top_header').click(function(){
	$(this).toggleClass('active2');
});


//forma

var d =document;







