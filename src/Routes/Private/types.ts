import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Private} from '~/Screens';

export type BottomTabsTypes = {
  Feeds: undefined;
};

type PrivateScreens = {
  [key in keyof typeof Private]: undefined;
};

type OmittedScreens = 'Policies';

export type PrivateNavigationProp = Omit<PrivateScreens, OmittedScreens> & {
  //   ContactsList: {
  //     isGroup?: boolean;
  //   };
};

export type PrivateRoutesTypes = {
  TabLayout: undefined;
  //   DrawerLayout: undefined;
} & PrivateNavigationProp;

export type PrivateScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsTypes>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;
