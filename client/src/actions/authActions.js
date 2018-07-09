import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Login - Get user token

export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			// Save to local storage
			const { token } = res.data;
			// Set token to Local Storage
			localStorage.setItem('jwtToken', token);
			// Set token to Auth Header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header
	setAuthToken(false);
	// Set current user to empty object, which will a
	dispatch(setCurrentUser({}));
};

// Set Logged in User
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
