import { useDispatch } from 'react-redux';
import { logoutSuccess } from './authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
