const initialState = {
  todos: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default : 
      return state
    case 'addTodo':
      return {
        ...state, todos : [...state.todos, action.payload]
      }
    case 'deleteTodo' : 
      return {
        ...state, todos : state.todos.filter(todo => todo.id !== action.payload)
    }
  }
}

export default reducer