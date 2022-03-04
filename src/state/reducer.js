const initialState = {
  users: {
   
  }

}

const reducer = (state = initialState, action) => {
  let currentTodo;
  switch (action.type) {
    default : 
      return state
    case 'addTodo':
      return {
        ...state, users : {...state.users, [action.payload.user] : [...state.users[action.payload.user], action.payload]}
      }
    case 'deleteTodo' : 
      return {
        ...state, users : {...state.users, [action.payload.user] : [...state.users[action.payload.user].filter(todo => {
          console.log(action.payload.id)
          return todo.id !== action.payload.id})]}
    }
    case 'finishTodo' :
      currentTodo = state.users[action.payload.user].find(todo => todo.id === action.payload.id)
      currentTodo.done = true
      return {
        ...state, users : {...state.users, [action.payload.user] : [...state.users[action.payload.user]]}
      }
    case 'modifyTodo' : 
      currentTodo = state.users[action.payload.user].find(todo => todo.id === action.payload.id)
      currentTodo.label = action.payload.newLabel
      return {
        ...state, users : {...state.users, [action.payload.user] : [...state.users[action.payload.user]]}
      }
    case 'addUser' : 
      return {
        ...state, users : {...state.users, [action.payload] : []}
      }
  }
}

export default reducer