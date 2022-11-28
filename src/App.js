import React from "react";
import { BrowserRouter, Route, Routes, Switch, Redirect } from 'react-router-dom'
import Navbar from "./components/UI/navbar/Navbar";
import About from "./pages/About";
import Error from "./pages/Error";
import Posts from "./pages/Posts";

import './styles/app.css';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/posts' element={<Posts/>}></Route>
          <Route path='/*' element={<Error/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

