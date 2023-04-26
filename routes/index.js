var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index.ejs', { title: 'TypeWise Principal', message: 'Bienvenido a TypeWise!' });
});

module.exports = router;
