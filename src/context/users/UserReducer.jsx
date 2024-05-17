export default (state, action) => {
  const {payload} = action;
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        userData: payload.userData,
        token: payload.token,
        didTryAutoLogin: true,
      };
    case 'SET_DID_TRY_AUTO_LOGIN':
      return {
        ...state,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
