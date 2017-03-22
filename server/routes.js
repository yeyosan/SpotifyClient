var express = require('express');
var path = require('path');
var Spotify = require('spotify-web-api-node');

function generateRandomString(length) {
	return (Math.random().toString(36) + Array(length).join('0')).slice(2, length + 2);
}

var SPOTIFY_CONF = {
	clientId: process.env.client_id,
	clientSecret: process.env.client_secret,
	redirectUri: process.env.redirect_uri
};
var STATE_KEY = 'spotify_auth_state';

var access_token = null;
var refresh_token = null;

var router = new express.Router();
var scopes = ['user-read-private', 'user-read-email'];
var spotifyApi = new Spotify(SPOTIFY_CONF);

router.get('/login', function (request, response) {
	var state = generateRandomString(16);

	response.cookie(STATE_KEY, state);
	//console.info('Going to login in Spotify...');
	response.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

router.get('/logout', function (request, response) {
	access_token = null;

	response.redirect('/');
});

router.get('/callback', function (request, response) {
	var code = request.query.code;
	var state = request.query.state;
	var storedState = request.cookies ? request.cookies[STATE_KEY] : null;

	//console.info('Comming into callback...');

	if (state === null || state !== storedState) {
		//console.info('mismatch');
		response.redirect('/#/error/state mismatch');
	}
	else {
		//console.info('match!');
		response.clearCookie(STATE_KEY);

		spotifyApi.authorizationCodeGrant(code).then(function (data) {
			access_token = data.body.access_token;
			refresh_token = data.body.refresh_token;

			spotifyApi.setAccessToken(access_token);
			spotifyApi.setRefreshToken(refresh_token);

			/*
			spotifyApi.getMe().then(function (myInfo) {
				console.info(myInfo);
			});
			*/

			response.redirect('/');
		}).catch(function (err) {
			//console.error('error', err);
			response.redirect('/#/error/invalid token');
		});
	}
});

router.get('/getAccessToken', function(request, response) {
	response.json({ accessToken: access_token });
});

router.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, '../public/index.html'));
});

module.exports = router;