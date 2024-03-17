import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const QuotationRequestScreen = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRequest = () => {
    // Aquí puedes manejar la lógica para enviar la solicitud de cotización, como enviar los datos a un servidor, etc.
    console.log('Tipo de Vehículo:', vehicleType);
    console.log('Nombre completo:', fullName);
    console.log('Correo electrónico:', email);
    console.log('Número de Celular:', phoneNumber);
  };

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

      <Button title="Solicitar Cotización" onPress={handleRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default QuotationRequestScreen;
