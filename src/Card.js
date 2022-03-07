import React from "react"
import { useDispatch } from 'react-redux'
import * as actionTypes from './state/actionTypes'
import './styles.scss'


const Card = props => {

  const dispatch = useDispatch()
  const { user, todo } = props
  const [newLabel, setNewLabel] = React.useState(todo.label)
  const [transitionState, setTransitionState] = React.useState(props.transitionState)

  function deleteTodo (id) {
    setTransitionState('exiting')
    setTimeout(() => {dispatch({
      type : actionTypes.deleteTodo,
      payload : {
        id : id, 
        user: user
      } 
    })
    setTransitionState('')
    }, 200)
  }

  function finishTodo(id) {
    dispatch({
      type : actionTypes.finishTodo,
      payload : {
        id : id, 
        user: user
      } 
    })
  }
  function modifyTodo(id) {
    
    dispatch({
      type : actionTypes.modifyTodo,
      payload : {
        id: id,
        newLabel : newLabel || todo.label,
        user: user,
      }
    })
    setNewLabel(todo.label)
  }
  return (
    <div key ={todo.id} className = {`todoCard ${transitionState}`}>
      {!todo.isBeingEdited? 
        <h3>{todo.label}</h3>
        :<>
          <input 
            type={'text'}  
            value = {newLabel} 
            onChange = {e => setNewLabel(e.target.value)}></input>
        </>}
      {todo.done? <p>kész</p> : <p>nincs kész</p>}
        <div className='buttonContainer'>
          <button onClick = {() => deleteTodo(todo.id)}>Töröl</button>
          <button onClick={() => finishTodo(todo.id)}>Teljesít</button>
      {!todo.isBeingEdited ? <button onClick ={() => modifyTodo(todo.id)}>Szerkeszt</button> :  <button onClick = {() => modifyTodo(todo.id)}>Mentés</button>} 
        </div>
    </div>
  )
}
export default Card