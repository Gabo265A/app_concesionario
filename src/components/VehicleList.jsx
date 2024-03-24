import React from 'react';
import { ScrollView } from 'react-native';
import Vehicle from './Vehicle';

const VehicleList = ({ vehicles }) => {
    return (
        <ScrollView>
            {vehicles.map((vehicle) => (
                <Vehicle
                    key={vehicle.id}
                    imageUrl={vehicle.imageUrl}
                    description={vehicle.description}
                    price={vehicle.price.valueOf()}
                    name={vehicle.name}
                    iconCar={vehicle.iconCar}
                />
            ))}
        </ScrollView>
    )
}

export default VehicleList