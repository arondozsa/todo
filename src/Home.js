import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
import './styles.scss'

const Home = () => {
  const users = useSelector(state =>state.users)
  const currentUser = useSelector(state =>state.currentUser)
  const [userName, setUserName] = React.useState('')
  const [user, setUser] = React.useState('')
  const [todo, setTodo] = React.useState('')
  const dispatch = useDispatch()

  

  React.useEffect(() => {
    if (currentUser) setUser(currentUser)
  },[])

  function login() {
    if (!userName) return alert('Nem adtál meg felhasználónevet')
    if (userName) {
      setUser(userName)
      dispatch({
        type: 'login',
        payload : userName
      })
    }
  }
  function logout() {
    dispatch({
      type : 'logout',
      payload : ''
    })
    setUser('')
    setUserName('')
  }
  function addTodo() {
    if (!todo) return
    let todoId = Math.floor(Math.random()*100);
    while (Object.values(users).some(e => e.id === todoId)) {
      todoId = Math.floor(Math.random()*1000)
    }
    dispatch({
      type : 'addTodo',
      payload : {
        user: user,
        label : todo,
        id : todoId,
        done : false,
        transitionState : 'entering'
      }
    })
    setTodo('')
  }

  return (
    <>
      <header>
        <h1>Todo app</h1>
      </header>
      {!user?
        <div className='login'>
          <input type={'text'} onChange={e => setUserName(e.target.value)} value={userName}/>
          <button onClick={login}>Tovább</button>
        </div>
      : 
        <div className='pageContainer'>
          <div className='headerContainer'>
            <button className='logout' onClick ={logout}>kilép</button>
            <h2>Szia {user}!</h2>
            <input type={'text'} onChange={e => setTodo(e.target.value)} value={todo} />
            <button className ='addTodo' onClick={addTodo}>Hozzáad</button>
          </div>
          <div className='todoContainer'>
          
            {users[user]?.map((todo, i)  => (
              <Card user = {user} todo = {todo} key ={i}/>))}
              
          </div>
          
        </div>
      }
    </>
  )
}
export default Home