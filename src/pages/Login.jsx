import React, { useContext } from 'react';
import { AuthContext } from '../components/context/context';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';

const Login = () => {

  const { isAuth, setIsAuth } = useContext(AuthContext)

  const login = event => {
    event.preventDefault()
    setIsAuth(true)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder='login' />
        <MyInput type="password" placeholder='password' />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
}

export default Login;
