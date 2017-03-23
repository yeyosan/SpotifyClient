var React = require('react');
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;

var Track = require('./Track.jsx');
var Results = React.createClass({
	propTypes: {
		limit: React.PropTypes.number,
		nextResults: React.PropTypes.string,
		startAt: React.PropTypes.number,
		previousResults: React.PropTypes.string,
		refreshResults: React.PropTypes.func,
		results: React.PropTypes.array.isRequired,
		type: React.PropTypes.oneOf(['artists', 'albums', 'tracks']),
		totalResults: React.PropTypes.number
	},
	getDefaultProps: function () {
		return {
			limit: null,
			nextResults: null,
			startAt: null,
			previousResults: null,
			refreshResults: null,
			totalResults: null
		};
	},
	getInitialState: function () {
		return {
			currentTrack: null
		};
	},
	render: function () {
		var listClass;
		var results;

		var showNext = this.props.nextResults !== null && this.props.nextResults.length > 0;
		var showPrevious = this.props.previousResults !== null && this.props.previousResults.length > 0;
		var showTotal = this.props.limit !== null && this.props.limit > 0 &&
			this.props.startAt !== null && this.props.startAt >= 0 &&
			this.props.totalResults !== null && this.props.totalResults > 0;

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
				<ul className="navigation">
					{showPrevious ? <li><a onClick={this.previousResults}>&laquo; Prev</a></li> : ''}
					{showTotal ? <li>{(this.props.startAt / this.props.limit) + 1} / {Math.ceil	(this.props.totalResults / this.props.limit)}</li> : ''}
					{showNext ? <li><a onClick={this.nextResults}>Next &raquo;</a></li> : ''}
				</ul>
				<ul className={listClass}>
					{results}
				</ul>
				<ul className="navigation">
					{showPrevious ? <li><a onClick={this.previousResults}>&laquo; Prev</a></li> : ''}
					{showTotal ? <li>{(this.props.startAt / this.props.limit) + 1} / {Math.ceil	(this.props.totalResults / this.props.limit)}</li> : ''}
					{showNext ? <li><a onClick={this.nextResults}>Next &raquo;</a></li> : ''}
				</ul>
			</div>
		);
	},
	setCurrentTrack: function (trackId) {
		this.setState({ currentTrack: trackId });
	},
	previousResults: function () {
		this.props.refreshResults(this.props.previousResults);
	},
	nextResults: function () {
		this.props.refreshResults(this.props.nextResults);
	}
});

module.exports = Results;