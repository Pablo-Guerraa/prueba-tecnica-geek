import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from './Dashboard';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useSelector } from 'react-redux';

export default function AppRoutes() {

  // const [ isLoggedIn, checking] = useLogged()
  // const [ checking, setChecking ] = useState(false);
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const login = useSelector((state)=>state.users.routeAuth)

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if(user) {
  //       const uid = user.uid;
  //     } else {

  //     }
  //   })
  // })

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={
          <PublicRoutes isLoggedIn={login.isLoggedIn}>
            <Login />
          </PublicRoutes>
        }/>
        <Route path='/register' element={
          <PublicRoutes isLoggedIn={login.isLoggedIn}>
            <Register />
          </PublicRoutes>
        }/>
        <Route path='/*' element={
          <PrivateRoutes isLoggedIn={login.isLoggedIn}>
            <Dashboard />
          </PrivateRoutes>
        }/>

      </Routes>
    </BrowserRouter>
  )
}