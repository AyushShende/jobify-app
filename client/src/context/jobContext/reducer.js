import {
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions';
import { INITIAL_STATE } from './jobContext';

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    case CLEAR_VALUES:
      return {
        ...INITIAL_STATE,
      };

    case CREATE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case GET_JOBS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };

    case SET_EDIT_JOB:
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };

    case DELETE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case EDIT_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case EDIT_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case SHOW_STATS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };

    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default reducer;
