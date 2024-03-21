import react from 'react'
import { View, Image, Text, StyleSheet, Button } from 'react-native'

const Vehicle = ({ imageUrl, description, price }) => {
    return (
        <View style={styles.carListContainer}>
            <View style={styles.carCard}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                        {description}</Text>
                </View>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
                <View style={styles.priceAndBuyButtonContainer}>
                    <Text style={{ fontSize: 20, marginRight: 10 }}>${price}</Text>
                    <Button title='Comprar' />
                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    carListContainer: {
        width: '95%',
        margin: 10,
        flex: 1,
    }
    ,
    carCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    }
    ,
    priceAndBuyButtonContainer: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 145,
    },
    image: {
        marginTop: 10,
        marginBottom: 5,
        width: '95%',
        height: 200,
        borderRadius: 10,
    }

})

export default Vehicle 