import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Image,
  Text,
  ScrollView,
  Button,
  ButtonText,
  VStack,
  PhoneIcon,
  ButtonIcon,
  GlobeIcon,
  Spinner,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '~/Styles';
import {LinearComponent} from '~/Components/core';
import {useNavigation} from '@react-navigation/native';
import {AppRoutesTypes} from '~/Routes/Public/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useBasicFunctions, useMutation} from '~/Hooks';

type Props = NativeStackScreenProps<AppRoutesTypes, 'AuthRoute'>;
const AuthRoute = ({route: {params}, navigation}: Props) => {
  const isRegister = params?.isRegister;
  const {mutation, isLoading} = useMutation();
  const {handleLogin, getUser, handleSetAccessToken} = useBasicFunctions();
  // com.fevelapp
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1061452931939-vfokpioaef88sn5bcpiev4v1squj2ui1.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const SignIn = async () => {
    try {
      const res = await GoogleSignin.hasPlayServices();
      const isLogin = await GoogleSignin.isSignedIn();
      console.log({isLogin});
      if (isLogin) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        loginRegisterGoogle(userInfo);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('object1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('object2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('object3');
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };

  const loginRegisterGoogle = async (userInfo: any) => {
    console.log(userInfo?.user?.email, 'Email');
    try {
      const formData = new FormData();
      formData.append('email', userInfo?.user?.email);
      userInfo?.user?.photo &&
        formData.append('avatar', {
          uri: userInfo?.user?.photo,
          name: 'image.png',
          fileName: 'image',
          type: 'image/png',
        });
      const res = await mutation(`auth/login-or-register-with-firebase`, {
        method: 'POST',
        isFormData: true,
        body: formData,
      });
      console.log(res);
      if (res?.results?.success === true) {
        handleSetAccessToken(res?.results?.data?.access_token);
        handleLogin();
        getUser();
      } else {
        Alert.alert('Error', res?.results?.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size={'large'} />
      </Box>
    );

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearComponent>
        <Center mt={'$5'}>
          <Image
            source={IMAGES.LOGO2}
            alt="logo"
            style={{
              width: 200,
              height: 160,
            }}
            resizeMode={'contain'}
          />
        </Center>
        <Box mt={'$6'} px={'$10'}>
          <Box>
            {isRegister ? (
              <Text
                fontSize={28}
                fontFamily={'Montserrat-Bold'}
                textAlign="center">
                Create Account
              </Text>
            ) : (
              <Text
                fontSize={28}
                fontFamily={'Montserrat-Bold'}
                textAlign="center">
                Get Started
              </Text>
            )}
            <Text
              mt={'$3'}
              textAlign="center"
              fontFamily={'Montserrat-Medium'}
              lineHeight={'$md'}>
              By {isRegister ? 'creating' : 'login'} an account you agree to our{' '}
              <Text
                color={COLORS.primary}
                fontFamily={'Montserrat-SemiBold'}
                textDecorationLine={'underline'}>
                Terms & Conditions
              </Text>
              <Text>
                {' '}
                and{' '}
                <Text
                  color={COLORS.primary}
                  fontFamily={'Montserrat-SemiBold'}
                  textDecorationLine={'underline'}>
                  Privacy Policy
                </Text>
              </Text>
            </Text>
          </Box>
        </Box>
        <Box position={'absolute'} bottom={'$5'} w={'$full'} px={'$3'}>
          <VStack gap={'$3'}>
            <Button
              onPress={() => SignIn()}
              // onPress={() => navigation.navigate('GoogleAuth')}
              bgColor={COLORS.secondary}
              borderRadius={20}
              gap={'$1'}
              w={'100%'}>
              <ButtonIcon as={GlobeIcon} mr="$2" />
              <ButtonText color="$white" fontFamily={'Montserrat-Bold'}>
                Continue with Google
              </ButtonText>
            </Button>
            <Button
              borderRadius={20}
              gap={'$1'}
              w={'100%'}
              onPress={() =>
                navigation.navigate('Login', {
                  isRegister: isRegister,
                })
              }>
              <ButtonIcon as={PhoneIcon} mr="$2" />
              <ButtonText color="$white" fontFamily={'Montserrat-Bold'}>
                Continue with phone number
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </LinearComponent>
    </SafeAreaView>
  );
};

export default AuthRoute;
