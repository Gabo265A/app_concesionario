import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TestDriveRequestScreen = () => {
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha de Cita:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Fecha de Cita"
      />
      
      <Text style={styles.label}>Nombre y Apellidos:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nombre y Apellidos"
      />
      
      <Text style={styles.label}>Número de Identificación:</Text>
      <TextInput
        style={styles.input}
        value={identificationNumber}
        onChangeText={setIdentificationNumber}
        placeholder="Número de Identificación"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Número de Celular:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Número de Celular"
        keyboardType="phone-pad"
      />

      <Button title="Enviar Solicitud"/>
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

export default TestDriveRequestScreen;
