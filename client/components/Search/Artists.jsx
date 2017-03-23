var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Query = require('./Query.jsx');
var Results = require('./Results.jsx');

var Artists = React.createClass({
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
					<h2>Artists!</h2>
					<Query title="Artist" onChange={this.handlerChange} onSubmit={this.handlerSubmit} />
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
							type="artists" /> :
						<span>No hay resultados</span>
					}
				</div>
			</ReactCSSTransitionGroup>
		);
	},
	handlerChange: function (ev) {
		if (ev.target.value.length > 0) {
			this.setState({
				query: 'https://api.spotify.com/v1/search?type=artist&offset=0&limit=' + this.limit + '&q=' + ev.target.value
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
					var artists = JSON.parse(xmlHTTP.responseText).artists;
					
					self.setState({
						nextQuery: artists.next,
						previousQuery: artists.previous,
						results: artists.items,
						startAt: artists.offset,
						total: artists.total
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

module.exports = Artists;