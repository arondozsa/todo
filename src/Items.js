import React from "react";
import { useSelector } from "react-redux";
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
      {selected == 'all' ?
      todos.map((e, i) => <div key = {i}>
        <h3>{e.label}</h3>
        {e.done? <p>kész</p> : <p>nop</p>}
      </div>)
      : selected == 'active' ?
      todos.filter(e => e.done == false).map((e,i) => <div key = {i}>
        <h3>{e.label}</h3>
        <p>nop</p>
      </div>) 
      :
      todos.filter(e => e.done != false).map((e,i) => <div key = {i}>
        <h3>{e.label}</h3>
        <p>kész</p>
      </div>) 
      }

    </>
  )
}
export default Items