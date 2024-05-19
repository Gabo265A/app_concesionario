import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import BackgroundWelcomeScreen from '../components/BackgroundWelcomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UserContext from '../context/users/UserContext';
import DialogAlert from '../components/DialogAlert';
import Helper from '../components/HelperText';
import ActiveContext from '../context/ActiveContext/ActiveContext';

const Register = props => {
  const [fullName, setFullName] = useState('');
  const fullNameRef = useRef(null);
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [repeatPassword, setRepeatPassword] = useState('');
  const repeatPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customHelperMessage, setCustomHelperMessage] = useState('');
  const {setActiveScreen} = useContext(ActiveContext);
  const {signUp, isLoading, didTryAutoLogin} = useContext(UserContext);
  const navigation = props.navigation;

  useEffect(() => {
    if (didTryAutoLogin) {
      const timer = setTimeout(() => {
        navigation.navigate('home');
        setActiveScreen('home');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [didTryAutoLogin]);

  //Estados para mostrar el helper
  const [showHelper, setShowHelper] = useState(false);
  const [customHelper, setCustomHelper] = useState([]);

  const checkInformation = () => {
    if (
      fullName === '' ||
      email === '' ||
      password === '' ||
      repeatPassword === ''
    ) {
      setCustomHelperMessage('Todos los campos son obligatorios');
      setVisible(true);
    } else if (fullName.length <= 4) {
      setCustomHelperMessage(
        '¡Escriba al menos 5 caracteres en el campo del nombre!',
      );
      setVisible(true);
    } else if (fullName.length >= 50) {
      setCustomHelperMessage(
        '¡Escriba menos de 50 caracteres en el campo del nombre!',
      );
      setVisible(true);
    } else if (!validateName(fullName)) {
      setCustomHelperMessage(
        'El nombre no debe tener espacios al principio o final, ni más de un espacio entre palabras.',
      );
      setVisible(true);
    } else if (!validateEmail(email)) {
      setCustomHelperMessage(
        '¡Ingrese un correo válido!\n\nAlgunas veces los usuarios escriben sus correos y dejan espacios, recuerde que el correo no debe contener espacios.\n\nNota: Para evitar los bots en nuestros servicios, tomamos medidas para permitir el registro con algunos de los servicios de correo más usados. En caso de que su correo no sea soportado por nuestra aplicación, por favor contáctenos para ayudarle en su registro.',
      );
      setVisible(true);
    } else if (password.length <= 7) {
      setCustomHelperMessage(
        '¡La contraseña debe tener al menos 8 caracteres!',
      );
      setVisible(true);
    } else if (
      !validatePasswordUppercase(password) ||
      !validatePasswordNumber(password) ||
      !validatePasswordSpecialCharacter(password) ||
      validatePasswordSpaces(password)
    ) {
      setCustomHelperMessage(
        '¡La contraseña debe tener al menos una letra mayúscula, un número, un carácter especial y no debe tener espacios!',
      );
      setVisible(true);
    } else if (!validateEqualPasswords(repeatPassword)) {
      setCustomHelperMessage('¡Las contraseñas no coinciden!');
      setVisible(true);
    } else {
      signUp(fullName, email, password)
        .then(result => {
          if (result[0] === 'error') {
            setCustomHelperMessage(
              'Código de error: ' +
                result[1] +
                '\n\nPara algúnos usuarios el mensaje de error ya los hace entender que pasó, sin embargo, no dude en contáctarnos si necesita ayuda de nuestro equipo de soporte técnico.\n\nNota: Si necesita ayuda del soporte técnico, por favor, proporcione un pantallazo del mensaje de error para que podamos ayudarle de manera más rápida y eficiente.',
            );
            setVisible(true);
          } else {
            setCustomHelperMessage(result[1]);
            setVisible(true);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const validatePasswordSpaces = password => {
    const regex = /\s/;
    return regex.test(password);
  };

  const validatePasswordUppercase = password => {
    const regex = /[A-Z]/;
    return regex.test(password);
  };

  const validatePasswordNumber = password => {
    const regex = /\d/;
    return regex.test(password);
  };

  const validatePasswordSpecialCharacter = password => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return regex.test(password);
  };

  const validateEqualPasswords = text => {
    return password === text;
  };

  const validateEmail = email => {
    const regex =
      /^[^\s@]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|protonmail\.com|zoho\.com|yandex\.com|mail\.com|icloud\.com)(\.mx|\.co|\.uk|\.net|\.org|\.gov|\.edu)?$/;
    return regex.test(email);
  };

  const validateName = name => {
    const regex = /^[^\s]+(\s[^\s]+)*$/;
    return regex.test(name);
  };

  const activeHelperTextInFullName = text => {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper(['error', '¡No deje el campo del nombre vacío!']);
    } else if (!validateName(text)) {
      setShowHelper(true);
      setCustomHelper(['info', 'Verifique los espacios']);
    } else if (text.length <= 4) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Escriba al menos 5 caracteres!']);
    } else if (text.length >= 50) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Escriba menos de 50 caracteres!']);
    } else {
      setShowHelper(false);
    }
  };

  const activeHelperTextInRepeatPassword = text => {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper(['error', '¡No deje el campo de la contraseña vacío!']);
    } else if (!validateEqualPasswords(text)) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Las contraseñas no coinciden!']);
    } else {
      setShowHelper(false);
    }
  };

  const activeHelperTextInEmail = text => {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper(['error', '¡No deje el campo del correo vacío!']);
    } else if (!validateEmail(text)) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Ingrese un correo válido!']);
    } else {
      setShowHelper(false);
    }
  };

  const activeHelperTextInPassword = text => {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper(['error', '¡No deje el campo de la contraseña vacío!']);
    } else if (text.length <= 7) {
      setShowHelper(true);
      setCustomHelper([
        'info',
        '¡La contraseña debe tener al menos 8 caracteres!',
      ]);
    } else if (!validatePasswordUppercase(text)) {
      setShowHelper(true);
      setCustomHelper([
        'info',
        '¡La contraseña debe tener una letra mayúscula!',
      ]);
    } else if (!validatePasswordNumber(text)) {
      setShowHelper(true);
      setCustomHelper(['info', '¡La contraseña debe tener un número!']);
    } else if (!validatePasswordSpecialCharacter(text)) {
      setShowHelper(true);
      setCustomHelper([
        'info',
        '¡La contraseña debe tener un carácter especial!',
      ]);
    } else if (validatePasswordSpaces(text)) {
      setShowHelper(true);
      setCustomHelper(['info', '¡La contraseña no debe tener espacios!']);
    } else {
      setShowHelper(false);
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
                onBlur={() => {
                  setShowHelper(false);
                }}
                onFocus={() => {
                  activeHelperTextInFullName(fullName);
                }}
                onChangeText={text => {
                  setFullName(text);
                  activeHelperTextInFullName(text);
                }}
                value={fullName}
                ref={fullNameRef}
              />
              {showHelper &&
                fullNameRef.current &&
                fullNameRef.current.isFocused() && (
                  <Helper
                    type={customHelper[0]}
                    isVisible={showHelper}
                    text={customHelper[1]}
                  />
                )}
              <TextInput
                ref={emailRef}
                placeholder="Correo eléctronico"
                style={{marginTop: 10}}
                right={<TextInput.Icon icon="email" />}
                keyboardType="email-address"
                onBlur={() => {
                  setShowHelper(false);
                }}
                onFocus={() => {
                  activeHelperTextInEmail(email);
                }}
                onChangeText={text => {
                  setEmail(text);
                  activeHelperTextInEmail(text);
                }}
                value={email}
              />
              {showHelper &&
                emailRef.current &&
                emailRef.current.isFocused() && (
                  <Helper
                    type={customHelper[0]}
                    isVisible={showHelper}
                    text={customHelper[1]}
                  />
                )}
              <View
                style={
                  passwordRef.current &&
                  passwordRef.current.isFocused() &&
                  showHelper
                    ? {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 23,
                      }
                    : {flexDirection: 'row', alignItems: 'center'}
                }>
                <TextInput
                  ref={passwordRef}
                  placeholder="Contraseña"
                  secureTextEntry={!showPassword}
                  style={{flex: 1, marginTop: 10, position: 'relative'}}
                  onBlur={() => {
                    setShowHelper(false);
                  }}
                  onFocus={() => {
                    activeHelperTextInPassword(password);
                  }}
                  onChangeText={text => {
                    setPassword(text);
                    activeHelperTextInPassword(text);
                  }}
                  value={password}
                />
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#4a4150"
                  onPress={() => setShowPassword(!showPassword)}
                  style={{position: 'absolute', top: 26, right: 16}}
                />
                {showHelper && passwordRef.current.isFocused() && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 65,
                      right: 0,
                      width: 340,
                    }}>
                    <Helper
                      type={customHelper[0]}
                      isVisible={showHelper}
                      text={customHelper[1]}
                    />
                  </View>
                )}
              </View>

              <View
                style={
                  repeatPasswordRef.current &&
                  repeatPasswordRef.current.isFocused() &&
                  showHelper
                    ? {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 23,
                      }
                    : {flexDirection: 'row', alignItems: 'center'}
                }>
                <TextInput
                  ref={repeatPasswordRef}
                  value={repeatPassword}
                  placeholder="Repetir contraseña"
                  secureTextEntry={!showPassword}
                  style={{flex: 1, marginTop: 10, position: 'relative'}}
                  onBlur={() => {
                    setShowHelper(false);
                  }}
                  onFocus={() => {
                    activeHelperTextInRepeatPassword(repeatPassword);
                  }}
                  onChangeText={text => {
                    setRepeatPassword(text);
                    activeHelperTextInRepeatPassword(text);
                  }}
                />
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#4a4150"
                  onPress={() => setShowPassword(!showPassword)}
                  style={{position: 'absolute', right: 16, top: 26}}
                />
                {showHelper &&
                  repeatPasswordRef.current &&
                  repeatPasswordRef.current.isFocused() && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 65,
                        right: 0,
                        width: 340,
                      }}>
                      <Helper
                        type={customHelper[0]}
                        isVisible={showHelper}
                        text={customHelper[1]}
                      />
                    </View>
                  )}
              </View>
              <Text style={{alignSelf: 'center', paddingTop: 10}}>
                Todos los campos son obligatorios.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                icon="account-plus"
                mode="contained"
                onPress={() => checkInformation()}
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
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            pointerEvents: 'auto',
          }}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.deepPurple500}
            size={100}
          />
        </View>
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
    backgroundColor: 'white',
  },
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    top: 300,
  },
});

export default Register;
