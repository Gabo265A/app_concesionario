import AppointmentSchedule from '../components/AppointmentSchedule'
import Catalog from '../components/Catalog'
import ContactScreen from '../components/ContactScreen'
import Offers from '../components/Offers'
import QuotationRequestScreen from '../components/QuotationRequestScreen'
import Search from '../components/Search'
import ServiceHistory from '../components/serviceHistory'
import WorkshopService from '../components/workshopService'

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Solicitar cotización" component={QuotationRequestScreen} />
            <Drawer.Screen name="Buscar" component={Search} />
            <Drawer.Screen name="Solicitar prueba de manejo" component={AppointmentSchedule} />
            <Drawer.Screen name="Catálogo" component={Catalog} />
            <Drawer.Screen name="Servicio de taller" component={WorkshopService} />
            <Drawer.Screen name="Historial de servicios" component={ServiceHistory} />
            <Drawer.Screen name="Ofertas" component={Offers} />
            <Drawer.Screen name="Contacto" component={ContactScreen} />
        </Drawer.Navigator>
    );
}