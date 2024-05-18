export default (state, action) => {
  switch (action.type) {
    case 'SET_IS_DRAWER_OPEN':
      return {
        ...state,
        isDrawerOpen: action.payload,
      };
    default:
      return state;
  }
};
