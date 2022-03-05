import React from "react"
import { useDispatch } from 'react-redux'
import './styles.scss'


const Card = props => {
  const [newLabel, setNewLabel] = React.useState('')
  const dispatch = useDispatch()
  const { user, todo } = props
  const [transitionState, setTransitionState] = React.useState('')

  function deleteTodo (id) {
    dispatch({
      type : 'exiting',
      payload : {
        id : id, 
        user: user
      } 
    })
    setTimeout(() => {dispatch({
      type : 'deleteTodo',
      payload : {
        id : id, 
        user: user
      } 
    })
    }, 500)
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
  return (
    <div key ={todo.id} className = {`todoCard ${todo.transitionState}`}>
      {!todo.isBeingEdited? 
        <h3>{todo.label}</h3>
        :<>
          <input 
            type={'text'}  
            value = {newLabel} 
            onChange = {e => setNewLabel(e.target.value)}></input>
          <button onClick = {() => modifyTodo(todo.id)}>Mentés</button>
        </>}
      {todo.done? <p>kész</p> : <p>nincs kész</p>}
        <div className='buttonContainer'>
          <button onClick = {() => deleteTodo(todo.id)}>Töröl</button>
          <button onClick={() => finishTodo(todo.id)}>Teljesít</button>
          <button onClick ={() => editTodo(todo)}>Szerkeszt</button>
        </div>
    </div>
  )
}
export default Card