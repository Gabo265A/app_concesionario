import React, {useState, useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import BackgroundWelcomeScreen from '../components/BackgroundWelcomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UserContext from '../context/users/UserContext';
import DialogAlert from '../components/DialogAlert';

const Register = props => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customHelperMessage, setCustomHelperMessage] = useState('');
  const {signUp} = useContext(UserContext);
  const navigation = props.navigation;

  const checkPassword = async () => {
    if (password === repeatPassword) {
      signUp(fullName, email, password);
    } else {
      setCustomHelperMessage('Las contraseñas no coinciden');
      setVisible(true);
    }
  };

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
          <View style={styles.newAccount}>
            <Text style={styles.newAccountTitle}>Regístrate</Text>
            <Text style={styles.newAccountSubTitle}>Crea una nueva cuenta</Text>
          </View>

          <View style={styles.informationContainer}>
            <View style={styles.dataContainer}>
              <TextInput
                placeholder="Nombre y apellidos"
                right={<TextInput.Icon icon="account" />}
                onChangeText={text => setFullName(text)}
              />
              <TextInput
                placeholder="Correo eléctronico"
                style={{marginTop: 10}}
                right={<TextInput.Icon icon="email" />}
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                placeholder="Contraseña"
                onChangeText={text => setPassword(text)}
                secureTextEntry={!showPassword}
                style={{marginTop: 10}}
              />
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#4a4150"
                onPress={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: 16, top: 147}}
              />
              <TextInput
                placeholder="Repetir contraseña"
                secureTextEntry={!showPassword}
                onChangeText={text => setRepeatPassword(text)}
                style={{marginTop: 10}}
              />
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#4a4150"
                onPress={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: 16, top: 213}}
              />
              <Text style={{alignSelf: 'center', paddingTop: 10}}>
                Todos los campos son obligatorios.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                icon="account-plus"
                mode="contained"
                onPress={() => checkPassword()}
                style={{marginHorizontal: 10}}>
                Registrarse
              </Button>
              <Text style={{alignSelf: 'center', paddingTop: 10}}>
                ¿Ya tienes una cuenta?{' '}
                <Text
                  style={{color: '#663399', fontWeight: 'bold'}}
                  onPress={() => navigation.navigate('SignIn')}>
                  Inicia sesión
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </BackgroundWelcomeScreen>
      {visible && (
        <DialogAlert
          alertMessage={customHelperMessage}
          changeVisibility={setVisible}
        />
      )}
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
  newAccount: {
    alignItems: 'center',
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
  newAccountTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    height: 45,
    width: 145,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  newAccountSubTitle: {
    fontSize: 20,
    color: 'white',
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
    top: 300,
  },
});

export default Register;
