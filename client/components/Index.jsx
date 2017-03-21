var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Index = React.createClass({
	render: function () {
		return (
			<ReactCSSTransitionGroup
				transitionName="fade-in"
				transitionAppear={true}
				transitionAppearTimeout={500}
				transitionEnter={false}
				transitionLeave={false}>
				<div className="content">
					<h2>Welcome!</h2>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
});
					
module.exports = Index;