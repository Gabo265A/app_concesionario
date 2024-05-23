export default (state, action) => {
  const {payload} = action;
  switch (action.type) {
    case 'SENDING_HISTORY':
      return {
        ...state,
        sendingHistory: payload.sendingHistory,
      };
    case 'GET_HISTORY':
      return {
        ...state,
        serviceHistory: payload.serviceHistory,
      };
    default:
      return state;
  }
};
