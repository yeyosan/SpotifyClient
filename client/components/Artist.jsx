var React = require('react');

var Results = require('./Results.jsx');

var Artist = React.createClass({
	getInitialState: function () {
		return {
			data: [],
			loading: true
		}
	},
	componentDidMount: function () {
		var self = this;
		var xmlHTTP = new XMLHttpRequest();

		xmlHTTP.open('GET', 'https://api.spotify.com/v1/artists/' + this.props.match.params.id + '/albums', true);
		xmlHTTP.onreadystatechange = function () {
			if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
				self.setState({
					data: JSON.parse(xmlHTTP.responseText).items,
					loading: false
				});
			}
		}
		xmlHTTP.send(null);
	},
	render: function () {
		if (this.state.loading) {
			return (
				<h2 className="loading">Loading...</h2>
			);
		}
		else {
			return (
				<div className="content">
					<h2>{this.state.data[0].artists[0].name} Albums</h2>
					<Results results={this.state.data} type="albums" />
				</div>
			);
		}
	}
});

module.exports = Artist;