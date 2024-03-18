import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const VehicleSearchScreen = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Marca:</Text>
      <TextInput
        style={styles.input}
        value={brand}
        onChangeText={setBrand}
        placeholder="Marca"
      />
      
      <Text style={styles.label}>Modelo:</Text>
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
        placeholder="Modelo"
      />
      
      <Text style={styles.label}>Año:</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
        placeholder="Año"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Precio"
        keyboardType="numeric"
      />

      <Button title="Buscar Vehículos" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default VehicleSearchScreen;
