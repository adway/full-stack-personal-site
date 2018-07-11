import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProjects, deleteProject } from '../../actions/projectActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			projects: []
		};
	}

	componentDidMount() {
		this.props.getProjects();
		window.scrollTo(0, 0);
	}

	onDeleteClick(id) {
		this.props.deleteProject(id);
	}

	render() {
		const { projects, loading } = this.props.project;
		let projectsContent;
		if (projects === null || loading) {
			projectsContent = <Spinner />;
		} else {
			projectsContent = (
				<div>
					<section className="hero is-dark is-bold is-medium">
						<div className="hero-body">
							<div className="container">
								<h1 className="title is-1">dashboard</h1>
							</div>
						</div>
					</section>

					<section className="section">
						<div className="columns">
							<div className="column">
								<Link to="/add-project" className="button is-outlined is-link">
									Add Project
								</Link>
								<table
									className="table is-fullwidth"
									style={{ marginTop: '2em' }}
								>
									<thead>
										<tr>
											<th>Project</th>
											<th>Edit</th>
											<th>Delete</th>
										</tr>
									</thead>
									<tbody>
										{this.props.project.projects.map(project => {
											return (
												<tr key={project._id}>
													<td>{project.title}</td>
													<td>
														<Link
															to={`/edit-project/${project._id}`}
															className="button is-outlined is-warning"
														>
															Edit
														</Link>
													</td>
													<td>
														{' '}
														<button
															onClick={this.onDeleteClick.bind(
																this,
																project._id
															)}
															className="button is-outlined is-danger"
														>
															Delete
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</section>
				</div>
			);
		}
		return (
			<div>
				<section className="hero is-dark is-bold is-medium">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1">dashboard</h1>
						</div>
					</div>
				</section>
				<section className="section">
					<div className="columns">
						<div className="column">
							<Link to="/add-project" className="button is-outlined is-link">
								Add Project
							</Link>
							<table
								className="table is-fullwidth"
								style={{ marginTop: '2em' }}
							>
								<thead>
									<tr>
										<th>Project</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{this.props.project.projects.map(project => {
										return (
											<tr key={project._id}>
												<td>{project.title}</td>
												<td>
													<Link
														to={`/edit-project/${project._id}`}
														className="button is-outlined is-warning"
													>
														Edit
													</Link>
												</td>
												<td>
													{' '}
													<button
														onClick={this.onDeleteClick.bind(this, project._id)}
														className="button is-outlined is-danger"
													>
														Delete
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getProjects: PropTypes.func.isRequired,
	deleteProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	project: state.project
});

export default connect(
	mapStateToProps,
	{ getProjects, deleteProject }
)(Dashboard);
