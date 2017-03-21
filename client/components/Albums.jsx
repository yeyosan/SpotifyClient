var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Query = require('./Query.jsx');
var Results = require('./Results.jsx');

var Albums = React.createClass({
	getInitialState: function () {
		return {
			albumQuery: '',
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
					<h2>Albums!</h2>
					<Query title="Album" onChange={this.handlerChange} onSubmit={this.handlerSubmit} />
					{this.state.results.length > 0 ? <Results results={this.state.results} type="albums" /> : <span>No hay resultados</span>}
				</div>
			</ReactCSSTransitionGroup>
		);
	},
	handlerChange: function (ev) {
		this.setState({
			albumQuery: ev.target.value
		})
	},
	handlerSubmit: function () {
		if (this.state.albumQuery.length) {
			var self = this;
			var xmlHTTP = new XMLHttpRequest();

			xmlHTTP.open('GET', 'https://api.spotify.com/v1/search?type=album&q=' + this.state.albumQuery, true);
			xmlHTTP.onreadystatechange = function () {
				if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
					console.info(JSON.parse(xmlHTTP.responseText).albums.items);
					self.setState({ results: JSON.parse(xmlHTTP.responseText).albums.items });
				}
			}
			xmlHTTP.send(null);
		}
	}
});

module.exports = Albums;