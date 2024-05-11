import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppRoutesTypes, PublicNavigationProps} from '~/Routes/Public/types';
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
  ButtonSpinner,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {COLORS} from '~/Styles';
import {Text} from '@gluestack-ui/themed';
import {useAppContext} from '~/Contexts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMutation} from '~/Hooks';
import useBasicFunction from '~/Hooks/useBasicFunctions';
import {PrivateContainer} from '~/Components/container';

type Props = NativeStackScreenProps<AppRoutesTypes, 'OtpScreen'>;
const OtpScreen = ({route: {params}}: Props) => {
  const navigation = useNavigation<PublicNavigationProps>();
  const [otp, setOtp] = useState<string>();
  const {setIsLoggedIn} = useAppContext();
  const {mutation, isLoading} = useMutation();
  const {mutation: verifyMutation, isLoading: verifyLoading} = useMutation();
  const {handleLogin, getUser} = useBasicFunction();
  const resendOTP = async () => {
    try {
      const bodyData: any = {};
      if (params?.phone) bodyData.phone = params?.phone;
      if (params?.email) bodyData.email = params?.email;
      const resend = await mutation(`auth/generate-otp`, {
        method: 'POST',
        body: bodyData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const bodyData = {
        otp: otp,
        token: params?.token,
      };
      const otpVerify = await verifyMutation(`auth//verify-email-or-phone`, {
        method: 'POST',
        body: bodyData,
      });

      if (otpVerify?.results?.success === true) {
        getUser();
        handleLogin();
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateContainer title="Enter OTP" bg={'purple.50'} hasBackIcon={true}>
      <ScrollView>
        <View style={{marginTop: 10}}>
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
              <Text style={styles.forgotDesLbl}>
                {params?.email ? params?.email : params?.phone}
              </Text>
            </View>

            <FormControl isRequired mt={1}>
              <Input alignItems="center" borderRadius={'$xl'}>
                <InputField
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChangeText={text => setOtp(text)}
                />
              </Input>
            </FormControl>

            <Box alignItems="center" mt={'$7'}>
              <Pressable onPress={resendOTP}>
                <Text style={styles.registerLbl}>Resend OTP</Text>
              </Pressable>
            </Box>
            <Button
              bgColor={COLORS.secondary}
              isDisabled={!otp}
              mt={'$12'}
              borderRadius={'$xl'}
              onPress={() => verifyOtp()}>
              <ButtonText fontFamily={'Montserrat-Bold'}>
                {' '}
                Verify and Continue
              </ButtonText>
              {verifyLoading ? (
                <ButtonSpinner />
              ) : (
                <ButtonIcon as={ArrowRightIcon} color={'$white'} />
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </PrivateContainer>
  );
};

const styles = StyleSheet.create({
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
