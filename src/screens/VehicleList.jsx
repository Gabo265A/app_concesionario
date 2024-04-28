import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import Vehicle from '../components/Vehicle'
import { useVehicleContext, useIsLoadingData } from '../context/vehicles/vehicleContext'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const VehicleList = () => {

    const catalog = useVehicleContext()
    const isLoadingData = useIsLoadingData()

    return (
        <ScrollView contentContainerStyle={isLoadingData && styles.centered}>
            {isLoadingData ? (
                <ActivityIndicator animating={true} color={MD2Colors.deepPurple500} size={100} />
            ) : (
                catalog.map((vehicle) => (
                    <Vehicle
                        key={vehicle.id}
                        imageUrl={vehicle.image}
                        description={vehicle.description}
                        price={Intl.NumberFormat('es-CO').format(vehicle.price)}
                        name={vehicle.name}
                        iconCar={vehicle.icon}
                    />
                ))
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centered: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default VehicleList