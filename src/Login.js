import React from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from './state/actionTypes'

const Login = () => {
  const [userName, setUserName] = React.useState('')
  const dispatch = useDispatch()

  function login() {
    if (!userName) return alert('Nem adtál meg felhasználónevet')
    if (userName) {
      dispatch({
        type:  actionTypes.login,
        payload : userName
      })
    }
  }

  return (
  <div className='login'>
    <h2>Kérlek lépj be!</h2>
    <input type={'text'} onChange={e => setUserName(e.target.value)} value={userName}/>
    <button onClick={login}>Tovább</button>
  </div>)
}
export default Login