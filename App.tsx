import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './src/navigation/DrawerNavigation';
import UserState from './src/context/users/UserState';

const App = () => {
  return (
    <UserState>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </UserState>
  )
}

export default App