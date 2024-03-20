import AppointmentSchedule from './AppointmentSchedule'
import Catalog from './Catalog'
import ContactScreen from './ContactScreen'
import Offers from './Offers'
import QuotationRequestScreen from './QuotationRequestScreen'
import Search from './Search'
import ServiceHistory from './serviceHistory'
import WorkshopService from './workshopService'

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Buscar" component={Search} />
            <Drawer.Screen name="Solicitar prueba de manejo" component={AppointmentSchedule} />
            <Drawer.Screen name="Catálogo" component={Catalog} />
            <Drawer.Screen name="Solicitar cotización" component={QuotationRequestScreen} />
            <Drawer.Screen name="Servicio de taller" component={WorkshopService} />
            <Drawer.Screen name="Historial de servicios" component={ServiceHistory} />
            <Drawer.Screen name="Ofertas" component={Offers} />
            <Drawer.Screen name="Contacto" component={ContactScreen} />
        </Drawer.Navigator>
    );
}