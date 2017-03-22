var React = require('react');

var Results = require('./Results.jsx');

var Artist = React.createClass({
	titleStyle: {},
	getInitialState: function () {
		return {
			artist: {},
			data: [],
			loading: true
		}
	},
	componentDidMount: function () {
		var self = this;
		var xmlHTTP = new XMLHttpRequest();

		xmlHTTP.open('GET', 'https://api.spotify.com/v1/artists/' + self.props.match.params.id, true);
		xmlHTTP.onreadystatechange = function () {
			if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
				var artist = JSON.parse(xmlHTTP.responseText);
				var xmlHTTPdata = new XMLHttpRequest();
				
				if (artist.images.length > 0) {
					self.titleStyle = {
						background: 'url(' + artist.images[0].url + ') no-repeat left center',
						backgroundSize: 'contain',
						paddingLeft: '1.5em'
					};
				}

				xmlHTTPdata.open('GET', 'https://api.spotify.com/v1/artists/' + self.props.match.params.id + '/albums', true);
				xmlHTTPdata.onreadystatechange = function () {
					if (xmlHTTPdata.readyState == 4 && xmlHTTPdata.status == 200) {
						self.setState({
							artist: artist,
							data: JSON.parse(xmlHTTPdata.responseText).items,
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
					<h2 style={this.titleStyle}>{this.state.artist.name} - Albums</h2>
					<Results results={this.state.data} type="albums" />
				</div>
			);
		}
	}
});

module.exports = Artist;