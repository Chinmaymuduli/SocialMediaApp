import {useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMutation from './useMutation';
import {Alert, Platform} from 'react-native';
import {CustomToast} from '~/Components/core';

const useFCMToken = () => {
  const {mutation} = useMutation();
  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    console.log({authStatus});
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log({enabled});
    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log(authStatus);
    }
  }, []);
  const getFCMToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const fcmToken = await messaging().getToken();
      if (!fcmToken) return console.log("user doesn't have a device token yet");
      console.log('FCM Token:', fcmToken);
      const data: any = {};
      if (Platform.OS === 'android') data.android = fcmToken;
      if (Platform.OS === 'ios') data.ios = fcmToken;
      //update token to api
      const res = await mutation(`users/self/update`, {
        method: 'PUT',
        body: {fcm_tokens: data},
      });
      // console.log({res});
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('message ', JSON.stringify(remoteMessage));
      const notificationData = JSON.parse(JSON.stringify(remoteMessage));
      Alert.alert(
        notificationData?.notification?.title,
        notificationData?.notification?.body,
      );
    });
    return unsubscribe;
  }, [getFCMToken, requestUserPermission]);
};

export default useFCMToken;
