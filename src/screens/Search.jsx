import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, Banner, HelperText } from 'react-native-paper';
import { useSearchVehicle } from '../context/vehicles/vehicleContext';
import DialogAlert from '../components/DialogAlert';

const VehicleSearchScreen = () => {

  const searchVehicle = useSearchVehicle()

  //Constantes para guardar los valores de los campos de búsqueda
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [carInformation, setCarInformation] = useState('')

  function changeSetCarInformation() {
    setCarInformation('')
  }

  const [visible, setVisible] = useState(true); //Estado para mostrar el banner

  const hasErrors = () => {
    if (/^\d*$/.test(year)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Banner
          visible={visible}
          actions={[
            {
              label: 'Entendido',
              onPress: () => setVisible(false),
            },
          ]}
          icon="car-info"
          style={{ marginBottom: 23 }}>
          {'Puedes buscar un vehículo por marca, modelo, año o precio. \nPara búsquedas más precisas, puedes completar varios campos.'}
        </Banner>

        <TextInput
          style={styles.input}
          label='Marca'
          onChangeText={(value) => setBrand(value)}
          right={<TextInput.Icon icon="car" />}
        />

        <TextInput
          style={styles.input}
          label='Modelo'
          onChangeText={(value) => setModel(value)}
          right={<TextInput.Icon icon="car-cog" />}
        />

        <TextInput
          style={{ paddingHorizontal: 12 }}
          onChangeText={(value) => setYear(value)}
          label="Año"
          keyboardType="numeric"
          right={<TextInput.Icon icon="calendar" />}
        />

        {hasErrors() && <HelperText type="error" visible={hasErrors()}>
          Email address is invalid!
        </HelperText>}

        <TextInput
          style={{ paddingHorizontal: 12, marginTop: 23 }}
          onChangeText={(value) => setPrice(value)}
          label="Precio"
          keyboardType="numeric"
          right={<TextInput.Icon icon="currency-usd" />}
        />

        <Button icon="magnify" style={{ marginTop: 23 }} mode="contained" onPress={() =>
          setCarInformation(searchVehicle(carName = model, carBrand = brand, carYear = year, carPrice = price))
        }>Buscar vehículo</Button>
        {carInformation === 'No deje campos vacíos' && <DialogAlert executeFunction={changeSetCarInformation} />}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EEEEEE',
  },
  input: {
    marginBottom: 23,
    paddingHorizontal: 12,
  },
});

export default VehicleSearchScreen;
