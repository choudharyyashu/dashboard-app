import { Link, useNavigate } from "react-router-dom";
import { useContext, useCallback } from "react";
import { AppContext } from "../context/AppContext";

function Navbar() {

  const { darkMode, setDarkMode, isLoggedIn, logout } = useContext(AppContext);

  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const handleThemeToggle = useCallback(() => {
    setDarkMode((currentMode) => !currentMode);
  }, [setDarkMode]);

  return (

    <nav
      className={`flex flex-wrap justify-between items-center gap-4 px-8 py-4 shadow-md transition-colors duration-300
      ${
        darkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-white text-slate-900"
      }`}
    >

      {  }

      <div>
        <h1 className="text-2xl font-bold">
          Enterprise Dashboard
        </h1>

        <p className="text-sm text-gray-400">
          Admin Panel
        </p>
      </div>

      { }

      {isLoggedIn && (
        <ul className="flex flex-wrap gap-6 font-medium">
          <li>
            <Link to="/dashboard" className="hover:text-blue-500 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-blue-500 transition">
              Users
            </Link>
          </li>
        </ul>
      )}


      <div className="flex items-center gap-4">


        <button
          onClick={handleThemeToggle}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          {darkMode ? "Light" : "Dark"}
        </button>


        {
          !isLoggedIn ? (

            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Login
            </Link>

          ) : (

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>

          )
        }

      </div>
    </nav>

    
  );
}

export default Navbar;