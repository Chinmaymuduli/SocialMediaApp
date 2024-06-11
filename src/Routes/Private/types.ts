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

type OmittedScreens =
  | 'AllComments'
  | 'UserProfile'
  | 'ChatDetails'
  | 'AgoraVoiceCall'
  | 'ShareScreenDetails'
  | 'Reviews';

export type PrivateNavigationProp = Omit<PrivateScreens, OmittedScreens> & {
  // OtpScreen: {
  //   token: string;
  // };
  AllComments: {
    post_id: string;
  };
  UserProfile: {
    user_id: string;
    isFromConnect?: boolean;
  };
  ChatDetails: {
    connection_id: string;
    userNickName?: string;
    isReceived?: boolean;
    name?: string;
    avatar?: any;
  };
  AgoraVoiceCall: {
    avatar?: any;
    nickName?: string;
    isHost?: boolean;
  };
  ShareScreenDetails: {
    postId: string;
  };
  Reviews: {
    user_id?: any;
  };
};

export type PrivateRoutesTypes = {
  TabLayout: undefined;
} & PrivateNavigationProp;

export type PrivateScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsTypes>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;
