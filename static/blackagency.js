











if($(window).width() < 1124 ){


		
$('.logo_portfolio').click(function(){
	
		$(this).parent().find('.textport').css('top',0);
	});
$('.textport').click(function(){
	
		$(this).css('top','-100%');
	});

}




	








window.onload = function(){
	setTimeout(function(){
	$('.loader').css('opacity',0);
	setTimeout(function(){
		$('.loader').css('display','none');
	},1400);
	setTimeout(function(){
      
      $('.logo').addClass('fadeInn');
      
	},1600);
	setTimeout(function(){
      $('.menu').addClass('fadeInn');
      
	},1500);
	setTimeout(function(){
      
      $('.down').addClass('fadeInn');
	},1550);

	setTimeout(function(){
      
      $('.down').removeClass('fadeInn');
      $('.down').css('opacity',1);
	},1650);

	},1000);

}
var change="";

$('.wrap_select>div').click(function(){
	$('.wrap_select ul').slideToggle();
	$('.right_input>textarea').slideToggle();
	$('.wrap_select').toggleClass('befo');
	if($('.wrap_select').css('border') == 1){
		$('.wrap_select').css('border-bottom',0);
	}
	

		

});

$('.wrap_select ul li').click(function(){
	
		if($(this).find('i').css("display") == "none"){
			$(this).find('i').show();
			if( change == "виберете план"){
	        	change = "";
	        }

			change +=" " + $(this).text()  + " ";
			
			$('.wrap_select>div').empty();
	        $('.wrap_select>div').append(change);
			
		}else{
			$(this).find('i').hide();
			change = change.replace($(this).text(),"");
			$('.wrap_select>div').empty();
	        $('.wrap_select>div').append(change);
	        if( change  == "      " || change  == "    "||change  == "  " ){
	        	change = "виберете план";
	        	$('.wrap_select>div').empty();
	        	$('.wrap_select>div').append(change);
	        }
	        
		}
	
	
});

$('.down').click(function(){
	$('body,html').animate({
		scrollTop: $('.wrapper>h2').offset().top
	},700);
});
$('.one').click(function(){
	$('body,html').animate({
		scrollTop: $('.wrapper>h2').offset().top
	},700);
});
$('.two').click(function(){
	$('body,html').animate({
		scrollTop: $('.wrapper>h3').offset().top
	},900);
});
$('.three').click(function(){
	$('body,html').animate({
		scrollTop: $('.contact').offset().top
	},1500);
});





var ww = $(window).width(), 
wh = $(window).height(), 
li = $('.budda_img img:first'); 

$(window).on('mousemove', function(e){ 
li.css('left', (ww / 2 - e.clientX) / 50 + '%'); 
li.css('top', (wh / 2 - e.clientY) / 50 + '%') ; 
}); 




$('textarea').click(function(){
	$('textarea').attr("placeholder","");
    });

$(document).mouseup(function (e){ 
        var block = $(".wrap_select"); 
        if (!block.is(e.target) 
            && block.has(e.target).length === 0) { 
             $(".wrap_select ul").slideUp();
             $('.right_input>textarea').slideDown();
              $('.wrap_select').removeClass('befo');
        }
    });
$(document).mouseup(function (e){ 
        var block = $("textarea"); 
        if (!block.is(e.target) 
            && block.has(e.target).length === 0) { 
             block.attr("placeholder","сообщение");

        }
    });


new WOW().init();