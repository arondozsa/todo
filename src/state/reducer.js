const initialState = {
  currentUser : '' , 
  users: { }
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
      currentTodo.isBeingEdited = false
      return {
        ...state, users : {...state.users, [action.payload.user] : [...state.users[action.payload.user]]}
      }
    case 'editingTodo': 
      currentTodo = state.users[action.payload.user].find(todo => todo.id === action.payload.id)
      currentTodo.isBeingEdited = action.payload.isBeingEdited
      return {
        ...state, users : {...state.users, [action.payload.user] : [...state.users[action.payload.user]]}
      }
    case 'login' : 
      if (Object.keys(state.users).find(e => e == action.payload)) {
        return {
          ...state, currentUser : action.payload, users : {...state.users, }
        }
      }
      return {
        ...state, currentUser : action.payload, users : {...state.users, [action.payload] : []}
      }
    case 'logout' : 
      return {
        ...state,  currentUser : action.payload
      }  
  }
}

export default reducer