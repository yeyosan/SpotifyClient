var React = require('react');
var Spotify = require('spotify-web-api-js');

var Login = require('./Login.jsx');
var App = require('./App.jsx');

var Root = React.createClass({
	getInitialState: function () {
		return {
			accessToken: null,
			country: null,
			email: null,
			error: false,
			loading: true,
			user: null
		}
	},
	componentDidMount: function () {
		var self = this;
		var spotifyApi = new Spotify();
		var xmlHTTP = new XMLHttpRequest();

		xmlHTTP.open('GET', '/getAccessToken', true);
		xmlHTTP.onreadystatechange = function () {
			if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
				var accessToken = JSON.parse(xmlHTTP.responseText).accessToken;
				
				if (accessToken !== null) {
					spotifyApi.setAccessToken(accessToken);
					spotifyApi.getMe()
						.then(function (data) {
							self.setState({
								accessToken:  accessToken,
								country: data.country,
								email: data.email,
								loading: false,
								user: data.id,
							});
						})
						.catch(function (err) {
							self.setState({
								error: true,
								loading: false
							})
						});
				}
				else {
					self.setState({ loading: false });
				}
			}
		};
		xmlHTTP.send(null);
	},
	render: function () {
		if (this.state.loading) {
			return (
				<h2 className="loading">Loading...</h2>
			);
		}
		else {
			return (this.state.accessToken !== null) ? this.renderLogged() : this.renderLogin();
		}
	},
	renderLogin: function () {
		return (
			<Login />
		);
	},
	renderLogged: function () {
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
});

module.exports = Root;