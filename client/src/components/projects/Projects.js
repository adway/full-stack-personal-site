import React, { Component } from 'react';
import { getProjects } from '../../actions/projectActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';

class Projects extends Component {
	constructor() {
		super();
		this.state = {
			projects: []
		};
	}

	componentDidMount() {
		this.props.getProjects();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.project.projects) {
			const projects = nextProps.project.projects;
			this.setState({
				projects: projects
			});
		}
	}

	render() {
		return (
			<div>
				<section className="hero is-dark is-bold is-medium">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1">projects</h1>
						</div>
					</div>
				</section>
				<section className="section">
					<div className="container">
						<div className="columns">
							<div className="column">
								{this.state.projects.map(project => {
									return (
										<div key={project._id} style={{ paddingBottom: '2em' }}>
											<h1 className="subtitle is-3">{project.title}</h1>
											<p className="subtitle is-5">
												{!isEmpty(project.date)
													? moment(project.date).format('MMMM YYYY')
													: ''}
											</p>
											<p>
												<Link
													to={`/projects/${project._id}`}
													className="button is-outlined is-link"
												>
													View Project
												</Link>
											</p>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

Projects.propTypes = {
	getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	project: state.project
});

export default connect(
	mapStateToProps,
	{ getProjects }
)(Projects);
