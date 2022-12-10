import { useAlertContext } from '../context/alertContext/alertContext';

const Alert = () => {
  const { alertType, alertText } = useAlertContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
