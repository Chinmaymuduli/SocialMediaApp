import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Private} from '~/Screens';
import AppIcon from '~/Components/core/AppIcon';
import {COLORS} from '~/Styles';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const TabArr: any = useMemo(
    () => [
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
    ],
    [],
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
