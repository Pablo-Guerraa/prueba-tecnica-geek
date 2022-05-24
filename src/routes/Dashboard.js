import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'

export default function Dashboard() {

  const login = useSelector((state)=>state.users.routeAuth)

  if(login.checking) {
    return <h3>Cargando</h3>
  }

  return (
    <Routes>
      <Route path="/*" element={<Home/>}/>
    </Routes>
  )
}
