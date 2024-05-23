import React, {useState, useContext, useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';

//Components
import DialogAlert from '../components/DialogAlert';
import Helper from '../components/HelperText';

//Context
import UserContext from '../context/users/UserContext';

//firebase db
import firebase from '../firebase/firebase';

const QuotationRequestScreen = () => {
  const {userData} = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const fullNameRef = useRef();
  const [email, setEmail] = useState('');
  const emailRef = useRef();
  const [phone, setPhone] = useState('');
  const phoneRef = useRef();
  const [sendingRequest, setSendingRequest] = useState(false);

  //Estados para mostrar el helper
  const [showHelper, setShowHelper] = useState(false);
  const [customHelper, setCustomHelper] = useState([]);
  const [visible, setVisible] = useState(false);
  const [customHelperMessage, setCustomHelperMessage] = useState('');

  const sendRequest = async () => {
    if (fullName === '' || email === '') {
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
    } else if (!validateEmail(email)) {
      setCustomHelperMessage(
        '¡Ingrese un correo válido!\n\nAlgunas veces los usuarios escriben sus correos y dejan espacios, recuerde que el correo no debe contener espacios.\n\nNota: Para evitar los bots en nuestros servicios, tomamos medidas para permitir el uso de algunos de los servicios de correo más usados. Por favor, considere usar un correo diferente si el suyo no es aceptado.',
      );
      setVisible(true);
    } else if (phone.length != 0 && phone.length != 10) {
      setCustomHelperMessage(
        'Escriba un número de celular válido, solo escriba números.\nRecuerde que los números de celular para Colombia son de 10 caracteres',
      );
      setVisible(true);
    } else {
      setSendingRequest(true);
      try {
        let dataRequest = {
          userUID: userData ? userData.uid : 'Usuario no registrado',
          fullName: fullName,
          phoneNumber: phone ? phone : 'No registrado',
          email: email,
          status: 'Pendiente',
        };
        await firebase.db.collection('quotesRequest').add(dataRequest);
        setFullName(userData ? userData.fullName : '');
        setPhone('');
        setEmail(userData ? userData.email : '');
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

  function isValidNumber(text) {
    const regex = /^\d+$/;
    return regex.test(text);
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TextInput
            style={
              showHelper &&
              fullNameRef.current &&
              fullNameRef.current.isFocused()
                ? null
                : {marginBottom: 23}
            }
            ref={fullNameRef}
            right={
              <TextInput.Icon icon="account" onPress={() => setVisible(true)} />
            }
            label="Nombre y apellido"
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
            value={userData ? userData.fullName : fullName}
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
            ref={emailRef}
            style={
              showHelper && emailRef.current && emailRef.current.isFocused()
                ? null
                : {marginBottom: 23}
            }
            right={
              <TextInput.Icon icon="email" onPress={() => setVisible(true)} />
            }
            label="Correo"
            value={email}
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
            ref={phoneRef}
            style={
              showHelper && phoneRef.current && phoneRef.current.isFocused()
                ? null
                : {marginBottom: 23}
            }
            right={
              <TextInput.Icon
                icon="cellphone"
                onPress={() => setVisible(true)}
              />
            }
            label="Número de celular (opcional)"
            value={phone}
            keyboardType="numeric"
            onBlur={() => {
              setShowHelper(false);
            }}
            onFocus={() => {
              activeHelperTextInPhoneNumber(phone);
            }}
            onChangeText={text => {
              setPhone(text);
              activeHelperTextInPhoneNumber(text);
            }}
          />
          {showHelper && phoneRef.current && phoneRef.current.isFocused() && (
            <View style={{marginBottom: 23}}>
              <Helper
                type={customHelper[0]}
                isVisible={showHelper}
                text={customHelper[1]}
              />
            </View>
          )}

          <Button icon="send" mode="contained" onPress={sendRequest}>
            Solicitar cotización
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
});

export default QuotationRequestScreen;
