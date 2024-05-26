import React, { useState } from 'react';
import PrivateRoutes from './Routes/Private';
import PublicRoutes from './Routes/Public';
import { useAppContext } from './Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBasicFunction from './Hooks/useBasicFunctions';
import { SplashScreen } from './Screens/Public';

const Route = () => {
  const [token, setToken] = React.useState<string | null>();
  const { getUser } = useBasicFunction();
  const { isLoggedIn, setIsLoggedIn, userData } = useAppContext();
  const getAuthStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      console.log({ value });
      if (value === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log('error', e);
    }
  };
  React.useEffect(() => {
    getAuthStatus();
    getUser();
  }, [isLoggedIn]);
  React.useEffect(() => {
    const getTokenData = async () => {
      try {
        const value = await AsyncStorage.getItem('accessToken');
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        console.log('error', e);
      }
    };
    getTokenData();
  }, []);

  console.log({ userData });

  if (userData === null) return <SplashScreen />;
  return userData?._id ? (
    <PrivateRoutes
      initialRouteName={
        userData?.is_profile_completed ? 'TabLayout' : 'CompleteProfile'
      }
    />
  ) : (
    <PublicRoutes />
  );
};

export default Route;
