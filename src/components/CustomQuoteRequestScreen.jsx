import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const QuotationRequestScreen = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Vehículo:</Text>
      <TextInput
        style={styles.input}
        value={vehicleType}
        onChangeText={setVehicleType}
        placeholder="Tipo de Vehículo (Nuevo o Usado)"
      />
      
      <Text style={styles.label}>Nombre y Apellidos:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nombre y Apellidos"
      />
      
      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
      />
      
      <Text style={styles.label}>Número de Celular:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Número de Celular"
        keyboardType="phone-pad"
      />

      <Button title="Solicitar Cotización" />
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
});

export default QuotationRequestScreen;
