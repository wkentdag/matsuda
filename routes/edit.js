var express = require('express');
var router = express.Router();

var bundle = require('../lib/bundle');

router.route('/')
  .get(function(req, res) {
    res.render('edit', {
      title: 'edit this shit'
    });
  }) //  end .get
  .post(function(req, res) {
    bundle();
    res.redirect('/');
    res.location('/');
  });


module.exports = router;