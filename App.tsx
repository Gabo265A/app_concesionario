import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigation} from './src/navigation/DrawerNavigation';
import UserState from './src/context/users/UserState';
import BottomTab from './src/components/BottomTab';
import BottomBarState from './src/context/BottomBar/BottomBarState';
import ActiveState from './src/context/ActiveContext/ActiveState';

const App = () => {
  return (
    <UserState>
      <NavigationContainer>
        <ActiveState>
          <BottomBarState>
            <DrawerNavigation />
            <BottomTab />
          </BottomBarState>
        </ActiveState>
      </NavigationContainer>
    </UserState>
  );
};

export default App;
