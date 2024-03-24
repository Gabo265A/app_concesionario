import React from 'react'
import VehicleList from './VehicleList'

// Icons names
const iconSportsCar = 'car-sports';
const iconPickupCar = 'car-pickup';

const Catalog = () => {
    const vehicles = [
        {
            id: 1,
            imageUrl: 'https://www.autosrodando.com/wp-content/uploads/2023/10/honda-civic-hibrido-2024-02-1280x720.jpg',
            description: 'Desempeño y elegancia, es lo que necesitas al conducir un sedán que siendo tan emblemático y con 10 generaciones detrás, sabe lo que es llegar lejos.',
            price: 25000,
            name: 'Honda Civic, 2024',
            iconCar: iconSportsCar,
        },
        {
            id: 2,
            imageUrl: 'https://www.ford.com.co/content/ford/co/es_co/home/performance/raptor/jcr:content/par/brandgallery/image1/image.imgs.full.high.jpg/1683237578486.jpg',
            description: 'Pura potencia con un exterior resistente y agresivo. Completamente rediseñado, el frente distintivo enfatiza el ancho de la camioneta con un aspecto rudo y audaz.',
            price: 30000,
            name: 'Ford F150 Raptor, 2021',
            iconCar: iconPickupCar,
        },
        {
            id: 3,
            imageUrl: 'https://www.elpais.com.co/resizer/TpnuecqgL1IEg2s00soZooAklew=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/QQWIFH74OREP3ABYO4QBWPVSRI.jpg',
            description: 'El Ford Mustang 2020 es un gran ejemplo de cómo una empresa puede mantener un automóvil icónico funcionando bien y haciéndose un nombre en la era moderna.',
            price: 40000,
            name: 'Ford Mustang, 2020',
            iconCar: iconSportsCar,
        },
    ];

    return <VehicleList vehicles={vehicles} />;
}

export default Catalog
