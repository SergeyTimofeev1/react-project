import React, { useContext } from 'react';
import { Route, Routes, } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router/routes';
import Login from '../pages/Login';
import Error from '../pages/Error';
import Posts from '../pages/Posts';
import { AuthContext } from './context/context';

const AppRouter = () => {

  const { isAuth, setIsAuth } = useContext(AuthContext)
  return (

    isAuth
      ?
      <Routes>
        {
          privateRoutes.map(route =>
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
              exact={route.exact}
            />
          )
        }
        <Route path='/' element={<Posts />} />
        <Route path='/*' element={<Error />} />
      </Routes >
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            element={route.component}
            exact={route.exact}
          />
        )}
        <Route path='/*' element={<Login />} />
      </Routes>
  );
}

export default AppRouter;
