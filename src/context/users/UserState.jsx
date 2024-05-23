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
    isLoading: false,
  };

  const signUp = async (fullName, email, password) => {
    dispatch({type: 'SET_LOADING_START'});
    return createUserWithEmailAndPassword(getAuth(), email, password)
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
        dispatch({type: 'SET_LOADING_FINISH'});
        return [
          'success',
          'Usuario creado correctamente, en unos segundos serás redirigido a la pantalla principal.',
        ];
        //saveDataToStorage(accessToken, uid, expirationDate);
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING_FINISH'});
        return ['error', error.message];
      });
  };

  const createUser = (fullName, email, uid) => {
    const signUpDate = new Date().toISOString().split('T')[0];
    const userData = {
      fullName,
      email,
      uid,
      signUpDate,
      userImage: 'Sin foto de perfil',
      offersEnable: false,
    };
    firebase.db.collection('users').doc(uid).set(userData);
    return userData;
  };

  const signIn = async (email, password) => {
    dispatch({type: 'SET_LOADING_START'});
    return signInWithEmailAndPassword(getAuth(), email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const {uid, stsTokenManager} = user;
        const {accessToken, expirationTime} = stsTokenManager;
        const expirationDate = new Date(expirationTime);
        getUserData(uid, accessToken);
        dispatch({type: 'SET_LOADING_FINISH'});

        //saveDataToStorage(accessToken, uid, expirationDate);
        return [
          'success',
          'Inicio de sesión correcto, en unos segundos serás redirigido a la pantalla principal.',
        ];
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING_FINISH'});
        console.log(error.code, error.message);
        if (
          error.code === 'auth/invalid-credential' ||
          error.code === 'auth/missing-password' ||
          error.code === 'auth/invalid-email'
        ) {
          return ['wrongCredentials', 'Correo o contraseña inválidos.'];
        } else {
          console.log('asffasdasd');
        }
        return ['error', error.message];
      });
  };

  const getUserData = async (uid, accessToken) => {
    let usuario = [];
    await firebase.db.collection('users').get().then(querySnapshot);

    function querySnapshot(snapshot) {
      usuario = snapshot.docs
        .filter(doc => doc.data().uid === uid)
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      const userData = {
        fullName: usuario[0].fullName,
        email: usuario[0].email,
        uid: usuario[0].uid,
        signUpDate: usuario[0].signUpDate,
        userImage: usuario[0].userImage,
        offersEnable: usuario[0].offersEnable,
      };
      dispatch({
        type: 'SIGNIN',
        payload: {userData: userData, token: accessToken},
      });
    }
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

  const ChangeOffersStatus = async (uid, offersEnable) => {
    await firebase.db.collection('users').doc(uid).update({
      offersEnable: offersEnable,
    });
    dispatch({type: 'CHANGE_OFFERS_STATUS', payload: {offersEnable}});
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        userData: state.userData,
        didTryAutoLogin: state.didTryAutoLogin,
        token: state.token,
        isLoading: state.isLoading,
        firebase,
        signUp,
        signIn,
        Logout,
        ChangeOffersStatus,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
