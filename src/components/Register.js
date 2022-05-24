import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Componentes y demás
import { registerAsync } from '../redux/actions/usersAction'
// Estilos e iconos 
import { Button, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ErrorIcon from '@mui/icons-material/Error';
import '../styles/register.css';

function Register() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [ previousImg, setPreviousImg ] = useState("https://res.cloudinary.com/dxhgejzwc/image/upload/v1652161956/sprint-3-proyecto/asesor2_m7zf4e.png")

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string().max(20, 'El nombre no puede tener mas de 20 caracteres').required('Campo obligatorio'),
      email: Yup.string().email('email invalido').required('Campo Obligatorio'),  
      password: Yup.string().required('Campo Obligatorio').oneOf([Yup.ref('repeatPassword')]),
      repeatPassword: Yup.string().oneOf([Yup.ref('password')])
    }),
    onSubmit: values => {
      dispatch(registerAsync(values))
      // console.log(values);
    }
  })
  // const previousUpLoad = (e)=>{
  //   const readImg = new FileReader();
  //   readImg.onload = () => {
  //     if(readImg.readyState === 2){
  //       setPreviousImg(readImg.result)
  //     }
  //   }
  //   const load = readImg.readAsDataURL(e.target.files[0])
  //   setPreviousImg(load)
  // }
  return (
    <div className='container-register'>
      <div className='button-back' onClick={() => navigate(-1)}>
        <ArrowBackIosNewIcon/>
      </div>
      <form action="" onSubmit={formik.handleSubmit} className='form'>
        <h2>Registro</h2>
        <TextField 
        type='text' 
        label="Nombre completo" 
        variant="filled" 
        name='displayName'
        value={formik.values.displayName}
        onChange={formik.handleChange}
        error={ !!formik.errors.displayName }
        InputProps={{
          endAdornment: (
            <InputAdornment position='start' style={formik.errors.displayName && {color: 'red'}}>
              <ErrorIcon />
            </InputAdornment>
          ),
        }}
        />
        <TextField 
        type='text' 
        label="Email" 
        variant="filled" 
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={ !!formik.errors.email }
        InputProps={{
          endAdornment: (
            <InputAdornment position='start' style={formik.errors.email && {color: 'red'}}>
              <ErrorIcon />
            </InputAdornment>
          ),
        }}
        />
        <TextField 
        type='password' 
        label="Contraseña" 
        variant="filled" 
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={ !!formik.errors.password }
        InputProps={{
          endAdornment: (
            <InputAdornment position='start' style={formik.errors.password && {color: 'red'}}>
              <ErrorIcon />
            </InputAdornment>
          ),
        }}
        />
        <TextField 
        type='password' 
        label="Repite la contraseña" 
        variant="filled" 
        name='repeatPassword'
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={ !!formik.errors.repeatPassword }
        InputProps={{
          endAdornment: (
            <InputAdornment position='start' style={formik.errors.repeatPassword && {color: 'red'}}>
              <ErrorIcon />
            </InputAdornment>
          ),
        }}
        />
        {/* <div className='file-user'>
          <label htmlFor="img-user"><img src={previousImg} alt="imagen-usuario"/></label>
          <input 
          type="file" 
          id='img-user' 
          name='photo' 
          accept="image/png,image/jpeg" 
          onChange={(e)=>previousUpLoad(e)}
          />
        </div> */}
        <Button type='submit' variant="contained" endIcon={<SendIcon />}>
          Enviar
        </Button>
      </form>

    </div>
  )
}

export default Register