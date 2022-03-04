const initialState = {
  users: {
   user : '',
   todos: []
  }

}

const reducer = (state = initialState, action) => {
  let currentTodo;
  switch (action.type) {
    default : 
      return state
    case 'addTodo':
      return {
        ...state, users : {...state.users, todos : [...state.users.todos, action.payload]}
      }
    case 'deleteTodo' : 
      return {
        ...state, users : {...state.users, todos : [...state.users.todos.filter(todo => todo.id !== action.payload)]}
    }
    case 'finishTodo' :
      currentTodo = state.users.todos.find(todo => todo.id === action.payload)
      currentTodo.done = true
      return {
        ...state, users : {...state.users, todos : [...state.users.todos]}
      }
    case 'modifyTodo' : 
      currentTodo = state.users.todos.find(todo => todo.id === action.payload.id)
      currentTodo.label = action.payload.newLabel
      return {
        ...state, users : {...state.users, todos : [...state.users.todos]}
      }
    case 'addUser' : 
      return {
        ...state, users : {...state.users, user : action.payload}
      }
  }
}

export default reducer