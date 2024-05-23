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
    case 'SIGNIN':
      return {
        ...state,
        userData: payload.userData,
        token: payload.token,
        didTryAutoLogin: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        userData: null,
        token: null,
        didTryAutoLogin: false,
      };
    case 'SET_DID_TRY_AUTO_LOGIN':
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case 'SET_LOADING_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_LOADING_FINISH':
      return {
        ...state,
        isLoading: false,
      };
    case 'CHANGE_OFFERS_STATUS':
      return {
        ...state,
        userData: {
          ...state.userData,
          offersEnable: payload.offersEnable,
        },
      };
    default:
      return state;
  }
};
