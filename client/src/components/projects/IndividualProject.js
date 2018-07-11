import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProject } from '../../actions/projectActions';
import isEmpty from '../../validation/is-empty';
import moment from 'moment';
import showdown from 'showdown';
import Highlight from 'react-highlight';
import Spinner from '../common/Spinner';

class IndividualProject extends Component {
	constructor() {
		super();
		this.state = {
			description: ''
		};
	}

	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.getProject(this.props.match.params.id);
		}
		window.scrollTo(0, 0);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.project.project === null && this.props.project.loading) {
			this.props.history.push('/not-found');
		}

		const converter = new showdown.Converter({ tables: true });
		const text = nextProps.project.project.description;
		const html = converter.makeHtml(text);
		this.setState({
			description: html
		});
	}
	render() {
		const { project, loading } = this.props.project;
		let content;
		if (project === null || loading) {
			content = <Spinner />;
		} else {
			content = (
				<div>
					<section className="section">
						<div className="container">
							<div className="columns">
								{!isEmpty(this.props.project.project.image) ? (
									<img
										src={this.props.project.project.image}
										className="image"
										alt={this.props.project.project.title}
									/>
								) : (
									''
								)}
							</div>
						</div>
					</section>
					<section className="section">
						<div className="container">
							<div className="columns">
								<div className="column">
									<div className="markdown-body">
										<Highlight innerHTML={true}>
											{this.state.description}
										</Highlight>
									</div>
								</div>
							</div>
							<div className="columns">
								<div className="column">
									{!isEmpty(this.props.project.project.materials) ? (
										<p className="standard">
											<a
												href={this.props.project.project.materials}
												target="_blank"
												rel="noopener noreferrer"
												className="button is-outlined is-link"
											>
												View Materials
											</a>
										</p>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</section>
				</div>
			);
		}
		return (
			<div>
				{' '}
				<section className="section">
					<div className="container">
						<Link
							to="/projects"
							className="button is-link is-outlined"
							style={{ marginBottom: '2em' }}
						>
							Back to Projects
						</Link>
						<div className="hero is-medium is-dark">
							<div className="hero-body">
								<div className="container">
									<p className="title" style={{ textAlign: 'center' }}>
										{this.props.project.project.title}
									</p>
									{!isEmpty(this.props.project.project.date) ? (
										<p className="subtitle" style={{ textAlign: 'center' }}>
											{moment(this.props.project.project.date).format(
												'MMMM YYYY'
											)}
										</p>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
				{content}
			</div>
		);
	}
}

IndividualProject.propTypes = {
	project: PropTypes.object.isRequired,
	getProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	project: state.project
});
export default connect(
	mapStateToProps,
	{ getProject }
)(IndividualProject);
