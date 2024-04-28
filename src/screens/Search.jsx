import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Banner, Searchbar, Text } from 'react-native-paper'
import { useSearchVehicle } from '../context/vehicles/vehicleContext'
import DialogAlert from '../components/DialogAlert'
import Helper from '../components/HelperText'
import Vehicle from '../components/Vehicle'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const VehicleSearchScreen = () => {

  //Estados para la búsqueda de vehículos
  const searchVehicle = useSearchVehicle()
  const [isLoadingData, setIsLoadingData] = useState(false)

  //Estados para la barra de búsqueda
  const [carInformation, setCarInformation] = useState(null)
  const [searchQuery, setSearchQuery] = React.useState('')

  //Estados para mostrar el helper
  const [showHelper, setShowHelper] = useState(false)
  const [customHelper, setCustomHelper] = useState([])
  const [customHelperMessage, setCustomHelperMessage] = useState('')

  //Estado para mostrar el activity indicator
  const [visible, setVisible] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Banner
            visible={true}
            icon="car-info"
            style={{ margin: 10 }}>
            {'Puedes buscar vehículos por marca, modelo, año o precio.'}
          </Banner>
          <View style={{ margin: 20, marginTop: 10 }}>
            <Searchbar
              placeholder="Escribe aquí..."
              onFocus={() => {
                if (searchQuery.length <= 0) {
                  setShowHelper(true)
                  setCustomHelper(["error", "¡No deje el campo de búsqueda vacío!"])
                } else if (searchQuery.length <= 2) {
                  setShowHelper(true)
                  setCustomHelper(["info", "¡Escriba al menos 3 caracteres!"])
                }
              }}
              onBlur={() => {
                setShowHelper(false)
              }}
              onClearIconPress={() => {
                setShowHelper(false)
                setCarInformation(null)
              }}
              onChangeText={(query) => {
                setSearchQuery(query)
                if (query.length <= 0) {
                  setShowHelper(true)
                  setCustomHelper(["error", "¡No deje el campo de búsqueda vacío!"])
                } else if (query.length <= 2) {
                  setShowHelper(true)
                  setCustomHelper(["info", "¡Escriba al menos 3 caracteres!"])
                } else {
                  setShowHelper(false)
                }
              }}
              value={searchQuery}
              onSubmitEditing={() => {
                if (searchQuery.length <= 0) {
                  setVisible(true)
                  setCustomHelperMessage("¡No deje el campo de búsqueda vacío!")
                } else if (/^\s*$/.test(searchQuery)) {
                  setVisible(true)
                  setCustomHelperMessage("¡No escriba solo espacios!")
                  setSearchQuery('')
                } else if (searchQuery.length <= 2) {
                  setVisible(true)
                  setCustomHelperMessage("¡Escriba al menos 3 caracteres!")
                } else if (/^\s/.test(searchQuery) || /\s$/.test(searchQuery) || /\s{2,}/.test(searchQuery)) {
                  setSearchQuery(searchQuery.trim().replace(/\s{2,}/g, ' '))
                  searchVehicle(keyword = searchQuery.trim().replace(/\s{2,}/g, ' '), setVehicles = setCarInformation, showActivity = setIsLoadingData)
                } else {
                  searchVehicle(keyword = searchQuery, setVehicles = setCarInformation, showActivity = setIsLoadingData)
                }
              }}
            />
            {showHelper && <Helper type={customHelper[0]} exFunction={showHelper} text={customHelper[1]} />}
          </View>
          {isLoadingData ? <ActivityIndicator animating={true} color={MD2Colors.deepPurple500} size={100} style={{ paddingTop: 100 }} /> : (carInformation && carInformation.length >= 1) ? carInformation.map((vehicle) => (
            <Vehicle
              key={vehicle.id}
              imageUrl={vehicle.image}
              description={vehicle.description}
              price={Intl.NumberFormat('es-CO').format(vehicle.price)}
              name={vehicle.name + ", " + vehicle.year}
              iconCar={vehicle.icon}
            />
          )) : carInformation ? <View style={{ padding: 20, paddingTop: 0, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text variant="headlineSmall" style={{ textAlign: "center" }}>¡No se encontraron resultados para su búsqueda!</Text>
          </View> : null}

        </ScrollView >
      </View>
      {visible && <DialogAlert alertMessage={customHelperMessage} changeVisibility={setVisible} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});

export default VehicleSearchScreen;
