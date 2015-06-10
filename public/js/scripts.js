$(document).ready(function() {
    $('#fullpage').fullpage({
      loopBottom: true,
      loopTop: true,
      controlArrows: false
    });

    // $('img').each(function(i) {
    //   console.log($(this);
    // });

    $(window).resize(function() {
      console.log(getWidth() );
    });
});

function getWidth() {
  var width = $(window).width();
  if (width >= 1200) {
  } else if (width >= 992) {
  } else if (width >= 768) {
  } else {
  }

  imageSource(width);

  return width;
}


function imageSource(w) {
  console.log('resizing images to width:\t' + w);
}