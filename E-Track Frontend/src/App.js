import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import SignIn from './SignIn.js';
import Login from './Login.js';
// import Buttoni from 'react-bootstrap/Button';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
// import {Expense} from './pages/Expense.jsx';
import { Stacked, Pyramid, Line, Bar, Pie, Dashboard, Financial} from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
    const value = localStorage.getItem('email');
  return (
    // <BrowserRouter>
    <>
    {!value ? (<BrowserRouter><Routes><Route path="/" element={(<Login />)}/>
    <Route path="/signin" element={(<SignIn />)} /></Routes></BrowserRouter>):(
      <BrowserRouter>
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            {/* <Buttoni className="logoutbutton" onClick={logout}>Logout</Buttoni> */}
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}
              <Routes>
                {/* dashboard  */}
                {/* <Route path="/signin" element={(<SignIn />)} /> */}
                <Route path="/dashboard" element={(<Dashboard />)} />
                <Route path="/line" element={<Line />} />
                {/* <Route path="/area" element={<Area />} /> */}
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                {/* <Route path="/financial" element={<Financial />} /> */}
                {/* <Route path="/color-mapping" element={<ColorMapping />} /> */}
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/expense" element={<Stacked />} />
              </Routes> 
            </div>
            <Footer />
          </div>
        </div>
    </div>
    </BrowserRouter>
    )}
 {/* // } */}
   
    </>
  );
};

export default App;