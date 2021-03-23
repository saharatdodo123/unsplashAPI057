import React, { Component } from 'react';
import Search from './Search'
import Profile from './Profile'
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
	

	render() {
		return (
			<Router>
				<Route path="/" exact component={Search} />
				<Route path="/home" exact component={Search} />
				<Route path="/profile" component={Profile} />
			</Router>
		);
	}
}
