import axios from 'axios';
import {
	GET_ERRORS,
	PROJECT_LOADING,
	GET_PROJECT,
	GET_PROJECTS
} from './types';

export const addProject = (projectData, history) => dispatch => {
	axios
		.post('/api/projects', projectData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const updateProject = (projectData, id, history) => dispatch => {
	axios
		.put(`/api/projects/${id}`, projectData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Get Projects
export const getProjects = () => dispatch => {
	dispatch(setProjectLoading());
	axios
		.get('/api/projects')
		.then(res =>
			dispatch({
				type: GET_PROJECTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: []
			})
		);
};

export const getProject = id => dispatch => {
	dispatch(setProjectLoading());
	axios
		.get(`/api/projects/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROJECT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROJECT,
				payload: {}
			})
		);
};

export const deleteProject = id => dispatch => {
	axios
		.delete(`/api/projects/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROJECTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set Loading State
export const setProjectLoading = () => {
	return {
		type: PROJECT_LOADING
	};
};
