import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import * as actionTypes from './state/actionTypes'

const ItemList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const currentUser = useSelector(state => state.currentUser)
  const [todo, setTodo] = React.useState('')
  const [transitionState, setTransitionState] = React.useState('')
  
  function logout() {
    dispatch({
      type : actionTypes.logout,
      payload : ''
    })
  }
  function addTodo() {
    if (!todo) return
    if (users[currentUser].length == 199) return alert('Túl sok teendőt vettél fel, előbb törölj néhányat!')
    let todoId = Math.floor(Math.random()*100);
    while (users[currentUser].some(e => e.id === todoId)) {
      todoId = Math.floor(Math.random()*100 + 100)
    }
    setTransitionState('entering')
    dispatch({
      type : actionTypes.addTodo,
      payload : {
        user: currentUser,
        label : todo,
        id : todoId,
        done : false,
      }
    })
    setTodo('')
  }

  return (
    <div className='pageContainer'>
      <div className='headerContainer'>
        <button className='logout' onClick ={logout}>Kilép</button>
        <h2>Szia {currentUser}!</h2>
        <input type={'text'} onChange={e => setTodo(e.target.value)} value={todo} />
        <button className ='addTodo' onClick={addTodo}>Hozzáad</button>
      </div>
      <div className='todoContainer'>
        {users[currentUser]?.map((todo, i)  => (
          <Card user = {currentUser} transitionState = {transitionState} todo = {todo} key ={i}/>))}
      </div>
          
    </div>
  )
}
export default ItemList