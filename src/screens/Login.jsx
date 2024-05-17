import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import BackgroundWelcomeScreen from '../components/BackgroundWelcomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = props => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = props.navigation;
  return (
    <>
      <BackgroundWelcomeScreen>
        <View style={{height: '100%'}}>
          <View style={{flexDirection: 'row'}}>
            <IconButton
              icon="arrow-left-drop-circle"
              iconColor={'white'}
              size={40}
              style={{marginRight: 0}}
              onPress={() => navigation.navigate('Welcome')}
            />
            <Text
              style={styles.backText}
              onPress={() => navigation.navigate('Welcome')}>
              Regresar
            </Text>
          </View>
          <View style={styles.companyInfo}>
            <Image
              style={{width: 55, height: 55}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/appconcesionario-66cd6.appspot.com/o/sources%2Flogo.png?alt=media&token=bf524b38-74da-4e05-988a-05fab0c2fc41',
              }}
            />
            <Text style={styles.brand}>Concesionario</Text>
          </View>

          <View style={styles.informationContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Bienvenido de vuelta</Text>
              <Text style={styles.subTitle}>Inicia sesión en tu cuenta</Text>
            </View>
            <View style={styles.dataContainer}>
              <TextInput
                placeholder="Correo eléctronico"
                right={<TextInput.Icon icon="email" />}
              />
              <TextInput
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                style={{marginTop: 10}}
              />
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#4a4150"
                onPress={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: 16, top: 80}}
              />
              <Text style={{alignSelf: 'flex-end', paddingTop: 10}}>
                ¿Olvidaste tu contraseña?{' '}
                <Text
                  style={{
                    color: '#663399',
                    fontWeight: 'bold',
                  }}
                  onPress={() => console.log('Hacer el screen')}>
                  Presiona aquí
                </Text>
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                icon="login"
                mode="contained"
                onPress={() => navigation.navigate('SignIn')}
                style={{marginHorizontal: 10}}>
                Iniciar sesión
              </Button>
              <Text style={{alignSelf: 'center', paddingTop: 10}}>
                ¿No tienes una cuenta?{' '}
                <Text
                  style={{color: '#663399', fontWeight: 'bold'}}
                  onPress={() => navigation.navigate('SignUp')}>
                  Regístrate
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </BackgroundWelcomeScreen>
    </>
  );
};

const styles = StyleSheet.create({
  backText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 50,
  },
  informationContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    top: 130,
    height: 700,
    width: 420,
  },
  brand: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    left: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#663399',
    top: 50,
  },
  subTitle: {
    fontSize: 20,
    color: '#8855BB',
    top: 45,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  dataContainer: {
    top: 80,
    height: 130,
    alignSelf: 'center',
    width: 320,
  },
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    top: 200,
  },
});

export default Login;
