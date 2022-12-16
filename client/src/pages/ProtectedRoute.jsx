import { Navigate } from 'react-router-dom';
import { Loading } from '../components';
import { useUserContext } from '../context/userContext/userContext';

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useUserContext();

  if (userLoading) return <Loading />;

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};
export default ProtectedRoute;
