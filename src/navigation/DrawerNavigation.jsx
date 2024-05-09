import AppointmentSchedule from '../screens/AppointmentSchedule';
import VehicleList from '../screens/VehicleList';
import ContactScreen from '../screens/ContactScreen';
import Offers from '../screens/Offers';
import QuotationRequestScreen from '../screens/QuotationRequestScreen';
import Search from '../screens/Search';
import ServiceHistory from '../screens/serviceHistory';
import WorkshopService from '../screens/workshopService';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';

import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Drawer as DrawerPaper,
  Text,
  Avatar,
  Divider,
  Button,
} from 'react-native-paper';
import {BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

//Contexts
import {VehicleContext} from '../context/vehicles/vehicleContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
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
          height: '25%',
          with: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBotonColor: '#f4f4f4',
          borderBotonWidth: 1,
          marginBottom: 10,
        }}>
        <Avatar.Icon
          size={100}
          icon="folder"
          onPress={() => console.log('arroz')}
          onPointerDown={() => console.log('arroz')}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 6,
            color: '#111',
          }}></Text>
      </SafeAreaView>
      <Divider
        style={{
          backgroundColor: '#850CD7',
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
          backgroundColor: '#850CD7',
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
          icon="login"
          mode="contained"
          style={{}}
          onPress={() => {
            props.navigation.navigate('Bienvenida');
            setActive('tenth');
          }}>
          Identíficate
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
          unmountOnBlur: true,
          title: 'Inicio',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Buscar"
        options={{
          unmountOnBlur: true,
          title: 'Buscar vehículos',
          headerTitleAlign: 'center',
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
          unmountOnBlur: true,
          title: 'Solicitar prueba',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Catálogo"
        options={{
          unmountOnBlur: true,
          title: 'Catálogo',
          headerTitleAlign: 'center',
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
          unmountOnBlur: true,
          title: 'Cotiza tu vehículo',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Servicio de taller"
        component={WorkshopService}
        options={{
          unmountOnBlur: true,
          title: 'Taller',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Historial de servicios"
        component={ServiceHistory}
        options={{
          unmountOnBlur: true,
          title: 'Historial',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Ofertas"
        component={Offers}
        options={{
          unmountOnBlur: true,
          title: 'Ofertas',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactScreen}
        options={{
          unmountOnBlur: true,
          title: 'Contáctanos',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Bienvenida"
        component={Welcome}
        options={{
          unmountOnBlur: true,
          title: 'Bienvenidos',
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
}
