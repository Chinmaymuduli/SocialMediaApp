import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Auth, Public} from '~/Screens';
import {PublicRoutesTypes} from './types';

const Stack = createNativeStackNavigator<PublicRoutesTypes>();

type PublicRouteProps = {
  initialRouteName?: keyof PublicRoutesTypes;
};

export default function PublicRoutes({
  initialRouteName = 'AuthScreen',
}: PublicRouteProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthScreen" component={Auth.AuthScreen} />
      <Stack.Screen name="AuthRoute" component={Auth.AuthRoute} />
      <Stack.Screen name="GoogleAuth" component={Auth.GoogleAuth} />
      <Stack.Screen name="Login" component={Auth.Login} />
      <Stack.Screen name="SignUp" component={Auth.SignUp} />
      <Stack.Screen name="OtpScreen" component={Auth.OtpScreen} />
    </Stack.Navigator>
  );
}
