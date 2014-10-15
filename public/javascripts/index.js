$(document).ready(function () {
	(function() {
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/images/favicon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
    }());

	$('#fullpage').fullpage({
		anchors: pages,
		loopBottom: true,
		loopHorizontal: true,
		menu: '#overlay',
		resize: false,
		afterLoad: function(anchorLink, index) {
			for (var i=0; i<pages.length; i++) {
				var page = pages[i];
				console.log(page, anchorLink);
				if (anchorLink === page) {
					// document.location.hash = page;
					if (page === '#') {
						var selector = '#home'
					} else if (page === 'mpr' || page === 'gp') {
						// var selector = "a[href$=" + '"' + page + '"' + "]" + ', a[href=$"news"]';
					} else {
						var selector = "a[href$=" + '"' + page + '"' + "]";
					}
					console.log(selector);
					currentPage = selector;
					$(selector).addClass('hover');
				}
			}
		},
		onLeave: function(index, nextIndex) {
			$(currentPage).removeClass('hover');
		}
	});

	$.fn.fullpage.setScrollingSpeed(500);	
});

var pages = ['#', 'about', 'mpr', 'gp', 'lovers', 'fashion', 'everyday', 'video'];

var currentPage;