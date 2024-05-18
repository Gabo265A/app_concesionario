import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import BottomBarContext from '../context/BottomBar/BottomBarContext';
import UserContext from '../context/users/UserContext';

const BottomTab = () => {
  const navigation = useNavigation();
  const {didTryAutoLogin} = useContext(UserContext);
  const {isDrawerOpen, setIsDrawerOpen} = useContext(BottomBarContext);
  return (
    <>
      {!isDrawerOpen && (
        <View style={styles.container}>
          <IconButton
            icon="menu"
            size={30}
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
              setIsDrawerOpen(!isDrawerOpen);
            }}
          />
          <IconButton
            icon="account"
            size={30}
            onPress={() => {
              {
                didTryAutoLogin
                  ? console.log('Crear screen del profile')
                  : navigation.navigate('Welcome');
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
