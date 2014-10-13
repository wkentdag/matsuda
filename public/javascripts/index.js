$(document).ready(function () {
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

var pages = ['#', 'about', 'wedding', 'landscape', 'portraits'];

var currentPage;