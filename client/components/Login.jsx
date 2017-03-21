var React = require('react');

var Login = React.createClass({
	render: function () {
		return (
			<a className="login" href="/login">Click here to Sign In Spotify</a>
		);
	}
});

module.exports = Login;