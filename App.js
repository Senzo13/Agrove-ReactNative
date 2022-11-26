import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground, StyleSheet, Text, View, Platform } from 'react-native';
import Register from './screen/auth/register/register';
import Login from './screen//auth/login/login';
import GardenerData from './screen/mygardener/gardenerData';
import Home from './screen/home/Home';
import { db } from './store/services/firebase.services';
import { useEffect, useState, useRef } from 'react';
import { onValue, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Color from './theme/color';
import { Scan } from './screen/scaner/scan';
import Profil from './screen/profile/profil';
import Irrigation from './screen/irrigation/irrigation/irrigation';
import Team from './screen/team/team';
import { Capteur } from './screen/capteur/capteur';
import Contact from './components/team/contact';
import Configuration from './screen/config/configuration';
import { setGenerateLink } from './store/services/link.services';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import CustomModal from './components/popup/popup';
import IrrigationParam from './screen/irrigation/param/irrigationParam';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/configure.store';

const Stack = createNativeStackNavigator();
const auth = getAuth();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const url = Linking.useURL();

  // const url = Linking.getInitialURL();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);

    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  const [isLoged, setisLoged] = useState(false)
  useEffect(() => {
  }, []);


  if (url != null) {
    const { hostname, path, queryParams } = Linking.parse(url);
    const data = JSON.stringify(queryParams)
    if (typeof (queryParams.id) != 'undefined') {
      console.log(
        `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
          queryParams
        )}`
      );

      setGenerateLink(queryParams.id);
      if (auth.currentUser != null) {
        if (auth.currentUser.uid != null) {
          const userRef = ref(db, 'users/' + auth.currentUser.uid + '/link/')
          set(userRef, 'ok').then(() => {
            // console.log('link ok')
          }).catch((error) => {
            console.log(error)
          })
        }
      }

    }
  }

  // create getInitialURL function to get the initial URL when the app is opened
  // from a cold start
  // useEffect(() => {
  //   async function getInitialURL() {
  //     const initialURL = await Linking.getInitialURL();
  //     if (initialURL) {
  //       const { hostname, path, queryParams } = Linking.parse(initialURL);
  //       const data = JSON.stringify(queryParams)
  //       if(typeof(queryParams.name) != 'undefined') {
  //       console.log('type de data : ' + typeof(queryParams.name))
  //         console.log(
  //           `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
  //             queryParams
  //           )}`
  //         );
  //         console.log(queryParams.name + " " + queryParams.id)
  //         setGenerateLink(queryParams.name, queryParams.id);
  //     }
  // }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setisLoged(true)

    } else {
      // User is signed out
      setisLoged(false)
    }
  });

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
        <NavigationContainer>
          <Stack.Navigator name="App" >
            {!isLoged ? (<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />) : (<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />)}
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />

            <Stack.Screen name="Data" options={{
              headerStyle: {
                backgroundColor: Color.GREEN_AGROVE,
              },
              title: 'Données du capteur',
              headerTintColor: '#fff',
              headerBackTitleVisible: false
            }} component={GardenerData} />

            <Stack.Screen name='Scan' component={Scan} options={{
              headerStyle: {
                backgroundColor: Color.GREEN_AGROVE,
              },
              title: 'Scan QR Code',
              headerTintColor: '#fff',
              headerBackTitleVisible: false
            }} />
            <Stack.Screen name='Capteur' component={Capteur} options={{
              headerStyle: {
                backgroundColor: Color.GREEN_AGROVE,
              },
              title: 'Capteur',
              headerTintColor: '#fff',
              headerBackTitleVisible: false
            }} />
            <Stack.Screen name='Contact' component={Contact} options={{
              headerStyle: {
                backgroundColor: Color.GREEN_AGROVE,
              },
              title: 'Contact',
              headerTintColor: '#fff',
              headerBackTitleVisible: false
            }} />
            <Stack.Screen name='Profil' component={Profil} options={{
              headerStyle: {
                backgroundColor: Color.GREEN_AGROVE,
              },
              title: 'Profil',
              headerTintColor: '#fff',
              headerBackTitleVisible: false
            }} />
            <Stack.Screen name='Irrigation' component={Irrigation} options={{
              headerStyle: {
                backgroundColor: Color.GREEN_AGROVE,
              },
              title: 'Irrigation',
              headerTintColor: '#fff',
              headerBackTitleVisible: false
            }} />
            <Stack.Screen name='Team' component={Team} options={{
              headerShown: false
            }} />
            <Stack.Screen name='Configuration' component={Configuration} options={{
              headerShown: false
            }} />
            <Stack.Screen name='IrrigationParam' component={IrrigationParam} options={{
              headerStyle: {
                backgroundColor: Color.GREEN_AGROVE,
              },
              title: 'Arrosage',
              headerTintColor: '#fff',
              headerBackTitleVisible: false
            }} />
          </Stack.Navigator>

        </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  back: {
    flex: 1,
  }
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      //alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
    set(ref(db, 'users/' + auth.currentUser.uid + '/token'), token)
  } else {
    //alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
