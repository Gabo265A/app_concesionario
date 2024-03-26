import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput, registerTranslation, es, TimePickerModal } from 'react-native-paper-dates';
registerTranslation('es', es);

const TestDriveRequestScreen = () => {
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateTime, setDateTime] = useState('Click en el icono...');
  const [visible, setVisible] = React.useState(false)

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      if (minutes < 10) minutes = '0' + minutes.toString();
      if (hours < 10) hours = '0' + hours.toString();
      setVisible(false);
      setDateTime('Hora: ' + hours + ':' + minutes);
    },
    [setVisible]
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <DatePickerInput
          locale="es"
          label="Seleccione la fecha de la cita"
          value={date}
          onChange={(d) => setDate(d)}
          inputMode="start"
          validRange={{ startDate: new Date(), endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14) }}
        />

        <TextInput
          style={{ marginBottom: 23, marginTop: 23 }}
          value={dateTime === 'Click en el icono...' ? '' : dateTime.substring(6)}
          right={<TextInput.Icon icon="clock" onPress={() => setVisible(true)} />}
          editable={false}
          label={dateTime != 'Click en el icono...' ? 'Hora' : dateTime}
        />
        <TimePickerModal
          label='Selecciona la hora de la cita'
          locale="es"
          visible={visible}
          hours={new Date().getHours().toString()}
          minutes={new Date().getMinutes().toString()}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
        />

        <TextInput
          style={ styles.input }
          value={fullName}
          onChangeText={setFullName}
          label="Nombre y apellidos"
          right={<TextInput.Icon icon="account" />}
        />

        <TextInput
          style={styles.input}
          value={identificationNumber}
          onChangeText={setIdentificationNumber}
          label="Número de Identificación"
          keyboardType="numeric"
          right={<TextInput.Icon icon="identifier" />}
        />

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          label="Número de celular"
          keyboardType="numeric"
          right={<TextInput.Icon icon="cellphone" />}
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          label="Correo electrónico (opcional)"
          right={<TextInput.Icon icon="email" />}
          keyboardType="email-address"
        />

        <Button icon="send" mode="contained">Enviar solicitud</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#EEEEEE',
  },
  input: {
    marginBottom: 23,
    paddingHorizontal: 12,
  },
});

export default TestDriveRequestScreen;
