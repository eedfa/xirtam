const initState = {
  token: ''
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'Set_token') {
    return { ...state, token: action.token }
  }
  return state
}

export default rootReducer
