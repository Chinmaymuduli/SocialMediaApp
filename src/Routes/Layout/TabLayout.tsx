import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Private} from '~/Screens';
import AppIcon from '~/Components/core/AppIcon';
import {COLORS} from '~/Styles';
import {useAppContext} from '~/Contexts';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const {userData} = useAppContext();
  console.log({userData});
  const TabArr: any = useMemo(
    () => [
      ...(userData?.role === 'admin'
        ? [
            {
              route: 'AdminDashboard',
              label: 'Dashboard',
              icon: {
                MaterialIconsName: 'dashboard',
              },
              component: Private.AdminDashboard,
            },
            {
              route: 'AllUsers',
              label: 'All Users',
              icon: {
                MaterialIconsName: 'people',
              },
              component: Private.AllUsers,
            },
            {
              route: 'AllMeetings',
              label: 'Meetings',
              icon: {
                FontAwesomeName: 'meetup',
              },
              component: Private.AllMeetings,
            },
            {
              route: 'AllPayments',
              label: 'Payments',
              icon: {
                MaterialIconsName: 'payments',
              },
              component: Private.AllPayments,
            },
          ]
        : [
            {
              route: 'Feeds',
              label: 'Feeds',
              icon: {
                AntDesignName: 'instagram',
              },
              component: Private.Feeds,
            },
            {
              route: 'Post',
              label: 'Post',
              icon: {
                MaterialIconsName: 'shop',
              },
              component: Private.Post,
            },
            {
              route: 'Messages',
              label: 'Messages',
              icon: {
                MaterialIconsName: 'chat',
              },
              component: Private.Messages,
            },
            {
              route: 'Profile',
              label: 'Profile',
              icon: {
                MaterialIconsName: 'person-4',
              },
              component: Private.Profile,
            },
          ]),
    ],
    [userData?.role],
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {fontFamily: 'Montserrat-Bold'},
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          height: 50,
          position: 'absolute',
          backgroundColor: 'white',
        },
      }}
      sceneContainerStyle={{backgroundColor: '#eff6ff'}}>
      {TabArr.map((_: any, i: any) => {
        return (
          <Tab.Screen
            key={i}
            name={_.route}
            component={_.component}
            options={{
              tabBarIcon: ({color, size}) => (
                <AppIcon color={color} size={size} {..._.icon} />
              ),
              tabBarLabel: _.label,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
