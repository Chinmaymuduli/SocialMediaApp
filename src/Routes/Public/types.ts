import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Auth, Public} from '~/screens';

export type PublicRoutesTypes = {
  [key in keyof typeof Public]: undefined;
} & {[key in keyof typeof Auth]: undefined};

type OmittedScreens = 'OtpScreen' | 'AuthRoute' | 'Login';
export type AppRoutesTypes = Omit<PublicRoutesTypes, OmittedScreens> & {
  OtpScreen: {
    token?: string;
    phone?: string;
    email?: string;
  };
  AuthRoute: {
    isRegister: boolean;
  };
  Login: {
    isRegister?: boolean;
  };
};

export type PublicNavigationProps = NativeStackNavigationProp<AppRoutesTypes>;
