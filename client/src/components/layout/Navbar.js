import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import classnames from 'classnames';

class Navbar extends Component {
	constructor() {
		super();
		this.state = {
			navToggled: false
		};

		this.onNavbarClick = this.onNavbarClick.bind(this);
		this.onLogoutClick = this.onLogoutClick.bind(this);
	}

	onNavbarClick() {
		this.setState(prevState => ({
			navToggled: !prevState.navToggled
		}));
	}

	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}

	render() {
		const { navToggled } = this.state;

		const { isAuthenticated } = this.props.auth;

		const authLinks = (
			<div className="navbar-end">
				<Link to="/" className="navbar-item">
					home
				</Link>
				<Link to="/projects" className="navbar-item">
					projects
				</Link>
				<Link to="/dashboard" className="navbar-item">
					dashboard
				</Link>
				<a href="/" className="navbar-item" onClick={this.onLogoutClick}>
					logout
				</a>
			</div>
		);

		const guestLinks = (
			<div className="navbar-end">
				<Link to="/" className="navbar-item">
					home
				</Link>
				<Link to="/projects" className="navbar-item">
					projects
				</Link>
			</div>
		);

		return (
			<div>
				<nav className="navbar is-dark">
					<div className="container">
						<div className="navbar-brand">
							<a
								className="navbar-item"
								href="#"
								style={{ fontWeight: 'bold' }}
							>
								adway s. wadekar
							</a>
							<span
								className={classnames('navbar-burger burger', {
									'is-active': navToggled
								})}
								data-target="navMenu"
								onClick={this.onNavbarClick}
							>
								<span />
								<span />
								<span />
							</span>
						</div>
						<div
							id="navMenu"
							className={classnames('navbar-menu', {
								'is-active': navToggled
							})}
						>
							{isAuthenticated ? authLinks : guestLinks}
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Navbar);