import {useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFCMToken = () => {
  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }, []);
  const getFCMToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const fcmToken = await messaging().getToken();
      if (!fcmToken) return console.log("user doesn't have a device token yet");
      console.log('FCM Token:', fcmToken);
      const data: any = {
        token,
      };
      //   if (Platform.OS === 'android') data.androidToken = fcmToken;
      //   if (Platform.OS === 'ios') data.iosToken = fcmToken;
      //   await updateToken(data);
      //update token to api
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('message ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [getFCMToken, requestUserPermission]);
};

export default useFCMToken;
