import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
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

type Props = NativeStackScreenProps<AppRoutesTypes, 'AuthRoute'>;
const AuthRoute = ({route: {params}, navigation}: Props) => {
  const isRegister = params?.isRegister;
  const SignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({userInfo});
      console.log({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
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
              onPress={() => navigation.navigate('Login')}>
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
