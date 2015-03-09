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
	var travel = [];
	var landing = [];
	var intlRel = [];
	var riceFork = [];

	var lovers_captions = [];
	var fashion_captions = [];
	var everyday_captions = [];
	var video_captions = [];
	var mpr_captions = [];
	var globalpost_captions = [];
	var travel_captions = [];
	var landing_captions = [];
	var intlRel_captions = [];
	var riceFork_captions = [];

	client.posts('williammatsuda', {type: 'photo', tag: 'lovers', limit: 10}, function (err, data) {
		if (err) {console.log(err);} else {
			for (var p in data.posts) {
				// console.log(p);
				// console.log(data.posts[p].photos[0].alt_sizes[0].url);
				lovers.push(data.posts[p].photos[0].alt_sizes[0].url);
				var caption = data.posts[p].caption.replace(/(<([^>]+)>)/ig,"");
				lovers_captions.push(caption);
			}
			// console.log('lovers: ====');
			// console.log(lovers);
			client.posts('williammatsuda', {type: 'photo', tag: 'fashion', limit: 10}, function (err, data) {
				if (err) {console.log(err);} else {
					for (var p in data.posts) {
						fashion.push(data.posts[p].photos[0].alt_sizes[0].url);
						var caption = data.posts[p].caption.replace(/(<([^>]+)>)/ig,"");
						fashion_captions.push(caption);
					}
					// console.log('fashion: ============');
					// console.log(fashion);
					client.posts('williammatsuda', {type: 'photo', tag: 'everyday', limit: 10}, function (err, data) {
						if (err) {console.log(err);} else {
							for (var p in data.posts) {
								everyday.push(data.posts[p].photos[0].alt_sizes[0].url);
								var caption = data.posts[p].caption.replace(/(<([^>]+)>)/ig,"");
								everyday_captions.push(caption);
							}
							// console.log('everyday1111111');
							// console.log(everyday);

							client.posts('williammatsuda', {type: 'photo', tag: 'Minnesota Public Radio', limit: 10}, function (err, data) {
								if (err) {console.log(err);} else {
									for (var p in data.posts) {
										mpr.push(data.posts[p].photos[0].alt_sizes[0].url);

										var caption = data.posts[p].caption.replace(/(<([^>]+)>)/ig,"");
										mpr_captions.push(caption);
									}
									// console.log('mpr: ');
									// console.log(mpr);
									client.posts('williammatsuda', {type: 'photo', tag: 'The Global Post', limit: 10},
										function (err, data) {
											if (err) {console.log(err);} else {
												for (var p in data.posts) {
													globalpost.push(data.posts[p].photos[0].alt_sizes[0].url);
													// var raw = data.posts[p].caption;
													var caption = data.posts[p].caption.replace(/(<([^>]+)>)/ig,"");

													// console.log("=========");
													// console.log("raw", raw);
													// console.log("caption", caption);
													// console.log("pic", data.posts[p].photos[0].alt_sizes[0].url);
													globalpost_captions.push(caption);
												}
												// console.log(data);
												// console.log('gp: ');
												// console.log(globalpost);

												client.posts('williammatsuda', {type: 'video', tag: 'video', limit: 10},
													function (err, data) {
														if (err) {console.log(err);} else {
															for (var p in data.posts) {
																var raw = data.posts[p].permalink_url;
																// console.log(raw);
																var split = raw.split("?v=");
																var embed = '//www.youtube.com/embed/' + split[1];
																// console.log(embed);
																video.push(embed);
															}
															// console.log(JSON.stringify(data));
														}

														client.posts('williammatsuda', {type: 'photo', tag: 'travel', limit: 10},
															function (err, data) {
																if (err) {console.log(err);} else {
																	for (var p in data.posts) {
																		travel.push(data.posts[p].photos[0].alt_sizes[0].url);
																	}
																}

																// console.log(data);

																client.posts('williammatsuda', {type: 'photo', tag: 'landing', limit: 1},
																	function (err, data) {
																		if (err) {console.log(err);} else {
																			landing.push(data.posts[0].photos[0].alt_sizes[0].url);
																		}

																		client.posts('williammatsuda', {type: 'photo', tags: 'International Relations', limit: 10},
																			function (err, data) {
																				for (var p in data.posts) {
																					intlRel.push(data.posts[p].photos[0].alt_sizes[0].url);
																					var caption = data.posts[p].caption.replace(/(<([^>]+)>)/ig,"");
																					intlRel_captions.push(caption);
																					// console.log(intlRel, intlRel_captions);
																				}

																				client.posts('williammatsuda', {type: 'photo', tags: 'Now I Eat Rice With A Fork', limit: 10},
																					function (err, data) {
																						for (var p in data.posts) {
																							riceFork.push(data.posts[p].photos[0].alt_sizes[0].url);
																							var caption = data.posts[p].caption.replace(/(<([^>]+)>)/ig,"");
																							riceFork_captions.push(caption);
																							console.log(riceFork, riceFork_captions);
																						}
																						var images = [];
																						images.lovers = lovers;
																						images.fashion = fashion;
																						images.everyday = everyday;
																						images.mpr = mpr;
																						images.gp = globalpost;
																						images.video = video;
																						images.travel = travel;
																						images.landing = landing;
																						images.intlRel = intlRel;
																						images.riceFork = riceFork;

																						images.lovers_captions = lovers_captions;
																						images.fashion_captions = fashion_captions;
																						images.everyday_captions = everyday_captions;
																						images.mpr_captions = mpr_captions;
																						images.gp_captions = globalpost_captions;
																						images.video_captions = video_captions;
																						images.travel_captions = travel_captions;
																						images.landing_captions = landing_captions;
																						images.intlRel_captions = intlRel_captions;
																						images.riceFork_captions = riceFork_captions;

																						// console.log(images.intlRel);
																						// console.log(images.intlRel_captions);
																						// console.log(images.riceFork);
																						// console.log(images.riceFork_captions);
																						// console.log(images);
																						res.render('index', {
																							title: 'Will Matsuda',
																							images: images
																						});
																					});	//	end ricefork get
																				
																			});	//	end intlrel get
																		
																	}); //	end landing get 
															}); //	end travel get
														
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
