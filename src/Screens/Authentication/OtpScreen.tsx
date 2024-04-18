import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigationProps} from '~/Routes/Public/types';
import {
  Box,
  Image,
  Input,
  ScrollView,
  FormControl,
  InputField,
  Button,
  ButtonText,
  ArrowRightIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {COLORS} from '~/Styles';
import {Text} from '@gluestack-ui/themed';
import {useAppContext} from '~/Contexts';

const OtpScreen = () => {
  const navigation = useNavigation<PublicNavigationProps>();
  const {setIsLoggedIn} = useAppContext();
  const resendOTP = () => {};

  return (
    <ScrollView style={styles.mainCon}>
      <View style={{paddingLeft: 15, marginTop: 7}}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text fontFamily={'Montserrat-Bold'} color={'$green600'}>
            Back
          </Text>
        </Pressable>
      </View>
      <View style={{position: 'relative', bottom: 28}}>
        <View style={styles.loginIcon}>
          <Image
            source={IMAGES.OTP}
            style={{width: 280, height: 280}}
            alt="otp"
          />
        </View>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>Enter One Time Password (OTP)</Text>
          </View>
          <View style={styles.forgotDes}>
            <Text style={styles.forgotDesLbl}>
              An 6 digit code has been sent to
            </Text>
            <Text style={styles.forgotDesLbl}>+91 1234567890</Text>
          </View>

          <FormControl isRequired mt={1}>
            <Input alignItems="center" borderRadius={'$xl'}>
              <InputField type="text" maxLength={6} />
            </Input>
          </FormControl>

          <Box alignItems="center" mt={'$7'}>
            <Pressable onPress={resendOTP}>
              <Text style={styles.registerLbl}>Resend OTP</Text>
            </Pressable>
          </Box>
          <Button
            bgColor={COLORS.secondary}
            mt={'$12'}
            borderRadius={'$xl'}
            onPress={() => setIsLoggedIn(true)}>
            <ButtonText fontFamily={'Montserrat-Bold'}>
              {' '}
              Verify and Continue
            </ButtonText>
            <ButtonIcon as={ArrowRightIcon} color={'$white'} />
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  registerLbl: {color: '#0057ff', fontFamily: 'Montserrat-Bold'},
});

export default OtpScreen;
