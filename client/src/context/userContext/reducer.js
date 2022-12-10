import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
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
        token: action.payload.token,
        userLocation: action.payload.userLocation,
      };

    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case LOGOUT_USER:
      return {
        ...INITIAL_STATE,
        user: null,
        token: null,
        userLocation: '',
      };

    default:
      return state;
  }
};

export default Reducer;
