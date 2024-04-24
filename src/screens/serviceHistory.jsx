import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ServiceHistoryScreen = () => {
  const [customerID, setCustomerID] = useState('');
  const [serviceHistory, setServiceHistory] = useState([]);

  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID del Cliente:</Text>
      <TextInput
        style={styles.input}
        value={customerID}
        onChangeText={setCustomerID}
        placeholder="ID del Cliente"
        keyboardType="numeric"
      />
      
      <Button title="Buscar Historial de Servicio"  />

      <Text style={styles.historyTitle}>Historial de Servicio:</Text>
      {serviceHistory.map(item => (
        <View key={item.id} style={styles.historyItem}>
          <Text>Servicio: {item.serviceType}</Text>
          <Text>Fecha: {item.date}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 23,
    paddingHorizontal: 12,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 22,
  },
  historyItem: {
    borderWidth: 1,
    borderColor: 'lightred',
    padding: 13,
    marginTop: 13,
  },
});

export default ServiceHistoryScreen;
