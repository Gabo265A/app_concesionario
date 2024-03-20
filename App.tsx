import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './src/components/DrawerNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
}

export default App