import { Menu, BadgeDollarSign, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ darkMode, toggleDarkMode , toggleSidebar }) {
  return (
    <nav
      className="fixed top-0 z-50 w-full h-16 bg-white 
    border-b border-gray-200 dark:bg-gray-900 
    dark:border-gray-800"
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Menú lateral */}
          <div className="flex items-center justify-start rtl:justify-end">
            {/* Botón del menú */}
            <button
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
            dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6" /> {/* Cambiado a dimensiones explícitas */}
            </button>

            {/* Título y logo */}
            <NavLink to="/" className="flex ms-2 md:me-24">
              <BadgeDollarSign className="h-8 me-3 text-xl text-green-700" />
              <span
                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap
              dark:text-white"
              >
                Finances
              </span>
            </NavLink>
          </div>

          {/* Botón para alternar modo oscuro */}
          <button
            className="dark:bg-slate-50 dark:text-slate-700 rounded-full p-2"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.isRequired,

}

export default Header;
