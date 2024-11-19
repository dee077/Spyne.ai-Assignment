import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import useUser from "../hooks/useUser";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();
  const handleLogout = () => {
    logoutUser();
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex items-center mx-5 justify-between shadow-xl text-default">
      <Link
        to="/"
        className="flex mx-10 items-center transition-transform transform hover:scale-105 cursor-pointer transform-origin-center 
      will-change-transform"
      >
        <img className="w-10 m-4 rounded-md" src={Logo} alt="Logo" />
        <h1 className="hidden sm:flex text-2xl font-semibold">
          Spyne.ai Assignment
        </h1>
      </Link>
      {user ? (
        <div className="mx-10">
          <Link
            to={`/user-cars/${user._id}`}
            className="px-4 py-1 mx-8 font-medium text-xl hover:text-black underline-animation whitespace-nowrap"
          >
            My Cars
          </Link>
          <button
            onClick={handleLogout}
            className="mx-5 shadow-lg bg-black text-white font-medium px-4 py-2 rounded-md transition 
     duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap will-change-transform
     active:scale-95"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mx-10">
          <button
            onClick={() => navigate('/login')}
            className="mx-5 shadow-lg bg-black text-white font-medium px-4 py-2 rounded-md transition 
        duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap will-change-transform
        active:scale-95"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
