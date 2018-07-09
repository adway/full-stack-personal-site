import {
  ADD_PROJECT,
  GET_PROJECTS,
  PROJECT_LOADING,
  DELETE_PROJECT,
  GET_PROJECT
} from '../actions/types';

const initialState = {
  projects: [],
  project: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    default:
      return state;
  }
}
