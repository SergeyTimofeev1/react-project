import React, { useState,useEffect } from "react";
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./components/context/context";
import Navbar from "./components/UI/navbar/Navbar";

import './styles/app.css';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

