import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List, MD3Colors} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

//Context
import UserContext from '../context/users/UserContext';
import ServiceHistoryContext from '../context/serviceHistory/ServiceHistoryContext';
import {ca} from 'react-native-paper-dates';

const ServiceHistoryScreen = () => {
  const [customerID, setCustomerID] = useState('');
  const {userData} = useContext(UserContext);
  const {serviceHistory, loadingHistory, getHistory} = useContext(
    ServiceHistoryContext,
  );
  useEffect(() => {
    if (userData) {
      try {
        getHistory(userData.uid);
      } catch (error) {
        console.log('Error al obtener el historial de servicios');
      }
    }
  }, [userData]);

  return (
    <>
      <View style={userData ? styles.container : styles.containerUserNotLogged}>
        {userData ? (
          <>
            <ScrollView>
              <Text style={{...styles.historyTitle, textAlign: 'center'}}>
                Tu historial de servicios
              </Text>

              {serviceHistory ? (
                <List.AccordionGroup>
                  <View style={{paddingTop: 20}}>
                    {serviceHistory.map((service, index) => (
                      <List.Accordion
                        key={index}
                        title={service.serviceType}
                        id={service.id}
                        left={props => <List.Icon {...props} icon="history" />}>
                        <List.Item title={'Fecha: ' + service.date} />
                        <List.Item
                          title={'Número de telefono: ' + service.phoneNumber}
                        />
                        <List.Item title={'Estado: ' + service.status} />
                        <List.Item
                          title={
                            'Placa del vehículo: ' +
                            service.vehicleRegistrationPlate
                          }
                        />
                      </List.Accordion>
                    ))}
                  </View>
                </List.AccordionGroup>
              ) : (
                <View style={{paddingTop: 20}}>
                  <Text
                    style={{
                      ...styles.title,
                      textAlign: 'center',
                      fontSize: 15,
                    }}>
                    No tienes servicios en tu historial
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        ) : (
          <Text style={{...styles.title, textAlign: 'center'}}>
            Inicia sesión para ver el historial de servicio
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
  },
  containerUserNotLogged: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 23,
    paddingHorizontal: 12,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 22,
  },
  historyItem: {
    borderWidth: 1,
    borderColor: 'lightred',
    padding: 13,
    marginTop: 13,
  },
});

export default ServiceHistoryScreen;
