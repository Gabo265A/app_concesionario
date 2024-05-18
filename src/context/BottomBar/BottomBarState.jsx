import {useReducer} from 'react';
import BottomBarContext from './BottomBarContext';
import BottomBarReducer from './BottomBarReducer';

const BottomBarState = props => {
  const initialState = {
    isDrawerOpen: false,
  };

  const [state, dispatch] = useReducer(BottomBarReducer, initialState);

  const setIsDrawerOpen = isDrawerOpen => {
    dispatch({type: 'SET_IS_DRAWER_OPEN', payload: isDrawerOpen});
  };

  return (
    <BottomBarContext.Provider
      value={{
        isDrawerOpen: state.isDrawerOpen,
        setIsDrawerOpen,
      }}>
      {props.children}
    </BottomBarContext.Provider>
  );
};

export default BottomBarState;
