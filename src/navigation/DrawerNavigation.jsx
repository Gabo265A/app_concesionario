import AppointmentSchedule from '../components/AppointmentSchedule'
import Catalog from '../components/Catalog'
import ContactScreen from '../components/ContactScreen'
import Offers from '../components/Offers'
import QuotationRequestScreen from '../components/QuotationRequestScreen'
import Search from '../components/Search'
import ServiceHistory from '../components/serviceHistory'
import WorkshopService from '../components/workshopService'
import Home from '../components/Home'

import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer as DrawerPaper } from 'react-native-paper';
import { BackHandler } from 'react-native';

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

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Limpia el listener al desmontar el componente
    }, [active]); // Se ejecuta cada vez que 'active' cambia

    return (
        <DrawerPaper.Section title="Menú">
            <DrawerPaper.Item
                icon="home"
                label="Inicio"
                active={active === 'first'}
                onPress={() => {
                    setActive('first');
                    props.navigation.navigate('Inicio');
                }}
            />
            <DrawerPaper.Item
                icon="magnify"
                label="Buscar vehículo"
                active={active === 'second'}
                onPress={() => {
                    props.navigation.navigate('Buscar');
                    setActive('second');
                }}
            />
            <DrawerPaper.Item
                icon="steering"
                label="Prueba de manejo"
                active={active === 'third'}
                onPress={() => {
                    props.navigation.navigate('Solicitar prueba de manejo');
                    setActive('third');
                }}
            />
            <DrawerPaper.Item
                icon="shopping-search"
                label="Catálogo"
                active={active === 'fourth'}
                onPress={() => {
                    props.navigation.navigate('Catálogo');
                    setActive('fourth');
                }}
            />
            <DrawerPaper.Item
                icon="currency-usd"
                label="Cotización"
                active={active === 'fifth'}
                onPress={() => {
                    props.navigation.navigate('Solicitar cotización');
                    setActive('fifth');
                }}
            />
            <DrawerPaper.Item
                icon="car-cog"
                label="Servicio de taller"
                active={active === 'sixth'}
                onPress={() => {
                    props.navigation.navigate('Servicio de taller');
                    setActive('sixth');
                }}
            />
            <DrawerPaper.Item
                icon="history"
                label="Historial de servicios"
                active={active === 'seventh'}
                onPress={() => {
                    props.navigation.navigate('Historial de servicios');
                    setActive('seventh');
                }}
            />
            <DrawerPaper.Item
                icon="offer"
                label="Ofertas"
                active={active === 'eighth'}
                onPress={() => {
                    props.navigation.navigate('Ofertas');
                    setActive('eighth');
                }}
            />
            <DrawerPaper.Item
                icon="contacts"
                label="Contacto"
                active={active === 'ninth'}
                onPress={() => {
                    props.navigation.navigate('Contacto');
                    setActive('ninth');
                }}
            />
        </DrawerPaper.Section>
    );
}


export function DrawerNavigation() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Inicio" component={Home} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Buscar" component={Search} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Solicitar prueba de manejo" component={AppointmentSchedule} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Catálogo" component={Catalog} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Solicitar cotización" component={QuotationRequestScreen} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Servicio de taller" component={WorkshopService} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Historial de servicios" component={ServiceHistory} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Ofertas" component={Offers} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Contacto" component={ContactScreen} options={{ unmountOnBlur: true }} />
        </Drawer.Navigator>
    );
}