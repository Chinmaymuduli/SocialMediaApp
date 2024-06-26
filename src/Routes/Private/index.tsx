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
      <Stack.Screen name="Reviews" component={Private.Reviews} />
      <Stack.Screen name="Meetings" component={Private.Meetings} />
      <Stack.Screen name="MyConnections" component={Private.MyConnections} />
      <Stack.Screen name="Notifications" component={Private.Notifications} />
      <Stack.Screen name="VerifyAadhar" component={Private.VerifyAadhar} />
      <Stack.Screen name="UserAllPhotos" component={Private.UserAllPhotos} />
      <Stack.Screen
        name="RequestConnections"
        component={Private.RequestConnections}
      />
      {/* Admin Panel */}
      <Stack.Screen name="AdminDashboard" component={Private.AdminDashboard} />
      <Stack.Screen name="AllComments" component={Private.AllComments} />
      <Stack.Screen name="AgoraVoiceCall" component={Private.AgoraVoiceCall} />
      <Stack.Screen name="SearchScreen" component={Private.SearchScreen} />
      <Stack.Screen name="MyProfile" component={Private.MyProfile} />
      <Stack.Screen
        name="CompleteProfile"
        component={Private.CompleteProfile}
      />
      <Stack.Screen
        name="SocialInteractions"
        component={Private.SocialInteractions}
      />
      <Stack.Screen
        name="RetentionAndChurnMetrics"
        component={Private.RetentionAndChurnMetrics}
      />
      <Stack.Screen name="PopularReels" component={Private.PopularReels} />
      <Stack.Screen name="UserEngagement" component={Private.UserEngagement} />
      <Stack.Screen name="UserFeedback" component={Private.UserFeedback} />
      <Stack.Screen name="RevenueMetrics" component={Private.RevenueMetrics} />
      <Stack.Screen
        name="TechnicalMetrics"
        component={Private.TechnicalMetrics}
      />
      <Stack.Screen
        name="DemographicMetrics"
        component={Private.DemographicMetrics}
      />
      <Stack.Screen
        name="AcquisitionMetrics"
        component={Private.AcquisitionMetrics}
      />
      <Stack.Screen
        name="SentConnections"
        component={Private.SentConnections}
      />
      <Stack.Screen
        name="ShareScreenDetails"
        component={Private.ShareScreenDetails}
      />
      <Stack.Screen name="MoreOptions" component={Private.MoreOptions} />
      <Stack.Screen
        name="RevenueMetricsAllUsers"
        component={Private.RevenueMetricsAllUsers}
      />
      <Stack.Screen name="AllMyConnect" component={Private.AllMyConnect} />
    </Stack.Navigator>
  );
}
