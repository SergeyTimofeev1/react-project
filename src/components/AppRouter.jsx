import React from 'react';
import { Route, Routes, } from 'react-router-dom'
import About from '../pages/About';
import Error from '../pages/Error';
import PostIdPages from '../pages/PostIdPages';
import Posts from '../pages/Posts';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/about' element={<About />}></Route>
      <Route path='/posts' element={<Posts />}></Route>
      <Route path='/posts/:id' element={<PostIdPages />}></Route>
      <Route path='/*' element={<Error />} />
    </Routes>
  );
}

export default AppRouter;
