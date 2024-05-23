import ServiceHistoryContext from './ServiceHistoryContext';
import ServiceHistoryReducer from './ServiceHistoryReducer';
import {useReducer} from 'react';
import firebase from '../../firebase/firebase';

const ServiceHistoryState = props => {
  const initialState = {
    serviceHistory: null,
    sendingHistory: false,
    loadingHistory: false,
  };

  const sendNewService = async service => {
    try {
      dispatch({type: 'SENDING_HISTORY', payload: {sendingHistory: true}});
      await firebase.db.collection('serviceHistory').add(service);
      dispatch({type: 'SENDING_HISTORY', payload: {sendingHistory: false}});
    } catch (error) {
      dispatch({type: 'SENDING_HISTORY', payload: {sendingHistory: false}});
    }
  };

  const getHistory = async uid => {
    console.log('getHistory');
    try {
      dispatch({type: 'LOADING_HISTORY', payload: {loadingHistory: true}});
      firebase.db.collection('serviceHistory').onSnapshot(querySnapshot);

      function querySnapshot(snapshot) {
        let history = snapshot.docs
          .filter(doc => doc.data().userUID === uid)
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
        console.log(history.length);
        if (history.length === 0) {
          console.log('No hay historial de servicios');
          history = null;
        }
        dispatch({type: 'GET_HISTORY', payload: {serviceHistory: history}});
        dispatch({type: 'LOADING_HISTORY', payload: {loadingHistory: false}});
      }
    } catch (error) {
      dispatch({type: 'LOADING_HISTORY', payload: {loadingHistory: false}});
    }
  };

  const [state, dispatch] = useReducer(ServiceHistoryReducer, initialState);

  return (
    <ServiceHistoryContext.Provider
      value={{
        serviceHistory: state.serviceHistory,
        sendNewService,
        sendingHistory: state.sendingHistory,
        loadingHistory: state.loadingHistory,
        getHistory,
      }}>
      {props.children}
    </ServiceHistoryContext.Provider>
  );
};

export default ServiceHistoryState;
