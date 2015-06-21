$(document).ready(function() {
    var anchors = [];
    $('.section').each(function(i) {
      var gallery = $(this).attr('data-gallery');
      anchors.push(gallery);
    });

    var titleText = $('.title').text();

    $('#fullpage').fullpage({
      loopBottom: true,
      loopTop: true,
      controlArrows: false,
      scrollingSpeed: 500,
      anchors: anchors,
      afterLoad: function(anchorLink, index) {
        if (index !== 1) {
          $('.colon').text(':');
          var title = $(this).data('title');
          $('.currentGallery').text(title);
          $('.currentHash').attr('href', '#' + $(this).data('gallery'));
        } else {
          $('.colon').text('');
          $('.currentGallery').text('');
        }        
      }
    });

    $('#slideLeft').click(function(e) {
      e.preventDefault();
      $.fn.fullpage.moveSlideLeft();
    });
    $('#slideRight').click(function(e) {
      e.preventDefault();
      $.fn.fullpage.moveSlideRight();
    });

    $('#fullScreen').click(function(e) {
      e.preventDefault();
      toggleFullScreen();
    });

    
    // getWidth();
    // $(window).resize(function() {
    //   console.log(getWidth() );
    // });
});

function getWidth() {
  var width = $(window).width();

  if (width >= 992) {
    imageSource(2);
  } else if (width >= 768) {
    imageSource(1);
  } else {
    imageSource(0)
  }

  return width;
}


function imageSource(newIndex) {
  $('img').each(function(i) {
    var src = $(this).attr('src');
    var origIndex = src.indexOf('.jpg') - 1;
    var stem = src.substr(0, origIndex);
    var newSource = stem + newIndex + '.jpg';
    $(this).attr('src', newSource);
  });
}

//  https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}