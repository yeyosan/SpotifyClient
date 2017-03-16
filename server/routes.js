var express = require('express');
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

var router = new express.Router();
var scopes = ['user-read-private', 'user-read-email'];
var spotifyApi = new Spotify(SPOTIFY_CONF);

router.get('/login', function (request, response) {
	var state = generateRandomString(16);

	response.cookie(STATE_KEY, state);
	console.info('Going to login in Spotify...');
	response.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

router.get('/callback', function (request, response) {
	var code = request.query.code;
	var state = request.query.state;
	var storedState = request.cookies ? request.cookies[STATE_KEY] : null;

	if (state === null || state !== storedState) {
		response.send('state mismatch');
	}
	else {
		response.clearCookie(STATE_KEY);

		spotifyApi.authorizationCodeGrant(code).then(function (data) {
			spotifyApi.setAccessToken(data.body.access_token);
			spotifyApi.setRefreshToken(data.body.refresh_token);

			spotifyApi.getMe().then(function (myInfo) {
				response.send(myInfo.body);
			});
		}).catch(function (err) {
			response.send('invalid token');
			console.error('error', err);
		});
	}
});

module.exports = router;