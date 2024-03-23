import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, List, Button, Banner } from 'react-native-paper';

const VehicleSearchScreen = () => {

  //Constantes para guardar los valores de los campos de búsqueda
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [listYear, setListYear] = useState('Año');

  const [expanded, setExpanded] = useState(false); //Estado para ocultar el listado de años
  const handlePress = () => setExpanded(!expanded); //Función para ocultar el listado de años

  const [visible, setVisible] = useState(true); //Estado para mostrar el banner

  //Listado de años para la lista desplegable
  const years = [
    { id: 1, name: '2024' },
    { id: 2, name: '2023' },
    { id: 3, name: '2022' },
    { id: 4, name: '2021' },
    { id: 5, name: '2020' },
    { id: 6, name: '2019' },
    { id: 7, name: '2018' },
    { id: 8, name: '2017' },
    { id: 9, name: '2016' },
    { id: 10, name: '2015' },
    { id: 11, name: '2014' },
    { id: 12, name: '2013' },
    { id: 13, name: '2012' },
    { id: 14, name: '2011' },
    { id: 15, name: '2010' },
    { id: 16, name: '2009' },
    { id: 17, name: '2008' },
    { id: 18, name: '2007' },
    { id: 19, name: '2006' },
    { id: 20, name: '2005' },
    { id: 21, name: '2004' },
    { id: 22, name: '2003' },
    { id: 23, name: '2002' },
    { id: 24, name: '2001' },
    { id: 25, name: '2000' },
    { id: 26, name: '1999' },
    { id: 27, name: '1998' },
    { id: 28, name: 'Otro...' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
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
          {'Puedes buscar un vehículo por marca, modelo, año o precio. \nPara búsquedas más precisas, puedes completar uno o varios campos.'}
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

        <List.Section style={{ marginBottom: 23 }}>
          <List.Accordion
            title={listYear}
            left={props => <List.Icon {...props} icon="calendar" />}
            expanded={expanded}
            onPress={handlePress}>
            {years.map((item) => <List.Item key={item.id} title={item.name} onPress={() => { setListYear(item.name); setExpanded(false); }} />)}
          </List.Accordion>
        </List.Section>

        <TextInput
          style={styles.input}
          onChangeText={(value) => setPrice(value)}
          label="Precio"
          keyboardType="numeric"
          right={<TextInput.Icon icon="currency-usd" />}
        />

        <Button icon="magnify" mode="contained">Buscar vehículo</Button>
      </ScrollView>
    </View>
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

function checkIsNumeric(text) {
  let onlyNumbers = true;
  let numbers = '0123456789';

  for (var i = 0; i < text.length; i++) {
    if (numbers.indexOf(text[i]) === -1) {
      onlyNumbers = false;
      return onlyNumbers;
    }
    return onlyNumbers;
  }
}

export default VehicleSearchScreen;
