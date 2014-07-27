$(document).ready(function () {
	$('#fullpage').fullpage({
		loopBottom: true,
		loopHorizontal: true,
		menu: '#overlay',
		afterSlideLoad: function(anchorLink, slideAnchor) {
			console.log('=======');
			console.log(anchorLink, slideAnchor);
			if (anchorLink === 'about') {
				console.log(slideAnchor + ' if!!!');
			}
		}
	});

	


});
