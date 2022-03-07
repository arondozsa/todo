import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import './styles.scss'

const Items = () => {
  const users = useSelector(state =>state.users)
  const currentUser = useSelector(state =>state.currentUser)
  const todos = users[currentUser]
  const [selected, setSelected] = React.useState('all')
  const [filteredTodos, setFilteredTodos] = React.useState(todos)
  function handleChange(e){
    setSelected(e)
    if (e === 'all') setFilteredTodos(todos)
    if (e === 'active') setFilteredTodos(todos?.filter(e => !e.done))
    if (e === 'done') setFilteredTodos(todos?.filter(e => e.done))
  }

  React.useEffect(() => {
    handleChange(selected)
  },[users])

  return (
    <>
      <select onChange={e => {
        handleChange(e.target.value)
      }}>
        <option value={'all'}>mind</option>
        <option value={'active'}>aktív</option>
        <option value={'done'}>kész</option>
      </select>
      <div className="todoContainer">
      {filteredTodos?.map((e, i) => <Card key = {i} todo = {e} user = {currentUser}/>)}
      </div>
    </>
  )
}
export default Items