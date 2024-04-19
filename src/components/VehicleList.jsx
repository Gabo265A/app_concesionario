import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import Vehicle from './Vehicle'
import firestore from '@react-native-firebase/firestore'

const VehicleList = () => {
    const [catalog, setCatalog] = React.useState([])

    async function getCatalog() {
        try {
            const catalogCollection = await firestore().collection('catalog').get()
            setCatalog(catalogCollection.docs.map((vehicle) => vehicle.data()))
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCatalog()
    }, [])

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