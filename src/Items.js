import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import './styles.scss'

const Items = () => {
  const users = useSelector(state =>state.users)
  const currentUser = useSelector(state =>state.currentUser)
  const todos = users[currentUser]
  const [selected, setSelected] = React.useState('all')
  console.log(todos)
  return (
    <>
      <select onChange={e => setSelected(e.target.value)}>
        <option value={'all'}>mind</option>
        <option value={'active'}>aktív</option>
        <option value={'done'}>kész</option>
      </select>
      <div className="todoContainer">
      {selected == 'all' ?
      todos.map((e, i) => <Card key = {i} todo = {e} user = {currentUser}/>)
      : selected == 'active' ?
      todos.filter(e => e.done == false).map((e,i) => <Card key = {i} todo = {e}/>) 
      :
      todos.filter(e => e.done != false).map((e,i) => <Card key = {i} todo = {e}/>) 
      }
      </div>
    </>
  )
}
export default Items