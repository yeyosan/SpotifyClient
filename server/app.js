var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');

var routes = require('./routes');

var port = process.env.PORT || 3000;
var app = express();

app.set('port', port);
app.use(cookieParser())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(express.static(path.resolve(__dirname, '../public')))
	.use('/', routes);

app.listen(app.get('port'), function () {
	console.log('Express server running and listening on port ' + app.get('port'));
});