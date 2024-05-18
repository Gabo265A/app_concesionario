import {useReducer} from 'react';
import ActiveContext from './ActiveContext';
import ActiveReducer from './ActiveReducer';

const BottomBarState = props => {
  const initialState = {
    activeScreen: 'home', // Manejar el estado de la pantalla activa
  };

  const [state, dispatch] = useReducer(ActiveReducer, initialState);

  const setActiveScreen = activeScreen => {
    dispatch({type: 'SET_ACTIVE_SCREEN', payload: activeScreen});
  };

  return (
    <ActiveContext.Provider
      value={{
        activeScreen: state.activeScreen,
        setActiveScreen,
      }}>
      {props.children}
    </ActiveContext.Provider>
  );
};

export default BottomBarState;
