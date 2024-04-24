import { useContext, useState, createContext } from "react"
import firestore from '@react-native-firebase/firestore'

const vehicleContext = createContext()
const getCatalogList = createContext()
const searchVehicle = createContext()

export function useVehicleContext() {
    return useContext(vehicleContext)
}

export function useGetCatalogList() {
    return useContext(getCatalogList)
}

export function useSearchVehicle() {
    return useContext(searchVehicle)
}

export function VehicleContext(props) {

    const [catalog, setCatalog] = useState([])

    function searchVehicleFunction(name, brand, year, price) {
        if (name === '' && brand === '' && year === 'Año' && price === '') {
            return "No deje campos vacíos"
        } else {
            let vehicles = catalog.filter(vehicle => {
                if (vehicle.name.toLowerCase().includes(name.toLowerCase())) {
                    vehicles.push(vehicle)
                }
                else if (vehicle.brand.toLowerCase().includes(brand.toLowerCase())) {
                    vehicles.push(vehicle)
                }
                else if (vehicle.price - 20000000 <= price && vehicle.price + 20000000 >= price) {
                    vehicles.push(vehicle)
                }
                else if (vehicle.year.includes(year)) {
                    vehicles.push(vehicle)
                }
            })
            return "vehicles"
        }
    }

    async function getCatalog() {
        try {
            const catalogCollection = await firestore().collection('catalog').get()
            setCatalog(catalogCollection.docs.map((doc) => {
                const vehicle = doc.data();
                vehicle.id = doc.id;
                return vehicle;
            }))

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <searchVehicle.Provider value={searchVehicleFunction}>
            <getCatalogList.Provider value={getCatalog}>
                <vehicleContext.Provider value={catalog}>
                    {props.children}
                </vehicleContext.Provider>
            </getCatalogList.Provider >
        </searchVehicle.Provider>

    );
}