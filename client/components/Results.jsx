var React = require('react');

var Results = React.createClass({
	render: function () {
		var listClass;
		var results;

		switch (this.props.type) {
			case 'artists':
				listClass = 'grid';
				results = this.props.results.map(function (result) {
					return (
						<li key={result.id}>
							<figure>
								<div className="imageContainer">
									<img src={result.images.length > 0 ? result.images[0].url : 'img/unknown-icon.png'} />
								</div>
								<figcaption>{result.name + ' - ' + result.followers.total + ' seguidores'}</figcaption>
							</figure>
						</li>
					);
				});
			break;
			case 'albums':
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