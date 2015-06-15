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
      paddingTop: '50px',
      afterLoad: function(anchorLink, index) {
        var colon = ':';   
        if (index !== 1) {
          $('.title').text(titleText + colon);
          var title = $(this).data('title');
          $('.currentGallery').text(title);
        } else {
          $('.title').text(titleText);
          $('.currentGallery').text('');
        }        
      }
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