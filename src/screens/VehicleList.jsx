import {useContext, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Vehicle from '../components/Vehicle';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import VehicleContext from '../context/vehicles/VehicleContext';

const VehicleList = () => {
  const {catalog, isLoading, getCatalog} = useContext(VehicleContext);

  useEffect(() => {
    getCatalog();
  }, []);

  return (
    <ScrollView contentContainerStyle={isLoading && styles.centered}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={MD2Colors.deepPurple500}
          size={100}
        />
      ) : (
        catalog.map(vehicle => (
          <Vehicle
            key={vehicle.id}
            imageUrl={vehicle.image}
            description={vehicle.description}
            price={Intl.NumberFormat('es-CO').format(vehicle.price)}
            name={vehicle.name + ', ' + vehicle.year}
            iconCar={vehicle.icon}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default VehicleList;
