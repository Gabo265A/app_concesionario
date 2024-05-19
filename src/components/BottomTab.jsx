import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import BottomBarContext from '../context/BottomBar/BottomBarContext';
import UserContext from '../context/users/UserContext';
import ActiveContext from '../context/ActiveContext/ActiveContext';

const BottomTab = () => {
  const navigation = useNavigation();
  const {didTryAutoLogin, isLoading} = useContext(UserContext);
  const {setActiveScreen, activeScreen} = useContext(ActiveContext);

  const {isDrawerOpen, setIsDrawerOpen} = useContext(BottomBarContext);
  return (
    <>
      {!isDrawerOpen && (
        <View
          style={styles.container}
          pointerEvents={isLoading ? 'none' : 'auto'}>
          <IconButton
            icon="menu"
            size={30}
            iconColor="#524f4f"
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
              setIsDrawerOpen(!isDrawerOpen);
            }}
          />
          <IconButton
            icon="home"
            size={30}
            iconColor={activeScreen === 'home' ? '#663399' : '#524f4f'}
            onPress={() => {
              navigation.navigate('home');
              setActiveScreen('home');
            }}
          />
          <IconButton
            icon="account"
            size={30}
            iconColor={activeScreen === 'userProfile' ? '#663399' : '#524f4f'}
            onPress={() => {
              {
                didTryAutoLogin
                  ? console.log('Crear screen del profile')
                  : navigation.navigate('Welcome');
                setActiveScreen('userProfile');
              }
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default BottomTab;
