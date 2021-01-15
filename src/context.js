import React, { useState, useContext } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const chooseDifficulty = diff => {
    setGameDifficulty(diff);
  };
  const showAlert = (show, msg, type) => {
    setAlert({ show, msg, type });
  };
  const removeAlert = () => {
    setAlert({});
  };
  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        gameDifficulty,
        chooseDifficulty,
        alert,
        showAlert,
        removeAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
