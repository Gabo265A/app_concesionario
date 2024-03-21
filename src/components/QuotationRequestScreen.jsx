import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const QuotationRequestScreen = () => {
  const [name, setName] = useState('Nombre:')
  const [email, setEmail] = useState('Correo:')
  const [phone, setPhone] = useState('Teléfono:')

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput placeholder={name} style={styles.input} onChangeText={setName}></TextInput>

      <Text style={styles.label}>Correo:</Text>
      <TextInput placeholder={email} style={styles.input} onChangeText={setEmail}></TextInput>

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput placeholder={phone} keyboardType='numeric' style={styles.input} onChangeText={setPhone}></TextInput>

      <Button title='Solicitar' />
    </View>
  )
}

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
    marginBottom: 23,
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 12,
  },
})


export default QuotationRequestScreen
