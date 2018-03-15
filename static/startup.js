

$('.burger').click(function(){

	$(this).toggleClass('active');
	$('.header_top ul').slideToggle();
});


$(window).resize(function(){

	if($(window).width() > 1118 ){
		$('.header_top ul').css('display','flex');
	}
    if($(window).width() < 1118 ){
        $('.header_top ul').css('display','none');
        $('.burger').removeClass('active');
    }
});


$('.slider').slick({
	infinite: true,
	slidesToShow:4,
	
	prevArrow:'<div class="prev"><img src="static/img/left_startup.png"></div>',
	nextArrow:'<div class="next"><img src="static/img/left_startup.png"></div>',
	
    swipeToSlide:true,
    responsive:[
    {
        breakpoint:1180,
        settings:{
        infinite: true,
        slidesToShow:2,
    
        prevArrow:'<div class="prev"><img src="static/img/left_startup.png"></div>',
        nextArrow:'<div class="next"><img src="static/img/left_startup.png"></div>',
    
        swipeToSlide:true,
        }
    },
    {
        breakpoint:582,
        settings:{
        infinite: true,
        slidesToShow:1,
    
        prevArrow:'<div class="prev"><img src="static/img/left_startup.png"></div>',
        nextArrow:'<div class="next"><img src="static/img/left_startup.png"></div>',
    
        swipeToSlide:true,
        }
    }
    ]


});
$('.menu_foto li').click(function(){
     $('.menu_foto li').removeClass('colo');
     $(this).addClass('colo');
});
$('.slider_1').slick({
	infinite: true,
	slidesToShow:1,
	arrows:false,
	dots:true
	
	

});





