$(document).ready(function() {
	$('.header__burger').click(function(event) {
		$('.header__burger,.nav').toggleClass('active');
		$('body').toggleClass('lock');
	});
});

$(document).ready(function() {
	$('.nav__link').click(function(event) {
		$('.header__burger,.nav').toggleClass('active');
		$('body').toggleClass('lock');
	});
});