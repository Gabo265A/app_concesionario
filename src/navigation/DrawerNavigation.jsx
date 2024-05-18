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

import React, {useState, useEffect, useContext} from 'react';
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

//Contexts
import {VehicleContext} from '../context/vehicles/vehicleContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserContext from '../context/users/UserContext';

import BottomBarContext from '../context/BottomBar/BottomBarContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {setIsDrawerOpen} = useContext(BottomBarContext);
  const drawerIsOpen = props.navigation.getState().history;
  useEffect(() => {
    if (drawerIsOpen[1] && drawerIsOpen[1].status === 'open') {
      setIsDrawerOpen(true);
    } else if (!drawerIsOpen[2]) {
      setIsDrawerOpen(false);
    }
  }, [drawerIsOpen]);
  const {userData, didTryAutoLogin, Logout} = useContext(UserContext);
  const [active, setActive] = useState('first'); //Estado para guardar la pantalla activa
  useEffect(() => {
    const backAction = () => {
      if (active !== 'first') {
        setActive('first');
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
  }, [active]); // Se ejecuta cada vez que 'active' cambia

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
            didTryAutoLogin
              ? console.log('Crear screen del profile')
              : props.navigation.navigate('Welcome');
            setActive('tenth');
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
              active={active === 'first'}
              onPress={() => {
                setActive('first');
                props.navigation.navigate('Inicio');
              }}
              style={{marginTop: 8}}
            />
            <DrawerPaper.Item
              icon="magnify"
              label="Buscar vehículo"
              active={active === 'second'}
              onPress={() => {
                props.navigation.navigate('Buscar');
                setActive('second');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="steering"
              label="Prueba de manejo"
              active={active === 'third'}
              onPress={() => {
                props.navigation.navigate('Solicitar prueba de manejo');
                setActive('third');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="shopping-search"
              label="Catálogo"
              active={active === 'fourth'}
              onPress={() => {
                props.navigation.navigate('Catálogo');
                setActive('fourth');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="currency-usd"
              label="Cotización"
              active={active === 'fifth'}
              onPress={() => {
                props.navigation.navigate('Solicitar cotización');
                setActive('fifth');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="car-cog"
              label="Servicio de taller"
              active={active === 'sixth'}
              onPress={() => {
                props.navigation.navigate('Servicio de taller');
                setActive('sixth');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="history"
              label="Historial de servicios"
              active={active === 'seventh'}
              onPress={() => {
                props.navigation.navigate('Historial de servicios');
                setActive('seventh');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="offer"
              label="Ofertas"
              active={active === 'eighth'}
              onPress={() => {
                props.navigation.navigate('Ofertas');
                setActive('eighth');
              }}
              style={{marginTop: 5}}
            />
            <DrawerPaper.Item
              icon="contacts"
              label="Contacto"
              active={active === 'ninth'}
              onPress={() => {
                props.navigation.navigate('Contacto');
                setActive('ninth');
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
            {
              didTryAutoLogin ? Logout() : props.navigation.navigate('Welcome');
              setActive('tenth');
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
        name="Inicio"
        component={Home}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Buscar"
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}>
        {props => (
          <VehicleContext>
            <Search {...props} />
          </VehicleContext>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Solicitar prueba de manejo"
        component={AppointmentSchedule}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Catálogo"
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}>
        {props => (
          <VehicleContext>
            <VehicleList {...props} />
          </VehicleContext>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Solicitar cotización"
        component={QuotationRequestScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Servicio de taller"
        component={WorkshopService}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Historial de servicios"
        component={ServiceHistory}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Ofertas"
        component={Offers}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Contacto"
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
    </Drawer.Navigator>
  );
}
