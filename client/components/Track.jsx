var React = require('react');

var Track = React.createClass({
	render: function () {
		return (
			<div>
				<a onClick={this.playTrack}>{this.props.trackData.name + ' - ' + this.props.trackData.artists[0].name}</a>
				{this.props.trackData.id === this.props.currentTrackId ? this.renderPlayer() : ''}
			</div>
		);
	},
	renderPlayer: function () {
		return (
			<div>
				<audio src={this.props.trackData.preview_url} controls autoplay>
					Your browser does not support AUDIO tag
				</audio>
			</div>
		);
	},
	playTrack: function (ev) {
		ev.preventDefault();
		this.props.selectTrack(this.props.trackData.id);
	}
});

module.exports = Track;