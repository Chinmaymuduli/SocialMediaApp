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

type OmittedScreens = 'AllComments';

export type PrivateNavigationProp = Omit<PrivateScreens, OmittedScreens> & {
  // OtpScreen: {
  //   token: string;
  // };
  AllComments: {
    post_id: string;
  };
};

export type PrivateRoutesTypes = {
  TabLayout: undefined;
} & PrivateNavigationProp;

export type PrivateScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsTypes>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;
