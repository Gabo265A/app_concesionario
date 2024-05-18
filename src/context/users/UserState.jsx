import React, {useReducer} from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import firebase from '../../firebase/firebase';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserState = props => {
  const initialState = {
    didTryAutoLogin: false,
    userData: null,
    token: null,
  };

  const signUp = (fullName, email, password) => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const {uid, stsTokenManager} = user;
        const {accessToken, expirationTime} = stsTokenManager;
        const expirationDate = new Date(expirationTime);
        const userData = createUser(fullName, email, uid);
        dispatch({
          type: 'SIGNUP',
          payload: {userData: userData, token: accessToken},
        });
        createUser(fullName, email, uid);
        //saveDataToStorage(accessToken, uid, expirationDate);
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };

  const createUser = (fullName, email, uid) => {
    const signUpDate = new Date().toISOString().split('T')[0];
    const userData = {
      fullName,
      email,
      uid,
      signUpDate,
    };
    firebase.db.collection('usuarios').doc(uid).set(userData);
    return userData;
  };

  const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString(),
      }),
    );
  };

  const Logout = () => {
    AsyncStorage.removeItem('userData');
    dispatch({type: 'LOGOUT'});
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        userData: state.userData,
        didTryAutoLogin: state.didTryAutoLogin,
        token: state.token,
        firebase,
        signUp,
        Logout,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
