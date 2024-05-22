import {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Banner, Searchbar, Text} from 'react-native-paper';
import {useSearchVehicle} from '../context/vehicles/VehicleContext';
import DialogAlert from '../components/DialogAlert';
import Helper from '../components/HelperText';
import Vehicle from '../components/Vehicle';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import VehicleContext from '../context/vehicles/VehicleContext';

const VehicleSearchScreen = () => {
  const {
    filterVehicle,
    isLoading,
    searchVehicle,
    setVehicleNotFound,
    vehicleNotFound,
    setFilterVehicle,
  } = useContext(VehicleContext);

  //Estados para el campo de búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  //Estados para mostrar el helper
  const [showHelper, setShowHelper] = useState(false);
  const [customHelper, setCustomHelper] = useState([]);
  const [customHelperMessage, setCustomHelperMessage] = useState('');

  //Estado para mostrar el dialog alert
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Banner visible={true} icon="car-info" style={{margin: 10}}>
            {'Puedes buscar vehículos por marca, modelo, año o precio.'}
          </Banner>
          <View style={{margin: 20, marginTop: 10}}>
            <Searchbar
              placeholder="Escribe aquí..."
              onFocus={() => {
                if (searchQuery.length <= 0) {
                  setShowHelper(true);
                  setCustomHelper([
                    'error',
                    '¡No deje el campo de búsqueda vacío!',
                  ]);
                } else if (searchQuery.length <= 2) {
                  setShowHelper(true);
                  setCustomHelper(['info', '¡Escriba al menos 3 caracteres!']);
                }
              }}
              onBlur={() => {
                setShowHelper(false);
              }}
              onClearIconPress={() => {
                setShowHelper(false);
                setSearchQuery('');
                if (vehicleNotFound) {
                  setVehicleNotFound();
                } else {
                  setFilterVehicle();
                }
              }}
              onChangeText={query => {
                setSearchQuery(query);
                if (query.length <= 0) {
                  setShowHelper(true);
                  setCustomHelper([
                    'error',
                    '¡No deje el campo de búsqueda vacío!',
                  ]);
                } else if (query.length <= 2) {
                  setShowHelper(true);
                  setCustomHelper(['info', '¡Escriba al menos 3 caracteres!']);
                } else {
                  setShowHelper(false);
                }
              }}
              value={searchQuery}
              onSubmitEditing={() => {
                if (searchQuery.length <= 0) {
                  setVisible(true);
                  setCustomHelperMessage(
                    '¡No deje el campo de búsqueda vacío!',
                  );
                } else if (/^\s*$/.test(searchQuery)) {
                  setVisible(true);
                  setCustomHelperMessage('¡No escriba solo espacios!');
                  setSearchQuery('');
                } else if (searchQuery.length <= 2) {
                  setVisible(true);
                  setCustomHelperMessage('¡Escriba al menos 3 caracteres!');
                } else if (
                  /^\s/.test(searchQuery) ||
                  /\s$/.test(searchQuery) ||
                  /\s{2,}/.test(searchQuery)
                ) {
                  setSearchQuery(searchQuery.trim().replace(/\s{2,}/g, ' '));
                  searchVehicle(
                    (keyword = searchQuery.trim().replace(/\s{2,}/g, ' ')),
                  );
                } else {
                  searchVehicle((keyword = searchQuery));
                }
              }}
            />
            {showHelper && (
              <Helper
                type={customHelper[0]}
                isVisible={showHelper}
                text={customHelper[1]}
              />
            )}
          </View>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color={MD2Colors.deepPurple500}
              size={100}
              style={{paddingTop: 100}}
            />
          ) : filterVehicle && filterVehicle.length >= 1 ? (
            filterVehicle.map(vehicle => (
              <Vehicle
                key={vehicle.id}
                imageUrl={vehicle.image}
                description={vehicle.description}
                price={Intl.NumberFormat('es-CO').format(vehicle.price)}
                name={vehicle.name + ', ' + vehicle.year}
                iconCar={vehicle.icon}
              />
            ))
          ) : vehicleNotFound ? (
            <View
              style={{
                padding: 20,
                paddingTop: 0,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text variant="headlineSmall" style={{textAlign: 'center'}}>
                ¡No se encontraron resultados para su búsqueda!
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
      {visible && (
        <DialogAlert
          alertMessage={customHelperMessage}
          changeVisibility={setVisible}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default VehicleSearchScreen;
