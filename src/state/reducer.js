import * as actionTypes from './actionTypes'
const initialState = {
  currentUser : '' , 
  users: { }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default : 
      return state
    case actionTypes.addTodo:
      return {
        ...state, 
          users : {
            ...state.users, 
              [action.payload.user] : [
                ...state.users[action.payload.user], 
                action.payload
              ]
          }
      }
    case actionTypes.deleteTodo : 
      return {
        ...state, 
          users : {
            ...state.users, 
              [action.payload.user] : [
                ...state.users[action.payload.user]
                  .filter(todo => todo.id !== action.payload.id)
              ]
          }
      }
    case actionTypes.finishTodo :
      return {
        ...state, 
          users : {
            ...state.users,
              [action.payload.user]: 
                [
                  ...state.users[action.payload.user].map(todo => {
                    if (todo.id !== action.payload.id) {
                      return todo 
                    }
                    return {
                      ...todo,
                      done : true
                    }
                  }),    
                ]
         }
      }
    case actionTypes.modifyTodo : 
      return {
        ...state, 
          users : {
            ...state.users,
              [action.payload.user]: 
                [
                  ...state.users[action.payload.user].map(todo => {
                    if (todo.id !== action.payload.id) {
                      return todo 
                    }
                    return {
                      ...todo,
                      isBeingEdited : !todo.isBeingEdited,
                      label : action.payload.newLabel
                    }
                  }),    
                ]
          }
      }
    case actionTypes.login : 
      if (Object.keys(state.users).find(e => e == action.payload)) {
        return {
          ...state, 
            currentUser : action.payload, 
              users : {
                ...state.users
              }
        }
      }
      return {
        ...state,
        currentUser : action.payload, 
          users : {
            ...state.users,
              [action.payload] : []}
      }
    case actionTypes.logout : 
      return {
        ...state,  
          currentUser : action.payload
      }  
  }
}

export default reducer