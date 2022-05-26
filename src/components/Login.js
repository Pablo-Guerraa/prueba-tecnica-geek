import { Button, TextField } from '@mui/material'
import { getAuth, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { facebookAuthProvider, googleAuthProvider } from '../firebase/firebaseConfig';
import { login, loginAsync } from '../redux/actions/usersAction';

export default function Login() {

  const dispatch = useDispatch();
  const [objUser, setObjUser] = useState({nameUser: '', password: ''});

  const authGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
    .then(({user}) => {
      const objUser = {
        userAuth: {
          uid: user.id,
          displayName: user.displayName,
          email: user.email,
          photo: null
        },
        routeAuth: {
          isLoggedIn: true,
          checking: false
        }
      };
      dispatch(login(objUser));
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const authFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookAuthProvider)
    .then(({user}) => {
      const objUser = {
        userAuth: {
          uid: user.id,
          displayName: user.displayName,
          email: user.email,
          photo: null
        },
        routeAuth: {
          isLoggedIn: true,
          checking: false
        }
      };
      dispatch(login(objUser))
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
    <div>
      <form action="" className='card-login form-login' onSubmit={(e)=>{
          e.preventDefault()
          dispatch(loginAsync(objUser))
          }}>
          <div>
            <label htmlFor="" className='label-login'>Usuario: </label>
            <TextField 
            className='input-login'
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" 
            name='user'
            onChange={(e)=> setObjUser({...objUser, nameUser: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="" className='label-login'>Contraseña: </label>
            <TextField
            className='input-login'
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name='password'
            onChange={(e)=> setObjUser({...objUser, password: e.target.value})}
            />
          </div>
          <Button 
          type='submit'  
          variant="contained"
          >
            Entrar
          </Button>
        </form>
        <button onClick={()=>authGoogle()}>Entrar con Google</button>
        <button onClick={()=>authFacebook()}>Entrar con Facebook</button>
        <br />
        <NavLink to='/register' >Register</NavLink>

    </div>
  )
}
