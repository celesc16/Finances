import { useEffect, useState } from "react";
import Header from "./customer/components/Header/Header";
import Sidebar from "./customer/components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from './customer/view/Main';
import Report from "./customer/view/report";
import LoginForm from "./customer/auth/SignIn/LoginForm";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className={`${darkMode && 'dark'} font-quickSand`}>
      {/* Mostrar Header y Sidebar solo si está autenticado */}
      {isAuthenticated && (
        <>
          <Header 
            toggleDarkMode={toggleDarkMode} 
            darkMode={darkMode}
            toggleSidebar={toggleSidebar}
          /> 
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </>
      )}

      <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">  
        <Routes>
          {/* Si no está autenticado, muestra el Login, de lo contrario redirige a Main */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginForm setAuthenticated={setIsAuthenticated} />} 
          />
          
          {/* Ruta principal, visible solo si el usuario está autenticado */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Main /> : <Navigate to="/login" />} 
          />
          
          {/* Ruta de reportes, visible solo si el usuario está autenticado */}
          <Route 
            path="/report" 
            element={isAuthenticated ? <Report /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
