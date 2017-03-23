var React = require('react');

var Results = require('./Results.jsx');

var Artist = React.createClass({
	limit: 9,
	titleStyle: {},
	getInitialState: function () {
		return {
			artist: {},
			loading: true,
			nextQuery: null,
			previousQuery: null,
			query: 'https://api.spotify.com/v1/artists/' + this.props.match.params.id + '/albums?limit=' + this.limit,
			results: [],
			startAt: null,
			total: null
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

				xmlHTTPdata.open('GET', self.state.query, true);
				xmlHTTPdata.onreadystatechange = function () {
					if (xmlHTTPdata.readyState == 4 && xmlHTTPdata.status == 200) {
						var albums = JSON.parse(xmlHTTPdata.responseText);

						self.setState({
							artist: artist,
							loading: false,
							nextQuery: albums.next,
							previousQuery: albums.previous,
							results: albums.items,
							startAt: albums.offset,
							total: albums.total
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
					<Results
						limit={this.limit}
						nextResults={this.state.nextQuery}
						previousResults={this.state.previousQuery}
						refreshResults={this.updateQuery}
						results={this.state.results}
						startAt={this.state.startAt}
						totalResults={this.state.total}
						type="albums" />
				</div>
			);
		}
	},
	updateQuery: function (newQuery) {
		this.setState({ query: newQuery }, this.componentDidMount);
	}
});

module.exports = Artist;