import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../redux/actions/usersAction';

export default function Login() {

  const dispatch = useDispatch();
  const [objUser, setObjUser] = useState({nameUser: '', password: ''});


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
    </div>
  )
}
