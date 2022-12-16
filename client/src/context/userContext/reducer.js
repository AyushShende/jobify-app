import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from './actions';
import { INITIAL_STATE } from './userContext';

const Reducer = (state, action) => {
  switch (action.type) {
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
      };

    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case LOGOUT_USER:
      return {
        ...INITIAL_STATE,
        userLoading: false,
      };
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
      };

    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case GET_CURRENT_USER_BEGIN:
      return {
        ...state,
        userLoading: true,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
      };

    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default Reducer;
