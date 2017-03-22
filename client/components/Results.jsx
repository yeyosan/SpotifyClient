var React = require('react');
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;

var Track = require('./Track.jsx');

var Results = React.createClass({
	getInitialState: function () {
		return {
			currentTrack: null
		};
	},
	render: function () {
		var listClass;
		var results;
		switch (this.props.type) {
			case 'artists':
				listClass = 'grid';
				results = this.props.results.map(function (result) {
					return (
						<li key={result.id}>
							<Link to={'/artists/' + result.id}>
								<figure>
									<div className="imageContainer">
										<img src={result.images.length > 0 ? result.images[0].url : 'img/unknown-icon.png'} />
									</div>
									<figcaption>{result.name + ' - ' + result.followers.total + ' seguidores'}</figcaption>
								</figure>
							</Link>
						</li>
					);
				});
			break;
			case 'albums':
				listClass = 'grid';
				results = this.props.results.map(function (result) {
					return (
						<li key={result.id}>
							<Link to={'/albums/' + result.id}>
								<figure>
									<div className="imageContainer">
										<img src={result.images.length > 0 ? result.images[0].url : 'img/unknown-icon.png'} />
									</div>
									<figcaption>{result.name + ' - ' + result.artists[0].name}</figcaption>
								</figure>
							</Link>
						</li>
					);
				});
			break;
			case 'tracks':
				var self = this;

				listClass = 'list';
				results = this.props.results.map(function (result) {
					return (
						<li key={result.id}>
							<Track trackData={result} currentTrackId={self.state.currentTrack} selectTrack={self.setCurrentTrack} />
						</li>
					);
				});
			break;
		};

		return (
			<div>
				<h3>Results</h3>
				<ul className={listClass}>
					{results}
				</ul>
			</div>
		);
	},
	setCurrentTrack: function (trackId) {
		this.setState({ currentTrack: trackId });
	}
});

module.exports = Results;