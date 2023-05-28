

var btn_to_top = $('#butntotop');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn_to_top.addClass('show');
    } else {
      btn_to_top.removeClass('show');
    }
});

btn_to_top.on('click', function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $('.body_market').offset().top
    }, 100);
});



