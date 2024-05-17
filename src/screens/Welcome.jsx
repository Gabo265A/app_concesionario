import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {Image} from 'react-native';
import BackgroundWelcomeScreen from '../components/BackgroundWelcomeScreen';

const Welcome = props => {
  const navigation = props.navigation;
  return (
    <>
      <BackgroundWelcomeScreen>
        <View style={styles.container}>
          <Text style={styles.title}>
            Tu concesionario de confianza en la palma de tu mano
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              icon="login"
              mode="contained"
              buttonColor="white"
              textColor="#663399"
              onPress={() => navigation.navigate('SignIn')}
              style={styles.button}>
              Iniciar sesión
            </Button>
            <Button
              icon="account-multiple-plus"
              mode="contained"
              onPress={() => navigation.navigate('SignUp')}
              style={styles.button}>
              Registrarse
            </Button>
          </View>
        </View>
      </BackgroundWelcomeScreen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 240,
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    top: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    margin: 10,
  },
});

export default Welcome;
