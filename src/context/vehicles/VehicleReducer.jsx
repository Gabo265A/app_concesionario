export default (state, action) => {
  const {payload} = action;
  switch (action.type) {
    case 'GET_VEHICLES':
      return {
        ...state,
        catalog: payload.catalog,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    case 'FILTER_VEHICLE':
      return {
        ...state,
        filterVehicle: payload.filterVehicle,
        vehicleNotFound: payload.vehicleNotFound,
      };
    case 'SET_VEHICLE_NOT_FOUND':
      return {
        ...state,
        vehicleNotFound: payload.vehicleNotFound,
      };
    case 'SET_FILTER_VEHICLE':
      return {
        ...state,
        filterVehicle: payload.filterVehicle,
      };
    default:
      return state;
  }
};
