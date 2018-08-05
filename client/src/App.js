import React, { Component } from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components import
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AddProject from './components/dashboard/AddProject';
import Projects from './components/projects/Projects';
import EditProject from './components/dashboard/EditProject';
import IndividualProject from './components/projects/IndividualProject';

// Check for Token
if (localStorage.jwtToken) {
	// Set auth token header off
	setAuthToken(localStorage.jwtToken);
	// Decode the token and get user info and expiration
	const decoded = jwt_decode(localStorage.jwtToken);

	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<div className="stuff">
							<Navbar />
							<Route exact path="/" component={Landing} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/projects" component={Projects} />
							<Switch>
								<PrivateRoute
									exact
									path="/new"
									component={AddProject}
								/>
							</Switch>
							<Route exact path="/projects/:id" component={IndividualProject} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/projects/:id/edit"
									component={EditProject}
								/>
							</Switch>

						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
