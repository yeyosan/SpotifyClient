var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Query = require('./Query.jsx');
var Results = require('./Results.jsx');

var Tracks = React.createClass({
	getInitialState: function () {
		return {
			trackQuery: '',
			results: []
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
					{this.state.results.length > 0 ? <Results results={this.state.results} type="tracks"/> : <span>No hay resultados</span>}
				</div>
			</ReactCSSTransitionGroup>
		);
	},
	handlerChange: function (ev) {
		this.setState({
			trackQuery: ev.target.value
		})
	},
	handlerSubmit: function () {
		if (this.state.trackQuery.length) {
			var self = this;
			var xmlHTTP = new XMLHttpRequest();

			xmlHTTP.open('GET', 'https://api.spotify.com/v1/search?type=track&q=' + this.state.trackQuery, true);
			xmlHTTP.onreadystatechange = function () {
				if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
					console.info(JSON.parse(xmlHTTP.responseText).tracks.items);
					self.setState({ results: JSON.parse(xmlHTTP.responseText).tracks.items });
				}
			}
			xmlHTTP.send(null);
		}
	}
});

module.exports = Tracks;