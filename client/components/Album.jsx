var React = require('react');

var Results = require('./Results.jsx');

var Album = React.createClass({
	limit: 20,
	titleStyle: {},
	getInitialState: function () {
		return {
			album: {},
			loading: true,
			nextQuery: null,
			previousQuery: null,
			query: 'https://api.spotify.com/v1/albums/' + this.props.match.params.id + '/tracks?limit=' + this.limit,
			results: [],
			startAt: null,
			total: null
		}
	},
	componentDidMount: function () {
		var self = this;
		var xmlHTTP = new XMLHttpRequest();

		xmlHTTP.open('GET', 'https://api.spotify.com/v1/albums/' + self.props.match.params.id, true);
		xmlHTTP.onreadystatechange = function () {
			if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
				var album = JSON.parse(xmlHTTP.responseText);
				var xmlHTTPdata = new XMLHttpRequest();
				
				if (album.images.length > 0) {
					self.titleStyle = {
						background: 'url(' + album.images[0].url + ') no-repeat',
						backgroundSize: 'contain',
						paddingLeft: '1.5em'
					};
				}

				xmlHTTPdata.open('GET', self.state.query, true);
				xmlHTTPdata.onreadystatechange = function () {
					if (xmlHTTPdata.readyState == 4 && xmlHTTPdata.status == 200) {
						self.setState({
							album: album,
							results: JSON.parse(xmlHTTPdata.responseText).items,
							loading: false
						});
					}
				};
				xmlHTTPdata.send(null);
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
			return (
				<div className="content">
					<h2 style={this.titleStyle}>{this.state.album.name} ({this.state.album.artists[0].name}) - Tracks</h2>
					<Results results={this.state.results} type="tracks" />
				</div>
			);
		}
	}
});

module.exports = Album;