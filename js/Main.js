$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollbox').fadeIn();
        } else {
            $('.scrollbox').fadeOut();
        }
    });

    $('.scrollbox').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});
