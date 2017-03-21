var React = require('react');
var Router = require('react-router-dom').Router;
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;
var createBrowserHistory = require('history').createBrowserHistory;

var Index = require('./Index.jsx');
var Artists = require('./Artists.jsx');
var Albums = require('./Albums.jsx');
var Tracks = require('./Tracks.jsx');

var App = React.createClass({
	render: function () {
		return (
			<Router history={createBrowserHistory()}>
				<div>
					<nav>
						<ul>
							<li><Link to="artists">Artists</Link></li>
							<li><Link to="albums">Albums</Link></li>
							<li><Link to="tracks">Tracks</Link></li>
						</ul>
						<hr />
					</nav>
					<div>
						<aside>
							<table>
								<tbody>
									<tr>
										<th>User</th>
										<td>{this.props.user}</td>
									</tr>
									<tr>
										<th>Email</th>
										<td>{this.props.email}</td>
									</tr>
									<tr>
										<th>Country</th>
										<td>{this.props.country}</td>
									</tr>
								</tbody>
							</table>
						</aside>
						<Route path="/" exact component={Index} />
						<Route path="/artists" component={Artists} />
						<Route path="/albums" component={Albums} />
						<Route path="/tracks" component={Tracks} />
					</div>
				</div>
			</Router>
		);
	}
});

module.exports = App;