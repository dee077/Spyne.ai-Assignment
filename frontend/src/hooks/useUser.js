import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/slices/authSlice";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Function to set user data in Redux store
  const setUser = (userData) => {
    dispatch(login(userData));
  };

  // Function to clear user data from Redux store
  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, setUser, logoutUser };
};

export default useUser;
