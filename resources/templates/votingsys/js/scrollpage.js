// $(document).ready(function () {
//   $("a").on('click', function (event) {
//     if (this.hash !== "") {
//       event.preventDefault();
//       var hash = this.hash;
//       $('html, body').animate({
//         scrollTop: $(hash).offset()
//       }, 800, function () {
//         window.location.hash = hash;
//       });
//     }
//   });
// });

$('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
$(window).on('load', function () {
  setTimeout(removeLoader, 300);
});

function removeLoader() {
  $("#loadingDiv").fadeOut(500, function () {
    $("#loadingDiv").remove();
  });
}

var btn = $('#button');

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});
