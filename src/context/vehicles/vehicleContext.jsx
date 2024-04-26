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
        let exactMatches = []
        let partialMatches = []
        let isExactMatchFound = false
        for (const vehicle of catalog) {
            if (vehicle.name.toLowerCase() === keyword.toLowerCase()) {
                exactMatches.push(vehicle)
                isExactMatchFound = true
                break
            } else {
                for (let i = 0; i < keywordArray.length; i++) {
                    if (vehicle.brand == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    } else if (vehicle.model == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    } else if (vehicle.year == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    } else if (vehicle.price == (keywordArray[i].toLowerCase())) {
                        partialMatches.push(vehicle)
                        break
                    }
                }
            }
        }

        setVehicles(isExactMatchFound ? exactMatches : partialMatches)
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