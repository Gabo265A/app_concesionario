import {useState, useCallback, useContext, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Button,
  TextInput,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import {
  DatePickerModal,
  registerTranslation,
  es,
  TimePickerModal,
} from 'react-native-paper-dates';
registerTranslation('es', es);

//Components
import DialogAlert from '../components/DialogAlert';
import Helper from '../components/HelperText';

//Context
import UserContext from '../context/users/UserContext';

//firebase db
import firebase from '../firebase/firebase';

const TestDriveRequestScreen = () => {
  const {userData} = useContext(UserContext);
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const fullNameRef = useRef();
  const [identificationNumber, setIdentificationNumber] = useState('');
  const identificationNumberRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneNumberRef = useRef();
  const [email, setEmail] = useState('');
  const emailRef = useRef();
  const [dateTime, setDateTime] = useState('Click en el icono para la hora...');
  const [dateTimeVisible, setDateTimeVisible] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);

  //Estados para mostrar el helper
  const [showHelper, setShowHelper] = useState(false);
  const [customHelper, setCustomHelper] = useState([]);
  const [visible, setVisible] = useState(false);
  const [customHelperMessage, setCustomHelperMessage] = useState('');

  const onDismiss = useCallback(() => {
    setDateTimeVisible(false);
  }, [setDateTimeVisible]);

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName);
      setEmail(userData.email);
    }
  }, [userData]);

  const sendRequest = async () => {
    if (
      date === '' ||
      fullName === '' ||
      identificationNumber === '' ||
      fullName === '' ||
      dateTime === 'Click en el icono para la hora...'
    ) {
      setCustomHelperMessage('¡Por favor, complete todos los campos!');
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
    } else if (
      identificationNumber.length <= 6 ||
      identificationNumber.length >= 11
    ) {
      setCustomHelperMessage(
        'Escriba un número de identificación válido, solo escriba números.\nRecuerde que los números de documentos para Colombia son entre 7 y 10 caracteres',
      );
      setVisible(true);
    } else if (!validateEmail(email)) {
      setCustomHelperMessage(
        '¡Ingrese un correo válido!\n\nAlgunas veces los usuarios escriben sus correos y dejan espacios, recuerde que el correo no debe contener espacios.\n\nNota: Para evitar los bots en nuestros servicios, tomamos medidas para permitir el uso de algunos de los servicios de correo más usados. Por favor, considere usar un correo diferente si el suyo no es aceptado.',
      );
      setVisible(true);
    } else if (phoneNumber.length !== 0 && phoneNumber.length != 10) {
      setCustomHelperMessage(
        'Escriba un número de celular válido, solo escriba números.\nRecuerde que los números de celular para Colombia son de 10 caracteres',
      );
      setVisible(true);
    } else {
      setSendingRequest(true);
      try {
        let dataRequest = {
          userUID: userData ? userData.uid : 'Usuario no registrado',
          date: date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          hour: dateTime.split('Hora: ')[1],
          fullName: fullName,
          identificationNumber: identificationNumber,
          phoneNumber: phoneNumber ? phoneNumber : 'No registrado',
          email: email,
          status: 'Pendiente',
        };
        await firebase.db.collection('testDriverRequest').add(dataRequest);
        setFullName(userData ? userData.fullName : '');
        setIdentificationNumber('');
        setPhoneNumber('');
        setEmail(userData ? userData.email : '');
        setDateTime('Click en el icono para la hora...');
        setDate('');
        setCustomHelperMessage(
          '¡Solicitud enviada correctamente!\n\nEn breve nos comunicaremos con usted para confirmar la cita.',
        );
        setVisible(true);
        setSendingRequest(false);
      } catch (error) {
        setSendingRequest(false);
        setCustomHelperMessage(
          '¡Hubo un error al enviar la solicitud! Por favor, intente de nuevo.\n\nCódigo de error:' +
            {error} +
            '\n\nSi el error persiste, por favor, comuníquese con nosotros enviando un pantallazo con el código del error.',
        );
        setVisible(true);
      }
    }
  };

  const checkHour = hour => {
    const selectedHour = parseInt(hour, 10);
    return selectedHour < 8 || selectedHour > 17;
  };

  const onConfirm = ({hours, minutes}) => {
    const selectedHour = parseInt(hours, 10);

    if (selectedHour < 8 || selectedHour > 17) {
      setDateTimeVisible(false);
      setCustomHelperMessage(
        '¡Por favor, seleccione una hora entre las 8 y las 17!',
      );
      setVisible(true);
    } else {
      setDateTimeVisible(false);
      setDateTime('Hora: ' + hours + ':' + minutes);
    }
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

  const validateName = name => {
    const regex = /^[^\s]+(\s[^\s]+)*$/;
    return regex.test(name);
  };

  const activeHelperTextInIdentificationNumber = text => {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper([
        'error',
        '¡No deje el campo del número de indentificación vacío!',
      ]);
    } else if (!isValidNumber(text)) {
      setShowHelper(true);
      setCustomHelper(['info', 'Solo escriba números']);
    } else if (text.length <= 6) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Escriba al menos 7 caracteres!']);
    } else if (text.length >= 11) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Escriba menos de 10 caracteres!']);
    } else {
      setShowHelper(false);
    }
  };

  function isValidNumber(text) {
    const regex = /^\d+$/;
    return regex.test(text);
  }

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

  const validateEmail = email => {
    const regex =
      /^[^\s@]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|protonmail\.com|zoho\.com|yandex\.com|mail\.com|icloud\.com)(\.mx|\.co|\.uk|\.net|\.org|\.gov|\.edu)?$/;
    return regex.test(email);
  };

  const activeHelperTextInPhoneNumber = text => {
    if (!isValidNumber(text)) {
      setShowHelper(true);
      setCustomHelper(['info', 'Solo escriba números']);
    } else if (text.length != 10) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Escriba un número de 10 caracteres!']);
    } else {
      setShowHelper(false);
    }
  };

  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TextInput
            value={
              date
                ? date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : ''
            }
            right={
              <TextInput.Icon icon="calendar" onPress={() => setOpen(true)} />
            }
            editable={false}
            label={'Selecciona la fecha de la cita'}
          />
          <DatePickerModal
            locale="es"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
            presentationStyle="pageSheet"
            validRange={{
              startDate: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 1,
              ),
              endDate: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 14,
              ),
            }}
          />

          <TextInput
            style={{marginBottom: 23, marginTop: 23}}
            value={
              dateTime === 'Click en el icono para la hora...'
                ? ''
                : dateTime.substring(6)
            }
            right={
              <TextInput.Icon
                icon="clock"
                onPress={() => setDateTimeVisible(true)}
              />
            }
            editable={false}
            label={
              dateTime != 'Click en el icono para la hora...'
                ? 'Hora'
                : dateTime
            }
          />

          <TimePickerModal
            label="Selecciona la hora de la cita"
            locale="es"
            visible={dateTimeVisible}
            hours={new Date().getHours().toString()}
            minutes={new Date().getMinutes().toString()}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
          />

          <TextInput
            ref={fullNameRef}
            style={
              showHelper &&
              fullNameRef.current &&
              fullNameRef.current.isFocused()
                ? null
                : styles.input
            }
            value={userData ? userData.fullName : fullName}
            label="Nombre y apellidos"
            right={<TextInput.Icon icon="account" />}
            editable={userData ? false : true}
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
          />
          {showHelper &&
            fullNameRef.current &&
            fullNameRef.current.isFocused() && (
              <View style={{marginBottom: 23}}>
                <Helper
                  type={customHelper[0]}
                  isVisible={showHelper}
                  text={customHelper[1]}
                />
              </View>
            )}

          <TextInput
            ref={identificationNumberRef}
            style={
              showHelper &&
              identificationNumberRef.current &&
              identificationNumberRef.current.isFocused()
                ? null
                : styles.input
            }
            value={identificationNumber}
            label="Número de Identificación"
            keyboardType="numeric"
            right={<TextInput.Icon icon="identifier" />}
            onBlur={() => {
              setShowHelper(false);
            }}
            onFocus={() => {
              activeHelperTextInIdentificationNumber(identificationNumber);
            }}
            onChangeText={text => {
              setIdentificationNumber(text);
              activeHelperTextInIdentificationNumber(text);
            }}
          />
          {showHelper &&
            identificationNumberRef.current &&
            identificationNumberRef.current.isFocused() && (
              <View style={{marginBottom: 23}}>
                <Helper
                  type={customHelper[0]}
                  isVisible={showHelper}
                  text={customHelper[1]}
                />
              </View>
            )}

          <TextInput
            ref={emailRef}
            style={
              showHelper && emailRef.current && emailRef.current.isFocused()
                ? null
                : styles.input
            }
            value={userData ? userData.email : email}
            label="Correo electrónico"
            right={<TextInput.Icon icon="email" />}
            keyboardType="email-address"
            editable={userData ? false : true}
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
          />

          {showHelper && emailRef.current && emailRef.current.isFocused() && (
            <View style={{marginBottom: 23}}>
              <Helper
                type={customHelper[0]}
                isVisible={showHelper}
                text={customHelper[1]}
              />
            </View>
          )}

          <TextInput
            ref={phoneNumberRef}
            style={
              showHelper &&
              phoneNumberRef.current &&
              phoneNumberRef.current.isFocused()
                ? null
                : styles.input
            }
            value={phoneNumber}
            label="Número de celular (opcional)"
            keyboardType="numeric"
            right={<TextInput.Icon icon="cellphone" />}
            onBlur={() => {
              setShowHelper(false);
            }}
            onFocus={() => {
              activeHelperTextInPhoneNumber(phoneNumber);
            }}
            onChangeText={text => {
              setPhoneNumber(text);
              activeHelperTextInPhoneNumber(text);
            }}
          />

          {showHelper &&
            phoneNumberRef.current &&
            phoneNumberRef.current.isFocused() && (
              <View style={{marginBottom: 23}}>
                <Helper
                  type={customHelper[0]}
                  isVisible={showHelper}
                  text={customHelper[1]}
                />
              </View>
            )}

          <Button icon="send" mode="contained" onPress={() => sendRequest()}>
            Enviar solicitud
          </Button>
        </View>
      </ScrollView>
      {visible && (
        <DialogAlert
          alertMessage={customHelperMessage}
          changeVisibility={setVisible}
        />
      )}
      {sendingRequest && (
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
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  input: {
    marginBottom: 23,
    paddingHorizontal: 12,
  },
});

export default TestDriveRequestScreen;
