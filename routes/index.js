var express = require('express');
var router = express.Router();

var tumblr = require('tumblr.js');
var client = require('../tumblr-auth.js')

/* GET home page. */
router.get('/', function(req, res) {
	var lovers = [];
	var fashion = [];
	var everyday = [];
	var video = [];
	var mpr = [];
	var globalpost = [];

	client.posts('williammatsuda', {type: 'photo', tag: 'lovers', limit: 10}, function (err, data) {
		if (err) {console.log(err);} else {
			for (var p in data.posts) {
				// console.log(p);
				// console.log(data.posts[p].photos[0].alt_sizes[0].url);
				lovers.push(data.posts[p].photos[0].alt_sizes[0].url);
			}
			// console.log('lovers: ====');
			// console.log(lovers);
			client.posts('williammatsuda', {type: 'photo', tag: 'fashion', limit: 10}, function (err, data) {
				if (err) {console.log(err);} else {
					for (var p in data.posts) {
						fashion.push(data.posts[p].photos[0].alt_sizes[0].url);
					}
					// console.log('fashion: ============');
					// console.log(fashion);
					client.posts('williammatsuda', {type: 'photo', tag: 'everyday', limit: 10}, function (err, data) {
						if (err) {console.log(err);} else {
							for (var p in data.posts) {
								everyday.push(data.posts[p].photos[0].alt_sizes[0].url);
							}
							// console.log('everyday1111111');
							// console.log(everyday);

							client.posts('williammatsuda', {type: 'photo', tag: 'Minnesota Public Radio', limit: 10}, function (err, data) {
								if (err) {console.log(err);} else {
									for (var p in data.posts) {
										mpr.push(data.posts[p].photos[0].alt_sizes[0].url);
									}
									// console.log('mpr: ');
									// console.log(mpr);
									client.posts('williammatsuda', {type: 'photo', tag: 'The Global Post', limit: 10},
										function (err, data) {
											if (err) {console.log(err);} else {
												for (var p in data.posts) {
													globalpost.push(data.posts[p].photos[0].alt_sizes[0].url);
												}

												client.posts('williammatsuda', {type: 'video', tag: 'video', limit: 10},
													function (err, data) {
														if (err) {console.log(err);} else {
															for (var p in data.posts) {
																// console.log(data.posts[p].permalink_url);
																video.push(data.posts[p].permalink_url);
															}
															console.log(JSON.stringify(data));
														}
														var images = [];
														images.lovers = lovers;
														images.fashion = fashion;
														images.everyday = everyday;
														images.mpr = mpr;
														images.gp = globalpost;
														images.video = video;

														// console.log(images);
														res.render('index', {
															title: 'Will Matsuda',
															images: images
														});
													});


												// console.log('global post: ')
												// console.log(globalpost);
											}
										}); //	end gp get
								}
							});	//	end mpr get
						}
					});	//	end everyday get
				}
			});	//	end fashion get
		}

	});	//	end lovers get
});

module.exports = router;
