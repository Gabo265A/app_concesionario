import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const OffersPromotionsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ofertas y Promociones</Text>
      <Text style={styles.subtitle}>Recibir Notificaciones:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleNotifications}
        value={notificationsEnabled}
      />
      <Text style={styles.notificationStatus}>
        {notificationsEnabled ? 'Activadas' : 'Desactivadas'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
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