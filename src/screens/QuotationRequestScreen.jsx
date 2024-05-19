import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const QuotationRequestScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TextInput
          right={
            <TextInput.Icon icon="account" onPress={() => setVisible(true)} />
          }
          label="Nombre y apellido"
          onChangeText={setFullName}
          value={fullName}
        />

        <TextInput
          style={{marginTop: 23}}
          right={
            <TextInput.Icon icon="email" onPress={() => setVisible(true)} />
          }
          label="Correo"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />

        <TextInput
          style={{marginTop: 23, marginBottom: 23}}
          right={
            <TextInput.Icon icon="cellphone" onPress={() => setVisible(true)} />
          }
          label="Número de celular"
          onChangeText={setPhone}
          value={phone}
          keyboardType="numeric"
        />

        <Button icon="send" mode="contained">
          Solicitar cotización
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
});

export default QuotationRequestScreen;
