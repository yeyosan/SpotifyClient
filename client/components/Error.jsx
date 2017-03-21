var React = require('react');

var Error = React.createClass({
	render: function () {
		console.log(this.props);
		return (
			<h2 className="error">Error</h2>
		);
	}
});

module.exports = Error;