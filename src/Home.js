import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const users = useSelector(state =>state.users)
  const currentUser = useSelector(state =>state.currentUser)
  const [userName, setUserName] = React.useState('')
  const [user, setUser] = React.useState('')
  const [todo, setTodo] = React.useState('')
  const [newLabel, setNewLabel] = React.useState('')
  const dispatch = useDispatch()
  

  React.useEffect(() => {
    if (currentUser) setUser(currentUser)
  },[])

  function login() {
    if (!userName) return alert('Nem adtál meg felhasználónevet')
    if (userName) {
      setUser(userName)
      dispatch({
        type: 'addUser',
        payload : userName
      })
    }
  }

  function addTodo() {
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
        done : false
      }
    })
    setTodo('')
  }

  function deleteTodo (id) {
    dispatch({
      type : 'deleteTodo',
      payload : {
        id : id, 
        user: user
      } 
    })
  }

  function finishTodo(id) {
    dispatch({
      type : 'finishTodo',
      payload : {
        id : id, 
        user: user
      } 
    })
  }

  function modifyTodo(id) {
    dispatch({
      type : 'modifyTodo',
      payload : {
        id: id,
        newLabel : newLabel,
        user: user,
        isBeingEdited : false
      }
    })
  }

  function editTodo(todo) {
    dispatch({
      type : 'editingTodo',
      payload : {
        id : todo.id,
        isBeingEdited : true,
        user: todo.user,
      }
    })
    setNewLabel(todo.label)
  }
  
  function logout() {
    dispatch({
      type : 'logout',
      payload : ''
    })
    setUser('')
    setUserName('')
  }
  
  return (
    <>
      <h1>Todo app</h1>
      <button onClick ={logout}>kilép</button>
      {!user?
        <>
          <input type={'text'} onChange={e => setUserName(e.target.value)} value={userName}/>
          <button onClick={login}>Tovább</button>
        </>
      : 
        <>
          <h2>Szia {user}!</h2>
          <input type={'text'} onChange={e => setTodo(e.target.value)} value={todo} />
          <button onClick={addTodo}>Hozzáad</button>
          {users[user]?.map((todo, i)  => (
            <div key ={i}>
              {!todo.isBeingEdited? 
                <h3>{todo.label}</h3>
                :<>
                <input 
                  type={'text'}  
                  value = {newLabel} 
                  onChange = {e => setNewLabel(e.target.value)}></input>
                <button onClick = {() => modifyTodo(todo.id)}>ment</button>
                </>}
              {todo.done? <p>kész</p> : <p>nincs kész</p>}
              <button onClick = {() => deleteTodo(todo.id)}>törlés</button>
              <button onClick={() => finishTodo(todo.id)}>kész</button>
              <button onClick ={() => editTodo(todo)}>mod</button>
            </div>))}
          
        </>
      }
    </>
  )
}
export default Home