import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const WorkshopServiceScreen = () => {
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSchedule = () => {
    // Aquí puedes manejar la lógica para agendar la cita, como enviar los datos a un servidor, etc.
    console.log('Fecha de Cita:', date);
    console.log('Tipo de Servicio:', serviceType);
    console.log('Nombre completo:', fullName);
    console.log('Número de Celular:', phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha de Cita:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Fecha de Cita"
      />
      
      <Text style={styles.label}>Tipo de Servicio:</Text>
      <TextInput
        style={styles.input}
        value={serviceType}
        onChangeText={setServiceType}
        placeholder="Tipo de Servicio (Mantenimiento, Reparación, Revisión Técnica)"
      />
      
      <Text style={styles.label}>Nombre y Apellidos:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nombre y Apellidos"
      />
      
      <Text style={styles.label}>Número de Celular:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Número de Celular"
        keyboardType="phone-pad"
      />

      <Button title="Agendar Cita" />
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

export default WorkshopServiceScreen;