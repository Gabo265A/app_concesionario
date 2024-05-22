import {useReducer, useEffect} from 'react';
import VehicleContext from './VehicleContext';
import VehicleReducer from './VehicleReducer';
import firebase from '../../firebase/firebase';

const VehicleState = props => {
  const initialState = {
    catalog: [],
    filterVehicle: null,
    vehicleNotFound: false,
    isLoading: false,
  };

  const searchVehicle = async keyword => {
    dispatch({type: 'SET_LOADING', payload: {isLoading: true}});
    const keywordArray = keyword.split(' ');
    await firebase.db
      .collection('catalog')
      .get()
      .then(snapshot => {
        let catalog = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        let exactMatches = [];
        let partialMatches = [];
        let isExactMatchFound = false;
        for (const vehicle of catalog) {
          if (vehicle.name.toLowerCase() === keyword.toLowerCase()) {
            exactMatches.push(vehicle);
            isExactMatchFound = true;
            break;
          } else {
            for (let i = 0; i < keywordArray.length; i++) {
              if (vehicle.brand == keywordArray[i].toLowerCase()) {
                partialMatches.push(vehicle);
                break;
              } else if (vehicle.model == keywordArray[i].toLowerCase()) {
                partialMatches.push(vehicle);
                break;
              } else if (vehicle.year == keywordArray[i].toLowerCase()) {
                partialMatches.push(vehicle);
                break;
              } else if (vehicle.price == keywordArray[i].toLowerCase()) {
                partialMatches.push(vehicle);
                break;
              }
            }
          }
        }
        if (partialMatches.length === 0 && exactMatches.length === 0) {
          dispatch({
            type: 'FILTER_VEHICLE',
            payload: {filterVehicle: null, vehicleNotFound: true},
          });
        } else if (isExactMatchFound) {
          dispatch({
            type: 'FILTER_VEHICLE',
            payload: {filterVehicle: exactMatches, vehicleNotFound: false},
          });
        } else {
          dispatch({
            type: 'FILTER_VEHICLE',
            payload: {filterVehicle: partialMatches, vehicleNotFound: false},
          });
        }
      });

    dispatch({type: 'SET_LOADING', payload: {isLoading: false}});
  };

  const getCatalog = async () => {
    dispatch({type: 'SET_LOADING', payload: {isLoading: true}});

    await firebase.db
      .collection('catalog')
      .get()
      .then(snapshot => {
        let catalog = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        dispatch({type: 'GET_VEHICLES', payload: {catalog: catalog}});
      });

    dispatch({type: 'SET_LOADING', payload: {isLoading: false}});
  };

  const setVehicleNotFound = () => {
    dispatch({
      type: 'SET_VEHICLE_NOT_FOUND',
      payload: {vehicleNotFound: false},
    });
  };

  const setFilterVehicle = () => {
    dispatch({
      type: 'SET_FILTER_VEHICLE',
      payload: {filterVehicle: null},
    });
  };

  const [state, dispatch] = useReducer(VehicleReducer, initialState);

  return (
    <VehicleContext.Provider
      value={{
        catalog: state.catalog,
        filterVehicle: state.filterVehicle,
        vehicleNotFound: state.vehicleNotFound,
        isLoading: state.isLoading,
        getCatalog,
        searchVehicle,
        setVehicleNotFound,
        setFilterVehicle,
      }}>
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleState;
