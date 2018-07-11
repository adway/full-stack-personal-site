import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { updateProject, getProject } from '../../actions/projectActions';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from '../common/Spinner';

class EditProject extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			date: '',
			materials: '',
			image: '',
			description: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const projectData = {
			title: this.state.title,
			date: this.state.date,
			materials: this.state.materials,
			image: this.state.image,
			description: this.state.description
		};

		this.props.updateProject(
			projectData,
			this.props.match.params.id,
			this.props.history
		);
	}

	componentDidMount() {
		this.props.getProject(this.props.match.params.id);
		window.scrollTo(0, 0);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.project.project) {
			const project = nextProps.project.project;
			project.materials = !isEmpty(project.materials) ? project.materials : '';
			project.date = !isEmpty(project.date)
				? moment(project.date).format('MM/DD/YYYY')
				: '';
			project.image = !isEmpty(project.image) ? project.image : '';
			this.setState({
				title: project.title,
				date: project.date,
				materials: project.materials,
				description: project.description,
				image: project.image
			});
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	render() {
		const { errors } = this.state;
		const { project, loading } = this.props.project;

		let content;

		if (project === null || loading) {
			content = <Spinner />;
		} else {
			content = (
				<div>
					<section className="section">
						<form noValidate onSubmit={this.onSubmit}>
							<TextFieldGroup
								name="title"
								placeholder="Title"
								value={this.state.title}
								label="Title"
								error={errors.title}
								onChange={this.onChange}
							/>

							<TextFieldGroup
								name="date"
								placeholder="mm/dd/yyyy"
								value={this.state.date}
								label="Date"
								error={errors.date}
								onChange={this.onChange}
							/>

							<TextFieldGroup
								name="materials"
								placeholder="Materials"
								value={this.state.materials}
								label="Materials"
								error={errors.materials}
								onChange={this.onChange}
							/>

							<TextFieldGroup
								name="image"
								placeholder="Image"
								value={this.state.image}
								label="Image"
								error={errors.image}
								onChange={this.onChange}
							/>

							<TextAreaFieldGroup
								name="description"
								value={this.state.description}
								label="Description"
								error={errors.description}
								onChange={this.onChange}
							/>

							<input type="submit" className="button is-link is-outlined" />
						</form>
					</section>
				</div>
			);
		}

		return (
			<div>
				<section className="hero is-dark is-bold is-medium">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1">edit project</h1>
						</div>
					</div>
				</section>
				{content}
			</div>
		);
	}
}

EditProject.propTypes = {
	updateProject: PropTypes.func.isRequired,
	getProject: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	project: state.project
});

export default connect(
	mapStateToProps,
	{ updateProject, getProject }
)(EditProject);
