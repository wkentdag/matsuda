$(document).ready(function() {
    var anchors = [];
    $('.section').each(function(i) {
      var gallery = $(this).attr('data-gallery');
      // console.log(gallery);
      anchors.push(gallery);
    });


    $('#fullpage').fullpage({
      loopBottom: true,
      loopTop: true,
      controlArrows: false,
      scrollingSpeed: 500,
      anchors: anchors
    });

    
    getWidth();
    $(window).resize(function() {
      console.log(getWidth() );
    });
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

//  https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}