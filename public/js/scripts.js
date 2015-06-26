$(document).ready(function() {
  //  setup page anchors and fullpage.js
  var anchors = [];
  $('.section').each(function(i) {
    var gallery = $(this).attr('data-gallery');
    anchors.push(gallery);
  });

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

  //  adjust images according to browser width, setup resize listener
  getWidth();
  $(window).resize(function() {
    getWidth();
  });

  if ($(window).width() <= 450) {
    $('#sidebar').width('50%');
  }

  //  init js click listeners
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
  $('#home').click(function(e) {
    e.preventDefault();
    $.fn.fullpage.moveTo(1);
    document.location.hash = '';
  });
  $('.paneHeader').click(function(e) {
    e.preventDefault();
    var icon = $(this).find('span.togglePane');
    var pane = $(this).next('ul.pane');
    togglePane(pane, icon);
  });
});

function getWidth() {
  var width = $(window).width();

  if (width >= 1500) {
    imageSource(3);
  } else if (width >= 500) {
    imageSource(2);
  } else if (width >= 400) {
    imageSource(1);
  } else {
    imageSource(0);
  }
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

function togglePane(pane, icon) {
  $(pane).slideToggle(150, function() {
    if (icon.hasClass('glyphicon-plus')) {
      $(icon).removeClass('glyphicon-plus').addClass('glyphicon-minus')
    } else {
      $(icon).removeClass('glyphicon-minus').addClass('glyphicon-plus')
    }
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

    $('#fsToggle').removeClass('glyphicon-resize-full').addClass('glyphicon-resize-small');

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

    $('#fsToggle').removeClass('glyphicon-resize-small').addClass('glyphicon-resize-full');

  }
}