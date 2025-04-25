import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const {loading, user } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/login" />;
  if (!user.is_admin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;