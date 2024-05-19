import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  DatePickerInput,
  registerTranslation,
  es,
} from 'react-native-paper-dates';
registerTranslation('es', es);
import {TextInput, List, Button} from 'react-native-paper';

const WorkshopServiceScreen = () => {
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('Servicios');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleRegistrationPlate, setVehicleRegistrationPlate] = useState('');

  const [expanded, setExpanded] = useState(false); //Estado para ocultar el listado de servicios
  const handlePress = () => setExpanded(!expanded); //Función para ocultar el listado de servicios

  const serviceTypeList = [
    {id: 1, name: 'Mantenimiento'},
    {id: 2, name: 'Reparación'},
    {id: 3, name: 'Revisión técnica'},
    {id: 4, name: 'Otro...'},
  ]; //Listado de servicios para la lista desplegable

  return (
    <ScrollView>
      <View style={styles.container}>
        <DatePickerInput
          locale="es"
          label="Seleccione la fecha de la cita"
          value={date}
          onChange={d => setDate(d)}
          inputMode="start"
          validRange={{
            startDate: new Date(),
            endDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() + 14,
            ),
          }}
        />

        <List.Section style={{marginBottom: 23, marginTop: 23}}>
          <List.Accordion
            title={serviceType}
            left={props => <List.Icon {...props} icon="format-list-bulleted" />}
            expanded={expanded}
            onPress={handlePress}>
            {serviceTypeList.map(item => (
              <List.Item
                key={item.id}
                title={item.name}
                onPress={() => {
                  setServiceType(item.name);
                  setExpanded(false);
                }}
              />
            ))}
          </List.Accordion>
        </List.Section>

        <TextInput
          style={styles.input}
          label="Nombres y apellidos"
          value={fullName}
          onChangeText={setFullName}
          right={<TextInput.Icon icon="account" />}
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
          value={vehicleRegistrationPlate}
          onChangeText={setVehicleRegistrationPlate}
          label="Placa del vehículo"
          right={<TextInput.Icon icon="car" />}
        />

        <Button icon="send" mode="contained">
          Solicitar servicio
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 23,
  },
});

export default WorkshopServiceScreen;
