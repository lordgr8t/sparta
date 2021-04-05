$('.header_mobile_content').hide();

// 



function menubtn(){
	$('.header_mobile_content').slideDown();
	$('.closer').removeClass("d-none");
	$('.closer').addClass("d-block");
	$('.header_mobile__menubtn').removeClass("d-block");
	$('.header_mobile__menubtn').addClass("d-none");
};

function menubtnclose() {
	$('.header_mobile_content').slideUp();
	$('.closer').removeClass("d-block");	
	$('.closer').addClass("d-none");
	$('.header_mobile__menubtn').removeClass("d-none");	
	$('.header_mobile__menubtn').addClass("d-block");
}

