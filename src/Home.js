import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const [text, setText] = React.useState('')
  const [user, setUser] = React.useState('')
  const [todo, setTodo] = React.useState('')
  const [todoList, setTodoList] = React.useState([])
  const dispatch = useDispatch()
  const todos = useSelector(state =>state.todos)

  function login() {
    if (!text) return alert('Nem adtál meg felhasználónevet')
    if (text) setUser(text)
  }
  function addTodo() {
    dispatch({
      type : 'addTodo',
      payload : {
        label : todo,
        id : todoList.length
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
              <h3>{todo.label}</h3>
              <p>{todo.id}</p>
              <button onClick = {() => deleteTodo(todo.id)}>törlés</button>
            </div>))}
          
        </>
      }
    </>
  )
}
export default Home