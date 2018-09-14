const initState = {
  token: 'adq'
}

const rootReducer = (state, action) => {
  if (action.type === 'Set_token') {
    console.log('Set_token')
    console.log(action.token)
    return { token: action.token }
  }
  return state
}

export default rootReducer
