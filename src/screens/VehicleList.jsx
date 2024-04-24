import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Vehicle from '../components/Vehicle'
import { useVehicleContext, useGetCatalogList } from '../context/vehicles/vehicleContext'

const VehicleList = () => {

    const getCatalog = useGetCatalogList()

    useEffect(() => {
        getCatalog()
    }, [])

    const catalog = useVehicleContext()

    return (
        <ScrollView>
            {catalog.map((vehicle) => (
                <Vehicle
                    key={vehicle.id}
                    imageUrl={vehicle.image}
                    description={vehicle.description}
                    price={Intl.NumberFormat('es-CO').format(vehicle.price)}
                    name={vehicle.name}
                    iconCar={vehicle.icon}
                />
            ))}
        </ScrollView>
    )
}

export default VehicleList