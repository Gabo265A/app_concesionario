import { useContext, useState, createContext, useEffect } from "react"
import firestore from '@react-native-firebase/firestore'

const vehicleContext = createContext()
const searchVehicle = createContext()
const isLoadingData = createContext()

export function useVehicleContext() {
    return useContext(vehicleContext)
}

export function useSearchVehicle() {
    return useContext(searchVehicle)
}

export function useIsLoadingData() {
    return useContext(isLoadingData)
}

export function VehicleContext(props) {

    const [catalog, setCatalog] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    async function searchVehicleFunction(keyword, setVehicles, showActivity) {
        showActivity(true)
        await getCatalog()
        const keywordArray = keyword.split(" ")
        vehiclesReturn = []
        catalog.filter(vehicle => {
            const vehicleInformation = vehicle.brand + ";" + vehicle.model + ";" + vehicle.year + ";" + vehicle.price + "" + vehicle.name;
            if (vehicleInformation.toLowerCase().includes(keyword.toLowerCase())) {
                vehiclesReturn.push(vehicle)
            } else {
                for (let i = 0; i < keywordArray.length; i++) {
                    if (vehicleInformation.toLowerCase().includes(keywordArray[i].toLowerCase())) {
                        vehiclesReturn.push(vehicle)
                        break;
                    }
                }
            }
        })
        if (vehiclesReturn.length > 0) {
            setVehicles(vehiclesReturn)
        } else {
            setVehicles([])
        }
        showActivity(false)
    }

    async function getCatalog() {
        try {
            setIsLoading(true)
            const catalogCollection = await firestore().collection('catalog').get()
            setCatalog(catalogCollection.docs.map((doc) => {
                const vehicle = doc.data();
                vehicle.id = doc.id;
                return vehicle;
            }))
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCatalog()
    }, [])

    return (
        <isLoadingData.Provider value={isLoading}>
            <searchVehicle.Provider value={searchVehicleFunction}>
                <vehicleContext.Provider value={catalog}>
                    {props.children}
                </vehicleContext.Provider>
            </searchVehicle.Provider>
        </isLoadingData.Provider>

    );
}