import {useState} from 'react'

export default function useLogged() {
  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  console.log(isLoggedIn);

  return [
    checking,
    isLoggedIn,
  ]
}
