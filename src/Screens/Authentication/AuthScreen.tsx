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
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '~/Styles';
import {LinearComponent} from '~/Components/core';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigationProps} from '~/Routes/Public/types';

const AuthScreen = () => {
  const {navigate} = useNavigation<PublicNavigationProps>();
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
        <Box mt={'$10'} px={'$10'}>
          <Box>
            <Text
              fontSize={30}
              fontFamily={'Montserrat-Bold'}
              textAlign="center">
              Start your journey with us.
            </Text>
          </Box>
        </Box>
        <Box position={'absolute'} bottom={'$5'} w={'$full'} px={'$3'}>
          <VStack gap={'$3'}>
            <Button
              onPress={() =>
                navigate('AuthRoute', {
                  isRegister: true,
                })
              }
              bgColor={COLORS.secondary}
              borderRadius={20}
              gap={'$1'}
              w={'100%'}>
              <ButtonText color="$white" fontFamily={'Montserrat-Bold'}>
                Create Account
              </ButtonText>
            </Button>
            <Button
              borderRadius={20}
              gap={'$1'}
              w={'100%'}
              onPress={() =>
                navigate('AuthRoute', {
                  isRegister: false,
                })
              }>
              <ButtonText color="$white" fontFamily={'Montserrat-Bold'}>
                Log in
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </LinearComponent>
    </SafeAreaView>
  );
};

export default AuthScreen;
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
  },
});
