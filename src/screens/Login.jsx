import {useState, useContext, useRef, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
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
import Helper from '../components/HelperText';
import DialogAlert from '../components/DialogAlert';
import ActiveContext from '../context/ActiveContext/ActiveContext';

const Login = props => {
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const {signIn, isLoading, didTryAutoLogin} = useContext(UserContext);
  const {setActiveScreen} = useContext(ActiveContext);
  //Estados para mostrar el helper
  const [showHelper, setShowHelper] = useState(false);
  const [customHelper, setCustomHelper] = useState([]);

  //Estados para mostrar el dialog
  const [visible, setVisible] = useState(false);
  const [customHelperMessage, setCustomHelperMessage] = useState('');

  useEffect(() => {
    if (didTryAutoLogin) {
      const timer = setTimeout(() => {
        navigation.navigate('home');
        setActiveScreen('home');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [didTryAutoLogin]);

  const validateEmail = email => {
    const regex =
      /^[^\s@]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|protonmail\.com|zoho\.com|yandex\.com|mail\.com|icloud\.com)(\.mx|\.co|\.uk|\.net|\.org|\.gov|\.edu)?$/;
    return regex.test(email);
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

  const checkInformation = () => {
    if (email === '' || password === '') {
      setCustomHelperMessage('Todos los campos son obligatorios');
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
    } else {
      signIn(email, password)
        .then(result => {
          if (result[0] === 'wrongCredentials') {
            setCustomHelperMessage(result[1]);
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
                ref={emailRef}
                placeholder="Correo eléctronico"
                right={<TextInput.Icon icon="email" />}
                onChangeText={text => {
                  setEmail(text);
                  activeHelperTextInEmail(text);
                }}
                value={email}
                onBlur={() => {
                  setShowHelper(false);
                }}
                onFocus={() => {
                  activeHelperTextInEmail(email);
                }}
                keyboardType="email-address"
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
                  value={password}
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
                />
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#4a4150"
                  onPress={() => setShowPassword(!showPassword)}
                  style={{position: 'absolute', top: 26, right: 16}}
                />
                {showHelper &&
                  passwordRef.current &&
                  passwordRef.current.isFocused() && (
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
                onPress={() => checkInformation()}
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
