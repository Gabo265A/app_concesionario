import React, {useContext, useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import UserContext from '../context/users/UserContext';

const OffersPromotionsScreen = () => {
  const {userData, ChangeOffersStatus} = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const toggleNotifications = () => {
    setVisible(true);

    const timer = setTimeout(() => {
      ChangeOffersStatus(userData.uid, !userData.offersEnable);
      setVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  return (
    <>
      <View style={styles.container}>
        {userData ? (
          <>
            <Text style={styles.title}>Ofertas y Promociones</Text>
            <Text style={styles.subtitle}>Recibir Notificaciones:</Text>
            <Switch
              trackColor={userData.offersEnable ? '#81b0ff' : '#767577'}
              thumbColor={userData.offersEnable ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={userData.offersEnable}
            />
            <Text style={styles.notificationStatus}>
              {userData.offersEnable ? 'Activadas' : 'Desactivadas'}
            </Text>
          </>
        ) : (
          <Text style={{...styles.title, textAlign: 'center'}}>
            Inicia sesión para activar las notificaciones de ofertas y
            promociones
          </Text>
        )}
      </View>
      {visible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            pointerEvents: 'auto',
          }}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.deepPurple500}
            size={100}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  notificationStatus: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default OffersPromotionsScreen;
