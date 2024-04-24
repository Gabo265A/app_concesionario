import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

const DialogAlert = ({ executeFunction }) => {
    const createTwoButtonAlert = () =>
        Alert.alert('Atención', '¡No deje ningún campo vacío!', [
            { text: 'Continuar', onPress: () => executeFunction() },
        ], { cancelable: true, onDismiss: () => executeFunction() });

    return (
        <View style={styles.container}>
            {createTwoButtonAlert()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default DialogAlert;