var React = require('react');
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;

var Results = React.createClass({
	render: function () {
		var listClass;
		var results;
		console.log('props', this.props);
		switch (this.props.type) {
			case 'artists':
				console.info('artists', this.props.results);
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
				console.info('albums', this.props.results);
				listClass = 'grid';
				results = this.props.results.map(function (result) {
					return (
						<li key={result.id}>
							<figure>
								<div className="imageContainer">
									<img src={result.images.length > 0 ? result.images[0].url : 'img/unknown-icon.png'} />
								</div>
								<figcaption>{result.name + ' - ' + result.artists[0].name}</figcaption>
							</figure>
						</li>
					);
				});
			break;
			case 'tracks':
				listClass = 'list';
				results = this.props.results.map(function (result) {
					return (
						<li key={result.id}>
							<span>{result.name + ' - ' + result.artists[0].name}</span>
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
	}
});

module.exports = Results;