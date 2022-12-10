import { createContext, useContext, useReducer } from 'react';
import { useAlertContext } from '../alertContext/alertContext';
import {
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
} from './actions';
import reducer from './reducer';
import axios from 'axios';

const UserContext = createContext();

export const INITIAL_STATE = {
  isLoading: false,
  user: null,
  token: null,
  userLocation: '',
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { displayAlert } = useAlertContext();

  const setupUser = async ({ currentUser, alertText, endPoint }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const res = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = res.data.data;
      displayAlert('success', alertText);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, userLocation: location },
      });
    } catch (error) {
      displayAlert('danger', error.response.data.message);
      dispatch({
        type: SETUP_USER_ERROR,
      });
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <UserContext.Provider value={{ ...state, setupUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
