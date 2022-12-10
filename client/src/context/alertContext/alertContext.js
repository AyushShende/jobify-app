import { useReducer, createContext, useContext } from 'react';
import { CLEAR_ALERT, DISPLAY_ALERT, TOGGLE_SIDEBAR } from './actions';
import reducer from './reducer';

const INITIAL_STATE = {
  showAlert: false,
  alertText: '',
  alertType: '',
  showSidebar: false,
};

const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const displayAlert = (alertType, alertText) => {
    dispatch({ type: DISPLAY_ALERT, payload: { alertType, alertText } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  return (
    <AlertContext.Provider
      value={{ ...state, displayAlert, clearAlert, toggleSidebar }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export { INITIAL_STATE };
