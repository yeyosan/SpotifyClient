var React = require('react');

var Query = React.createClass({
	getDefaultProps: function () {
		return {
			title: 'All'
		};
	},
	render: function () {
		return (
			<div>
				<input type="text" onChange={this.props.onChange} />
				<button type="button" onClick={this.props.onSubmit}>Search {this.props.title}</button>
			</div>
		);
	}
});

module.exports = Query;