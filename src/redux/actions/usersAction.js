import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig';
import {typeUsers} from '../types';

const login = (userAuth) => ({
  type: typeUsers.login,
  payload: userAuth
})
export const logoutAsync = ()=> (dispatch)=> {
  const auth = getAuth();
  signOut(auth).then(() => {
    dispatch(login(null))
  }).catch((error) => {
    alert('error al cerrar sesion, vuelve a intentarlo');
  });
}  
export const loginAsync = (dataUser)=> async(dispatch)=> {
  try {
    const auth = getAuth();
    console.log(app);
    const signIn = await signInWithEmailAndPassword(auth, dataUser.nameUser, dataUser.password);
    console.log(signIn);
    // Le paso el objeto al reducers ya listo 
  const destructuredUser = {
    userAuth: {
      uid : signIn.user.uid,
      name : signIn.user.displayName,
      email: signIn.user.email,
      photo: signIn.user.photo
    },
    routeAuth: {
      isLoggedIn: true,
      checking: false
    }
  }  
    dispatch(login(destructuredUser))
  } catch (error) {
    alert('Usuario no registrado')
  }
}

export const registerAsync = (dataUser) => async(dispatch) => {
  const auth = getAuth();
  console.log(app);
  const regUser = await createUserWithEmailAndPassword( auth, dataUser.email, dataUser.password)
  await updateProfile(auth.currentUser, {
    displayName: dataUser.displayName, photoURL: 'https://res.cloudinary.com/dxhgejzwc/image/upload/v1652161956/sprint-3-proyecto/asesor2_m7zf4e.png'
  })
  // nota: Tener en cuanta que la sentencia try/catch o .then/.catch no funciona con peticiones de firebase 
  // Le paso el objeto al reducers ya listo 
  const destructuredUser = {
    userAuth: {
      uid : regUser.user.uid,
      name : regUser.user.displayName,
      email: regUser.user.email,
      photo: regUser.user.photo
    },
    routeAuth: {
      isLoggedIn: true,
      checking: false
    }
  }  
  dispatch(login(destructuredUser))
}