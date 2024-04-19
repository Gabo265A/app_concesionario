import react from 'react'
import { View, ScrollView } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper';


const Vehicle = ({ imageUrl, description, price, name, iconCar }) => {

    const LeftContent = props => <Avatar.Icon {...props} icon={iconCar} /> // Icono del vehículo

    return (
        <ScrollView style={{ backgroundColor: '#EEEEEE' }}>
            <View style={{ margin: 10 }}>
                <Card>
                    <Card.Title title={name} subtitle={'$' + price} left={LeftContent} />
                    <Card.Content>
                        <Text variant="bodyMedium">{description}</Text>
                    </Card.Content>
                    <Card.Cover source={{ uri: imageUrl }} style={{ width: '95%', marginLeft: '2.5%', marginTop: '2.5%' }} />
                    <Card.Actions>
                        <Button mode='contained'>Más información</Button>
                    </Card.Actions>
                </Card>
            </View>
        </ScrollView>
    )

}

export default Vehicle 