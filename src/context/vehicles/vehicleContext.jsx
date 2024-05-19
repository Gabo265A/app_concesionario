import {useContext, useState, createContext, useEffect} from 'react';
import firebase from '../../firebase/firebase';
import _ from 'lodash';

const vehicleContext = createContext();
const searchVehicle = createContext();
const isLoadingData = createContext();

export function useVehicleContext() {
  return useContext(vehicleContext);
}

export function useSearchVehicle() {
  return useContext(searchVehicle);
}

export function useIsLoadingData() {
  return useContext(isLoadingData);
}

export function VehicleContext(props) {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function searchVehicleFunction(keyword, setVehicles, showActivity) {
    showActivity(true);
    getCatalog();
    const keywordArray = keyword.split(' ');
    let exactMatches = [];
    let partialMatches = [];
    let isExactMatchFound = false;
    for (const vehicle of catalog) {
      if (vehicle.name.toLowerCase() === keyword.toLowerCase()) {
        exactMatches.push(vehicle);
        isExactMatchFound = true;
        break;
      } else {
        for (let i = 0; i < keywordArray.length; i++) {
          if (vehicle.brand == keywordArray[i].toLowerCase()) {
            partialMatches.push(vehicle);
            break;
          } else if (vehicle.model == keywordArray[i].toLowerCase()) {
            partialMatches.push(vehicle);
            break;
          } else if (vehicle.year == keywordArray[i].toLowerCase()) {
            partialMatches.push(vehicle);
            break;
          } else if (vehicle.price == keywordArray[i].toLowerCase()) {
            partialMatches.push(vehicle);
            break;
          }
        }
      }
    }

    setVehicles(isExactMatchFound ? exactMatches : partialMatches);
    showActivity(false);
  }

  function getCatalog() {
    setIsLoading(true);
    firebase.db.collection('catalog').onSnapshot(querySnapshot);

    function querySnapshot(snapshot) {
      let catalog = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      catalog = _.sortBy(catalog, 'yearScrollView');

      setCatalog(catalog);

      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCatalog();
  }, []);

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
