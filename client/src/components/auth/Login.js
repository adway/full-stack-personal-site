import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		window.scrollTo(0, 0);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			username: this.state.username,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<section className="hero is-dark is-bold is-medium">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1">login</h1>
						</div>
					</div>
				</section>
				<section className="section">
					<div className="columns">
						<div className="column">
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									name="username"
									placeholder="username"
									value={this.state.username}
									label="Username"
									error={errors.username}
									onChange={this.onChange}
								/>

								<TextFieldGroup
									name="password"
									placeholder="password"
									value={this.state.password}
									label="Password"
									error={errors.password}
									onChange={this.onChange}
									type="password"
								/>

								<input type="submit" className="button is-link is-outlined" />
							</form>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	history: PropTypes.object
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
