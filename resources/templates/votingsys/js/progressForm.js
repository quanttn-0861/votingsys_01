$( document ).ready(function() {
    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;

    $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        $("#progressbar li div").eq($("fieldset").index(next_fs)).addClass("line");
        $("#progressbar li div").eq($("fieldset").index(next_fs)).removeClass("line-deactive");

        next_fs.show();
        current_fs.animate({ opacity: 0 }, {
            step: function (now, mx) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + "%";
                opacity = 1 - now;
                current_fs.css({ 'transform': 'scale(' + scale + ')' });
                next_fs.css({ 'left': left, 'opacity': opacity });
            },
            duration: 500,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeOutQuint'
        });
    });

    $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        $("#progressbar li div").eq($("fieldset").index(current_fs)).removeClass("line");
        $("#progressbar li div").eq($("fieldset").index(current_fs)).addClass("line-deactive");

        previous_fs.show();
        current_fs.animate({ opacity: 0 }, {
            step: function (now, mx) {
                scale = 0.8 + (1 - now) * 0.2;
                left = ((1 - now) * 50) + "%";
                opacity = 1 - now;
                current_fs.css({ 'left': left });
                previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
            },
            duration: 500,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeOutQuint'
        });
    });

    $(".submit").click(function () {
        return false;
    })

    // date time picker
    $(function () {
        $('#datetimepicker4').datetimepicker();
    });
    $(function (event) {
        $('#datetimepicker1').datetimepicker();

    });
});
