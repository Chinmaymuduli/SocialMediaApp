import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PrivateRoutesTypes} from './types';
import {TabLayout} from '../Layout';
import {Private} from '~/Screens';

const Stack = createNativeStackNavigator<PrivateRoutesTypes>();

type PrivateRouteProps = {
  initialRouteName?: keyof PrivateRoutesTypes;
};

export default function PrivateRoutes({initialRouteName}: PrivateRouteProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabLayout" component={TabLayout} />
      <Stack.Screen name="UserProfile" component={Private.UserProfile} />
      <Stack.Screen name="Settings" component={Private.Settings} />
      <Stack.Screen name="ChatDetails" component={Private.ChatDetails} />
      <Stack.Screen name="ContactUs" component={Private.ContactUs} />
      <Stack.Screen name="Meetings" component={Private.Meetings} />
      <Stack.Screen name="MyConnections" component={Private.MyConnections} />
      <Stack.Screen name="Notifications" component={Private.Notifications} />
      <Stack.Screen name="VerifyAadhar" component={Private.VerifyAadhar} />
      <Stack.Screen
        name="RequestConnections"
        component={Private.RequestConnections}
      />
      {/* Admin Panel */}
      <Stack.Screen name="AdminDashboard" component={Private.AdminDashboard} />
      <Stack.Screen name="AllComments" component={Private.AllComments} />
    </Stack.Navigator>
  );
}
