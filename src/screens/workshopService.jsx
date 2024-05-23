import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  DatePickerModal,
  registerTranslation,
  es,
} from 'react-native-paper-dates';
registerTranslation('es', es);
import {
  TextInput,
  List,
  Button,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';

//Components
import DialogAlert from '../components/DialogAlert';
import Helper from '../components/HelperText';

//Contexts
import ServiceHistoryContext from '../context/serviceHistory/ServiceHistoryContext';
import UserContext from '../context/users/UserContext';

const WorkshopServiceScreen = () => {
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('Servicios');
  const [otherService, setOtherService] = useState('');
  const otherServiceRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const fullNameRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneNumberRef = useRef(null);
  const [vehicleRegistrationPlate, setVehicleRegistrationPlate] = useState('');
  const vehicleRegistrationPlateRef = useRef(null);

  //Context
  const {sendNewService, sendingHistory} = useContext(ServiceHistoryContext);
  const {userData} = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName);
    }
  }, [userData]);

  //Estados para mostrar el helper
  const [showHelper, setShowHelper] = useState(false);
  const [customHelper, setCustomHelper] = useState([]);
  const [customHelperMessage, setCustomHelperMessage] = useState('');

  //Estado para mostrar el dialog alert
  const [visible, setVisible] = useState(false);

  const [expanded, setExpanded] = useState(false); //Estado para ocultar el listado de servicios
  const handlePress = () => setExpanded(!expanded); //Función para ocultar el listado de servicios

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

  const serviceTypeList = [
    {id: 1, name: 'Mantenimiento'},
    {id: 2, name: 'Reparación'},
    {id: 3, name: 'Revisión técnica'},
    {id: 4, name: 'Otro...'},
  ];

  const sendService = async () => {
    if (
      date == '' ||
      serviceType == 'Servicios' ||
      fullName == '' ||
      phoneNumber == '' ||
      vehicleRegistrationPlate == ''
    ) {
      setVisible(true);
      setCustomHelperMessage('¡Por favor complete todos los campos!');
      return;
    } else if (serviceType == 'Otro...' && otherService == '') {
      setVisible(true);
      setCustomHelperMessage('¡Por favor especifique el servicio!');
    } else if (date == 'Selecciona la fecha de la cita') {
      setVisible(true);
      setCustomHelperMessage('¡Por favor seleccione la fecha de la cita!');
    } else if (fullName.length <= 4) {
      setVisible(true);
      setCustomHelperMessage(
        '¡Escriba al menos 5 caracteres en el campo del nombre!',
      );
    } else if (fullName.length >= 50) {
      setVisible(true);
      setCustomHelperMessage(
        '¡Escriba menos de 50 caracteres en el campo del nombre!',
      );
    } else if (!validateName(fullName)) {
      setCustomHelperMessage(
        'El nombre no debe tener espacios al principio o final, ni más de un espacio entre palabras.',
      );
      setVisible(true);
    } else {
      const service = {
        date: date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        serviceType: serviceType,
        fullName: fullName,
        phoneNumber: phoneNumber,
        vehicleRegistrationPlate: vehicleRegistrationPlate,
        userUID: userData ? userData.uid : 'Usuario no registrado',
        status: 'Pendiente',
      };
      if (serviceType == 'Otro...') {
        service.serviceType = otherService;
      }
      try {
        await sendNewService(service);
        setDate('');
        setServiceType('Servicios');
        setOtherService('');
        setFullName(userData ? userData.fullName : '');
        setPhoneNumber('');
        setVehicleRegistrationPlate('');
        setVisible(true);
        setCustomHelperMessage(
          '¡Servicio solicitado correctamente!\nEn breve nos comunicaremos con usted para confirmar la hora.',
        );
      } catch (error) {
        setVisible(true);
        setCustomHelperMessage(
          '¡Ha ocurrido un error al solicitar el servicio!',
        );
      }
    }
    {
      /**/
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

  const activeHelperTextInPhoneNumber = text => {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper(['error', '¡No deje el campo del número vacío!']);
    } else if (!isValidNumber(text)) {
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

  const activeHelperTextInVehicleRegistrationPlate = text => {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper(['error', '¡No deje el campo de la placa vacío!']);
    } else if (!validateVehicleRegistrationPlate(text)) {
      setShowHelper(true);
      setCustomHelper(['info', 'Formato correcto: AAA-00A o AAA-000']);
    } else {
      setShowHelper(false);
    }
  };

  function validateVehicleRegistrationPlate(plate) {
    const regex = /^[A-Z]{3}-((\d{2}[A-Z])|(\d{3}))$/;
    return regex.test(plate);
  }

  function activeHelperTextInOtherService(text) {
    if (text.length === 0) {
      setShowHelper(true);
      setCustomHelper(['error', '¡No deje el campo del servicio vacío!']);
    } else if (text.length <= 4) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Escriba al menos 5 caracteres!']);
    } else if (text.length >= 50) {
      setShowHelper(true);
      setCustomHelper(['info', '¡Escriba menos de 50 caracteres!']);
    } else {
      setShowHelper(false);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
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

            <List.Section style={{marginBottom: 23, marginTop: 23}}>
              <List.Accordion
                title={serviceType}
                left={props => (
                  <List.Icon {...props} icon="format-list-bulleted" />
                )}
                expanded={expanded}
                onPress={handlePress}>
                {serviceTypeList.map(item => (
                  <List.Item
                    key={item.id}
                    title={item.name}
                    onPress={() => {
                      setServiceType(item.name);
                      setExpanded(false);
                    }}
                  />
                ))}
              </List.Accordion>
            </List.Section>
            {serviceType == 'Otro...' && (
              <TextInput
                ref={otherServiceRef}
                style={
                  showHelper &&
                  otherServiceRef.current &&
                  otherServiceRef.current.isFocused()
                    ? null
                    : styles.input
                }
                value={otherService}
                onBlur={() => {
                  setShowHelper(false);
                }}
                onFocus={() => {
                  activeHelperTextInOtherService(otherService);
                }}
                onChangeText={text => {
                  setOtherService(text);
                  activeHelperTextInOtherService(text);
                }}
                label="Especifique el servicio"
                right={<TextInput.Icon icon="car-cog" />}
              />
            )}
            {showHelper &&
              otherServiceRef.current &&
              otherServiceRef.current.isFocused() && (
                <View style={{marginBottom: 23}}>
                  <Helper
                    type={customHelper[0]}
                    isVisible={showHelper}
                    text={customHelper[1]}
                  />
                </View>
              )}

            <TextInput
              ref={fullNameRef}
              style={
                showHelper &&
                fullNameRef.current &&
                fullNameRef.current.isFocused()
                  ? null
                  : styles.input
              }
              label="Nombres y apellidos"
              value={userData ? userData.fullName : fullName}
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
              right={<TextInput.Icon icon="account" />}
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
              ref={phoneNumberRef}
              style={
                showHelper &&
                phoneNumberRef.current &&
                phoneNumberRef.current.isFocused()
                  ? null
                  : styles.input
              }
              value={phoneNumber}
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
              label="Número de celular"
              keyboardType="numeric"
              right={<TextInput.Icon icon="cellphone" />}
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

            <TextInput
              ref={vehicleRegistrationPlateRef}
              style={
                showHelper &&
                vehicleRegistrationPlateRef.current &&
                vehicleRegistrationPlateRef.current.isFocused()
                  ? null
                  : styles.input
              }
              value={vehicleRegistrationPlate}
              onBlur={() => {
                setShowHelper(false);
              }}
              onFocus={() => {
                activeHelperTextInVehicleRegistrationPlate(
                  vehicleRegistrationPlate,
                );
              }}
              onChangeText={text => {
                setVehicleRegistrationPlate(text.toUpperCase());
                activeHelperTextInVehicleRegistrationPlate(text);
              }}
              label="Placa del vehículo"
              right={<TextInput.Icon icon="car" />}
            />
            {showHelper &&
              vehicleRegistrationPlateRef.current &&
              vehicleRegistrationPlateRef.current.isFocused() && (
                <View style={{marginBottom: 23}}>
                  <Helper
                    type={customHelper[0]}
                    isVisible={showHelper}
                    text={customHelper[1]}
                  />
                </View>
              )}

            <Button icon="send" mode="contained" onPress={sendService}>
              Solicitar servicio
            </Button>
          </View>
        </ScrollView>
      </View>
      {visible && (
        <DialogAlert
          alertMessage={customHelperMessage}
          changeVisibility={setVisible}
        />
      )}
      {sendingHistory && (
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
  },
});

export default WorkshopServiceScreen;
