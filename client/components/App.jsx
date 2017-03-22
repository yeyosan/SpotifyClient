var React = require('react');
var Router = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;
var createBrowserHistory = require('history').createBrowserHistory;

var Index = require('./Index.jsx');
var Artists = require('./Artists.jsx');
var Artist = require('./Artist.jsx');
var Albums = require('./Albums.jsx');
var Album = require('./Album.jsx');
var Tracks = require('./Tracks.jsx');

var App = React.createClass({
	render: function () {
		return (
			<Router history={createBrowserHistory()}>
				<div>
					<nav>
						<ul>
							<li><Link to="/artists">Artists</Link></li>
							<li><Link to="/albums">Albums</Link></li>
							<li><Link to="/tracks">Tracks</Link></li>
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
							<a className="logout" href="/logout">Logout</a>
						</aside>
						<Route path="/" exact component={Index} />
						<Route path="/artists" exact component={Artists} />
						<Route path="/artists/:id" component={Artist} />
						<Route path="/albums" exact component={Albums} />
						<Route path="/albums/:id" component={Album} />
						<Route path="/tracks" component={Tracks} />
					</div>
				</div>
			</Router>
		);
	}
});

module.exports = App;