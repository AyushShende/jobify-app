import { createContext, useContext, useEffect, useReducer } from 'react';
import { useAlertContext } from '../alertContext/alertContext';
import {
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from './actions';
import reducer from './reducer';
import authFetch from '../../utils/axios';

const UserContext = createContext();

export const INITIAL_STATE = {
  userLoading: true,
  isLoading: false,
  user: null,
  userLocation: '',
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { displayAlert } = useAlertContext();

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const setupUser = async ({ currentUser, alertText, endPoint }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const res = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user } = res.data;
      displayAlert('success', alertText);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location: user?.location },
      });
    } catch (error) {
      displayAlert('danger', error.response.data.message);
      dispatch({
        type: SETUP_USER_ERROR,
      });
    }
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async ({ currentUser, alertText }) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const res = await authFetch.patch(`/auth/updateUser`, currentUser);
      const { user } = res.data;
      displayAlert('success', alertText);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location: user?.location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        displayAlert('danger', error.response.data.message);
        dispatch({
          type: UPDATE_USER_ERROR,
        });
      }
    }
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const res = await authFetch.get('/auth/getCurrentUser');
      const { user } = res.data;
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location: user?.location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ ...state, setupUser, logoutUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
