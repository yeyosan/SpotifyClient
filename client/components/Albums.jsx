var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Query = require('./Query.jsx');
var Results = require('./Results.jsx');

var Albums = React.createClass({
	limit: 9,
	getInitialState: function () {
		return {
			nextQuery: null,
			previousQuery: null,
			query: '',
			results: [],
			startAt: null,
			total: null
		};
	},
	render: function () {
		return (
			<ReactCSSTransitionGroup
				transitionName="fade-in"
				transitionAppear={true}
				transitionAppearTimeout={500}
				transitionEnter={false}
				transitionLeave={false}>
				<div className="content">
					<h2>Albums!</h2>
					<Query title="Album" onChange={this.handlerChange} onSubmit={this.handlerSubmit} />
					{
						this.state.results.length > 0 ?
						<Results
							limit={this.limit}
							nextResults={this.state.nextQuery}
							previousResults={this.state.previousQuery}
							refreshResults={this.updateQuery}
							results={this.state.results}
							startAt={this.state.startAt}
							totalResults={this.state.total}
							type="albums" /> :
						<span>No hay resultados</span>
					}
				</div>
			</ReactCSSTransitionGroup>
		);
	},
	handlerChange: function (ev) {
		if (ev.target.value.length > 0) {
			this.setState({
				query: 'https://api.spotify.com/v1/search?type=album&offset=0&limit=' + this.limit + '&q=' + ev.target.value
			})
		}
		else {
			this.setState({ query: '' });
		}
	},
	handlerSubmit: function () {
		if (this.state.query.length) {
			var self = this;
			var xmlHTTP = new XMLHttpRequest();

			xmlHTTP.open('GET', self.state.query, true);
			xmlHTTP.onreadystatechange = function () {
				if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
					var albums = JSON.parse(xmlHTTP.responseText).albums;

					self.setState({
						nextQuery: albums.next,
						previousQuery: albums.previous,
						results: albums.items,
						startAt: albums.offset,
						total: albums.total
					});
				}
			}
			xmlHTTP.send(null);
		}
	},
	updateQuery: function (newQuery) {
		this.setState({ query: newQuery }, this.handlerSubmit);
	}
});

module.exports = Albums;