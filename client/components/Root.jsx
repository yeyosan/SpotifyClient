var React = require('react');
var Spotify = require('spotify-web-api-js');

var Login = require('./Login.jsx');
var App = require('./App.jsx');

var Root = React.createClass({
	getInitialState: function () {
		return {
			error: false,
			loading: true,
			user: null,
			email: null,
			country: null,
			images: []
		}
	},
	componentDidMount: function () {
		if (window.location.search.length > 0) {
			var params = window.location.search.substr(1).split('&');
			var self = this;
			var spotifyApi = new Spotify();
			
			spotifyApi.setAccessToken(params[0]);
			spotifyApi.getMe()
				.then(function (data) {
					self.setState({
						loading: false,
						user: data.id,
						email: data.email,
						country: data.country,
						images: data.images
					});
				})
				.catch(function (err) {
					self.setState({
						error: true,
						loading: false
					})
				});
		}
	},
	render: function () {
		return (window.location.search.length > 0) ? this.renderLogged() : this.renderLogin();
	},
	renderLogin: function () {
		return (
			<Login />
		);
	},
	renderLogged: function () {
		if (this.state.loading) {
			return (
				<h2 className="loading">Loading...</h2>
			);
		}
		else {
			if (this.setState.error) {
				return (
					<h2 className="error">Error</h2>
				)
			}
			else {
				return (
					<App user={this.state.user} email={this.state.email} country={this.state.country} />
				);
			}
		}
	}
});

module.exports = Root;