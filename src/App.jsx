import { useState } from "react";
import Header from "./customer/components/Header";
import Sidebar from "./customer/components/Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from './customer/pages/Main';
import Report from "./customer/pages/report";
import Login from "./customer/pages/Login";
import Register from "./customer/pages/Register";
import { useAuth } from "./customer/context/authContext"; // Solo usa useAuth
import Transactions from "./customer/pages/Transactions";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth(); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${darkMode && 'dark'} font-quickSand `}>
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

      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">  
        <Routes>
          {/* Si no está autenticado, muestra el Login, de lo contrario redirige a Main */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
          />

          {/* Si se registra, redirige al login */}
          <Route  
            path='/register' 
            element={isAuthenticated ? <Navigate to='/login' /> : <Register />}
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

          <Route  
            path="/transaction"
            element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} 
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;