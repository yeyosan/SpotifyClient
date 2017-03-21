var React = require('react');

var Query = require('./Query.jsx');
var Results = require('./Results.jsx');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Artists = React.createClass({
	getInitialState: function () {
		return {
			artistQuery: '',
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
					<h2>Artists!</h2>
					<Query title="Artist" onChange={this.handlerChange} onSubmit={this.handlerSubmit} />
					{this.state.results.length > 0 ? <Results results={this.state.results} type="artists" /> : <span>No hay resultados</span>}
				</div>
			</ReactCSSTransitionGroup>
		);
	},
	handlerChange: function (ev) {
		this.setState({
			artistQuery: ev.target.value
		})
	},
	handlerSubmit: function () {
		if (this.state.artistQuery.length) {
			var self = this;
			var xmlHTTP = new XMLHttpRequest();

			xmlHTTP.open('GET', 'https://api.spotify.com/v1/search?type=artist&q=' + this.state.artistQuery, true);
			xmlHTTP.onreadystatechange = function () {
				if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
					console.info(JSON.parse(xmlHTTP.responseText).artists.items);
					self.setState({ results: JSON.parse(xmlHTTP.responseText).artists.items });
				}
			}
			xmlHTTP.send(null);
		}
	}
});

module.exports = Artists;