import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const userr = useSelector(state => state.users.user)
  const todos = useSelector(state =>state.users.todos)
  const [text, setText] = React.useState('')
  const [user, setUser] = React.useState('')
  const [todo, setTodo] = React.useState('')
  const [todoList, setTodoList] = React.useState(todos)
  const [newLabel, setNewLabel] = React.useState('')
  const [editTodo, setEditTodo] = React.useState(false)
  const dispatch = useDispatch()
  

  React.useEffect(() => {
    if (userr) setUser(userr)
  },[])

  function login() {
    if (!text) return alert('Nem adtál meg felhasználónevet')
    if (text) {
      setUser(text)
      dispatch({
        type: 'addUser',
        payload : text
      })
    }
  }
  function addTodo() {
    let todoId = Math.floor(Math.random()*100);
    while (todos.some(e => e.id === todoId)) {
      todoId = Math.floor(Math.random()*1000)
    }
    dispatch({
      type : 'addTodo',
      payload : {
        label : todo,
        id : todoId,
        done : false
      }
    })
    setTodoList(prevTodoList => [...prevTodoList, todo])
    setTodo('')

  }
  function deleteTodo (id) {
    dispatch({
      type : 'deleteTodo',
      payload : id 
    })
    setTodoList(todos)
  }
  function finishTodo (id) {
    dispatch({
      type : 'finishTodo',
      payload : id 
    })
  }
  function modifyTodo (id) {
    dispatch({
      type : 'modifyTodo',
      payload : {
        id: id,
        newLabel : newLabel
      }
    })
    setEditTodo(false)
  }

  return (
    <>
      <h1>Todo app</h1>
      {!user?
        <>
          <input type={'text'} onChange={e => setText(e.target.value)} value={text}/>
          <button onClick={login}>Tovább</button>
        </>
      : 
        <>
          <h2>Szia {user}</h2>
          <input type={'text'} onChange={e => setTodo(e.target.value)} value={todo} />
          <button onClick={addTodo}>Hozzáad</button>
          {todos.map((todo, i)  => (
            <div key ={i}>
              {!editTodo? 
              <h3>{todo.label}</h3>
              :<>
              <input 
                type={'text'}  
                value = {newLabel} 
                onChange = {e => setNewLabel(e.target.value)}></input>
              <button onClick = {() => modifyTodo(todo.id)}>ment</button>
              </>}
              <p>{todo.id}</p>
              {todo.done? <p>kész</p> : <p>nope</p>}
              <button onClick = {() => deleteTodo(todo.id)}>törlés</button>
              <button onClick={() => finishTodo(todo.id)}>kész</button>
              <button onClick ={() => {
                setEditTodo(true)
                setNewLabel(todo.label)
              }}>mod</button>
            </div>))}
          
        </>
      }
    </>
  )
}
export default Home