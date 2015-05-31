var config = require('../config.json');
var parse = require('./parse');
var staticAssets = parse(config.staticAssetMap);


var exports = {};

exports.sections = function getSections() {
  var sections = [];
  for (var i in staticAssets) {
    var section = {};
    if (!(staticAssets[i].galleries.length > 1)) {
      section.title = staticAssets[i].galleries[0].title;
      section.link = staticAssets[i].galleries[0].id;
      sections.push(section);
    } else {
      section.title = staticAssets[i].title;
      section.galleries = [];
      for (var g in staticAssets[i].galleries) {
        var gallery = {};
        gallery.title = staticAssets[i].galleries[g].title;
        gallery.link = staticAssets[i].galleries[g].id;
        section.galleries.push(gallery);
      }
      sections.push(section);
    }
  }

  return sections;
}

exports.galleries = function getGalleries() {
  var galleries = [];
  for (var i in staticAssets) {
    
  }
}

module.exports = exports;

