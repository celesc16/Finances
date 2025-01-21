import { useState } from "react"
import Header from "./customer/components/Header/Header"
import Sidebar from "./customer/components/Sidebar/Sidebar";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Main from './customer/pages/Main'
import Report from "./customer/pages/report";
function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen ] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className={ `${darkMode && 'dark'} font-quickSand` }>
      <Header 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode}
        toggleSidebar={toggleSidebar}
      /> 
      <Sidebar isSidebarOpen={isSidebarOpen}
      />

      <div className=" min-h-screen bg-white dark:bg-gray-800  text-black dark:text-white">  
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/report' element={<Report />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
