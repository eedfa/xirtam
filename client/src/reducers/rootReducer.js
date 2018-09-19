const rootReducer = (state, action) => {
  if (action.type === 'Set_token') {

    return {...state ,token: action.token }
  }
  if (action.type === 'Set_Borad_id') {

    return { ...state ,boardId: action.boardId }
  }
  return state
}

export default rootReducer
