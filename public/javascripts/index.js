$(document).ready(function () {
	// (function() {
 //        var link = document.createElement('link');
 //        link.type = 'image/x-icon';
 //        link.rel = 'shortcut icon';
 //        link.href = '/images/favicon.ico';
 //        document.getElementsByTagName('head')[0].appendChild(link);
 //    }());

	$('#fullpage').fullpage({
		anchors: pages,
		loopBottom: false,
		loopHorizontal: true,
		menu: '#overlay',
		resize: true,
		afterLoad: function(anchorLink, index) {
			for (var i=0; i<pages.length; i++) {
				var page = pages[i];
				// console.log(page, anchorLink);
				if (anchorLink === page) {
					// document.location.hash = page;
					if (page === '#') {
						var selector = '#home'
					} else if (page === 'mpr' || page === 'gp') {
						// var selector = "a[href$=" + '"' + page + '"' + "]" + ', a[href=$"news"]';
						var selector = "a[href$=" + '"' + page + '"' + "]";
						$('li.dropdown').addClass('open');
					} else {
						var selector = "a[href$=" + '"' + page + '"' + "]";
					}
					// console.log(selector);
					currentPage = selector;
					$(selector).addClass('hover');
				}
			}
		},
		onLeave: function(index, nextIndex) {
			// if ((index === 2 && nextIndex != 3) || (index === 3 && nextIndex != 2)) {
			$('li.dropdown').removeClass('open')
			// }
			$(currentPage).removeClass('hover');
		}
	});

	$.fn.fullpage.setScrollingSpeed(500);	
});

var pages = ['#', 'about', 'mpr', 'gp', 'intlRel', 'riceFork', 'lovers', 'travel', 'fashion', 'everyday', 'video'];

var currentPage;