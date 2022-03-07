import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ItemList from './ItemList'
import Login from './Login'
import './styles.scss'

const Home = () => {
  const currentUser = useSelector(state =>state.currentUser)
  return (
    <>
      <header>
        <h1>Todo app</h1>
        <Link to= '/items'>Items</Link>
      </header>
      {!currentUser?
        <Login />
      : 
        <ItemList />
      }
    </>
  )
}
export default Home