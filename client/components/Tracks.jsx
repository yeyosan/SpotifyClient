var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Query = require('./Query.jsx');
var Results = require('./Results.jsx');

var Tracks = React.createClass({
	limit: 20,
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
					<h2>Tracks!</h2>
					<Query title="Track" onChange={this.handlerChange} onSubmit={this.handlerSubmit} />
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
							type="tracks"/> :
						<span>No hay resultados</span>
					}
				</div>
			</ReactCSSTransitionGroup>
		);
	},
	handlerChange: function (ev) {
		if (ev.target.value.length > 0) {
			this.setState({
				query: 'https://api.spotify.com/v1/search?type=track&offset=0&limit=' + this.limit + '&q=' + ev.target.value
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
					var tracks = JSON.parse(xmlHTTP.responseText).tracks;
					
					self.setState({
						nextQuery: tracks.next,
						previousQuery: tracks.previous,
						results: tracks.items,
						startAt: tracks.offset,
						total: tracks.total
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

module.exports = Tracks;