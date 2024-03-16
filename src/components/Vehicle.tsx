import react from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const Vehicle = ({ imageUrl, description, price }) => {
    return (
        <View>
            <Image
                source={{ uri: imageUrl }}
                style={style.image}
            />
            <Text style={{ marginTop: 10 }}>
                {description}
            </Text>
            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>${price}</Text>
        </View>
    )

}

const style = StyleSheet.create({
    image: {
        width: 200,
        height: 200
    }

})

export default Vehicle 