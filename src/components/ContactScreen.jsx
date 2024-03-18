import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de Contacto</Text>
      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.text}>Calle 78B # 72A-220, Medellín, Colombia</Text>
      <Text style={styles.label}>Teléfono:</Text>
      <Text style={styles.text}>(604) 4443700</Text>
      <Text style={styles.label}>Correo Electrónico:</Text>
      <Text style={styles.text}>concesionario@gmail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ContactScreen;