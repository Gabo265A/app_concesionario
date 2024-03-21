import React from 'react'
import VehicleList from './VehicleList'

const Catalog = () => {
    const vehicles = [
        {
            id: 1,
            imageUrl: 'https://www.honda-uni.mx/assets/1(5).0e895820.jpg',
            description: 'Honda Civic, 2024',
            price: 25000,
        },
        {
            id: 2,
            imageUrl: 'https://www.ford.com.co/content/ford/co/es_co/home/performance/raptor/jcr:content/par/brandgallery/image1/image.imgs.full.high.jpg/1683237578486.jpg',
            description: 'Ford F150 Raptor, 2021',
            price: 30000,
        },
        {
            id: 3,
            imageUrl: 'https://www.elpais.com.co/resizer/TpnuecqgL1IEg2s00soZooAklew=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/QQWIFH74OREP3ABYO4QBWPVSRI.jpg',
            description: 'Ford Mustang, 2020',
            price: 40000,
        },
    ];

    return <VehicleList vehicles={vehicles} />;
}

export default Catalog
