import AppointmentSchedule from '../screens/AppointmentSchedule';
import VehicleList from '../screens/VehicleList';
import ContactScreen from '../screens/ContactScreen';
import Offers from '../screens/Offers';
import QuotationRequestScreen from '../screens/QuotationRequestScreen';
import Search from '../screens/Search';
import ServiceHistory from '../screens/serviceHistory';
import WorkshopService from '../screens/workshopService';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Register from '../screens/Register';
import UserProfile from '../screens/UserProfile';

import React, {useEffect, useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Drawer as DrawerPaper,
  Text,
  IconButton,
  Divider,
  Button,
} from 'react-native-paper';
import {BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

//Contexts
import UserContext from '../context/users/UserContext';
import BottomBarContext from '../context/BottomBar/BottomBarContext';
import ActiveContext from '../context/ActiveContext/ActiveContext';

//States
import VehicleState from '../context/vehicles/VehicleState';
import ServiceHistoryState from '../context/serviceHistory/ServiceHistoryState';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {setIsDrawerOpen} = useContext(BottomBarContext);
  const {setActiveScreen, activeScreen} = useContext(ActiveContext);
  const drawerIsOpen = props.navigation.getState().history;
  useEffect(() => {
    if (drawerIsOpen[1] && drawerIsOpen[1].status === 'open') {
      setIsDrawerOpen(true);
    } else if (!drawerIsOpen[2]) {
      setIsDrawerOpen(false);
    }
  }, [drawerIsOpen]);
  const {userData, didTryAutoLogin, Logout} = useContext(UserContext);

  useEffect(() => {
    const backAction = () => {
      if (activeScreen !== 'home') {
        setActiveScreen('home');
        props.navigation.navigate('Inicio');
        return true; // Esto previene que la app se cierre
      }
      // Si la pantalla activa es 'Inicio', permite que el comportamiento por defecto del botón de retroceso se ejecute
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Limpia el listener al desmontar el componente
  }, [activeScreen]); // Se ejecuta cada vez que 'active' cambia

  return (
    <ScrollView
      contentContainerStyle={{
        width: 'auto',
        height: '100%',
      }}>
      <SafeAreaView
        style={{
          top: 5,
          height: '25%',
          with: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBotonColor: '#f4f4f4',
          borderBotonWidth: 1,
          marginBottom: 10,
        }}>
        <IconButton
          size={100}
          icon="account"
          onPress={() => {
            if (didTryAutoLogin) {
              props.navigation.navigate('userProfile');
              setActiveScreen('userProfile');
            } else {
              props.navigation.navigate('Welcome');
              setActiveScreen('Welcome');
            }
          }}
          style={{
            borderColor: '#e7e6e6',
            borderWidth: 2,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#111',
          }}>
          Bienvenido/a
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            width: '80%',
            color: '#111',
          }}>
          {didTryAutoLogin
            ? userData.fullName
            : 'Identíficate para una mejor experiencia'}
        </Text>
      </SafeAreaView>
      <Divider
        style={{
          backgroundColor: '#663399',
          width: '95%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 1.2,
        }}
      />
      <ScrollView>
        <SafeAreaView style={{height: '100%', width: 'auto'}}>
          <DrawerPaper.Section style={{border: 'none'}} showDivider={false}>
            <DrawerPaper.Item
              icon="home"
              label="Inicio"
              active={activeScreen === 'home'}
              onPress={() => {
                setActiveScreen('home');
                props.navigation.navigate('home');
              }}
              style={{marginTop: 8}}
            />
            <DrawerPaper.Item
              icon="magnify"
              label="Buscar vehículo"
              active={activeScreen === 'vehicleSearch'}
              onPress={() => {
                props.navigation.navigate('vehicleSearch');
                setActiveScreen('vehicleSearch');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="steering"
              label="Solicitar prueba de manejo"
              active={activeScreen === 'appointmentSchedule'}
              onPress={() => {
                props.navigation.navigate('appointmentSchedule');
                setActiveScreen('appointmentSchedule');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="shopping-search"
              label="Ver catálogo"
              active={activeScreen === 'catalog'}
              onPress={() => {
                props.navigation.navigate('catalog');
                setActiveScreen('catalog');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="currency-usd"
              label="Solicitar cotización"
              active={activeScreen === 'quotationRequestScreen'}
              onPress={() => {
                props.navigation.navigate('quotationRequestScreen');
                setActiveScreen('quotationRequestScreen');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="car-cog"
              label="Solicitar servicio de taller"
              active={activeScreen === 'workshopService'}
              onPress={() => {
                props.navigation.navigate('workshopService');
                setActiveScreen('workshopService');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="history"
              label="Historial de servicios"
              active={activeScreen === 'serviceHistory'}
              onPress={() => {
                props.navigation.navigate('serviceHistory');
                setActiveScreen('serviceHistory');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="offer"
              label="Activar ofertas"
              active={activeScreen === 'offers'}
              onPress={() => {
                props.navigation.navigate('offers');
                setActiveScreen('offers');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="contacts"
              label="Medios de contacto"
              active={activeScreen === 'contact'}
              onPress={() => {
                props.navigation.navigate('contact');
                setActiveScreen('contact');
              }}
              style={{marginTop: 5, marginBottom: 5}}
            />
          </DrawerPaper.Section>
        </SafeAreaView>
      </ScrollView>
      <Divider
        style={{
          backgroundColor: '#663399',
          width: '95%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: 1,
        }}
      />
      <SafeAreaView
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 5,
          height: '10%',
        }}>
        <Button
          icon={didTryAutoLogin ? 'logout' : 'login'}
          mode="contained"
          style={{}}
          onPress={() => {
            if (didTryAutoLogin) {
              Logout();
              setActiveScreen('home');
              props.navigation.navigate('home');
            } else {
              props.navigation.navigate('Welcome');
              setActiveScreen('Welcome');
            }
          }}>
          {didTryAutoLogin ? 'Cerrar sesión' : 'Iniciar sesión'}
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="vehicleSearch"
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}>
        {props => (
          <VehicleState>
            <Search {...props} />
          </VehicleState>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="appointmentSchedule"
        component={AppointmentSchedule}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="catalog"
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}>
        {props => (
          <VehicleState>
            <VehicleList {...props} />
          </VehicleState>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="quotationRequestScreen"
        component={QuotationRequestScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="workshopService"
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}>
        {props => (
          <ServiceHistoryState>
            <WorkshopService {...props} />
          </ServiceHistoryState>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="serviceHistory"
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}>
        {props => (
          <ServiceHistoryState>
            <ServiceHistory {...props} />
          </ServiceHistoryState>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="offers"
        component={Offers}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="contact"
        component={ContactScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="SignIn"
        component={Login}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="SignUp"
        component={Register}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="userProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
}
