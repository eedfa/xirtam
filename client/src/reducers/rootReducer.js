const rootReducer = (state, action) => {
  if (action.type === 'Set_profile') {
    return { ...state, profileEmail: action.profileEmail, profileUsername: action.profileUsername }
  }
  if (action.type === 'Set_token') {
    return { ...state, token: action.token }
  }
  if (action.type === 'Set_token_google') {
    return { ...state, tokenGoogle: action.tokenGoogle }
  }
  if (action.type === 'Set_Borad_id') {
    return { ...state, boardId: action.boardId }
  }
  if (action.type === 'Search_Result') {
    return { ...state, searchResult: action.token }
  }
  return state
}

export default rootReducer
