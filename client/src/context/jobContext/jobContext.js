import { createContext, useCallback, useContext, useReducer } from 'react';
import reducer from './reducer';
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
import authFetch from '../../utils/axios';
import { useAlertContext } from '../alertContext/alertContext';
import { useUserContext } from '../userContext/userContext';

const JobContext = createContext();

export const INITIAL_STATE = {
  isLoading: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
};

export const JobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { displayAlert } = useAlertContext();
  const { logoutUser } = useUserContext();

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post('/jobs', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      displayAlert('success', 'New Job Created');
      dispatch({ type: CREATE_JOB_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) return;
      displayAlert('danger', error.response.data.message);
      dispatch({ type: CREATE_JOB_ERROR });
    }
  };

  const getJobs = useCallback(
    async ({ page, search, searchStatus, searchType, sort }) => {
      let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      dispatch({ type: GET_JOBS_BEGIN });
      try {
        const res = await authFetch.get(url);
        const { jobs, totalJobs, numOfPages } = res.data;
        dispatch({
          type: GET_JOBS_SUCCESS,
          payload: { jobs, totalJobs, numOfPages },
        });
      } catch (error) {
        logoutUser();
      }
    },
    [logoutUser]
  );

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { editJobId, position, company, jobLocation, jobType, status } =
        state;
      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      displayAlert('success', 'Job Edited Successfully');
      dispatch({ type: EDIT_JOB_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) return;
      displayAlert('danger', error.response.data.message);
      dispatch({ type: EDIT_JOB_ERROR });
    }
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs({ ...state });
    } catch (error) {
      if (error.response.status === 401) return;
      displayAlert('danger', error.response.data.message);
      dispatch({ type: DELETE_JOB_ERROR });
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const res = await authFetch('/jobs/stats');
      const { stats, monthlyApplications } = res.data;
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: { stats, monthlyApplications },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <JobContext.Provider
      value={{
        ...state,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  return useContext(JobContext);
};
