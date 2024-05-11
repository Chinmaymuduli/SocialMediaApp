import {Alert, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Center,
  Image,
  Text,
  VStack,
  Button,
  ScrollView,
  ButtonText,
  ArrowRightIcon,
  PhoneIcon,
  MailIcon,
  HStack,
  Pressable,
  ButtonSpinner,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {IMAGES} from '~/Assets';
import {ButtonIcon} from '@gluestack-ui/themed';
import PhoneLogin from './PhoneLogin';
import EmailLogin from './EmailLogin';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigationProps} from '~/Routes/Public/types';
import {GlobeIcon} from '@gluestack-ui/themed';
import {useMutation} from '~/Hooks';
import useBasicFunction from '~/Hooks/useBasicFunctions';

const Login = () => {
  const {navigate} = useNavigation<PublicNavigationProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [selectedCountry, setSelectedCountry] = useState<any>({
    code: 'IN',
    name: 'India',
    phone: '91',
  });
  const {mutation, isLoading} = useMutation();
  const {handleSetAccessToken, handleLogin, getUser} = useBasicFunction();
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  const onSubmit = async () => {
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );

    try {
      if (!strongRegex.test(email!) || !email) {
        Alert.alert('Error', 'Please Provide Email');
      } else if (!password) {
        Alert.alert('Error', 'Please Provide Password');
      }
      const loginData = await mutation(`auth/login-with-email-and-password`, {
        method: 'POST',
        body: {
          email: email!.replace(/ +/g, ''),
          password: password!.replace(/ +/g, ''),
        },
      });
      console.log(loginData);
      if (loginData?.status !== 200) {
        Alert.alert('Error', loginData?.results?.error?.message);
      } else {
        handleSetAccessToken(loginData?.results?.data?.access_token);
        handleLogin();
        getUser();
        // navigate('OtpScreen', {
        //   token: loginData?.results?.data?.token,
        //   email: email,
        // });
      }
    } catch (error) {
      console.log({error});
    }
  };

  const handelPhoneLogin = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please Provide Phone Number');
    }
    try {
      const phoneSignUp = await mutation(`auth/generate-otp`, {
        method: 'POST',
        body: {
          phone: phoneNumber,
        },
      });

      console.log(phoneSignUp?.results);
      if (phoneSignUp?.results?.success !== true) {
        Alert.alert('Error', phoneSignUp?.results?.error?.message);
      } else {
        handleSetAccessToken(phoneSignUp?.results?.data?.token);
        navigate('OtpScreen', {
          token: phoneSignUp?.results?.data?.token,
          phone: phoneNumber,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        keyboardShouldPersistTaps={'always'}>
        <Box px={8} mt={20}>
          <Center>
            <Image
              source={IMAGES.LOGO}
              alt="logo"
              style={{
                width: 200,
                height: 160,
              }}
              resizeMode={'contain'}
            />
          </Center>
          <Box mt={'$2'}>
            <Box>
              <Text fontSize={30} fontFamily={'Montserrat-Bold'}>
                Welcome,
              </Text>
              <Text fontFamily={'Montserrat-Medium'}>
                Please enter your credential to continue.
              </Text>
            </Box>
            <PhoneLogin
              phoneNumber={phoneNumber!}
              setPhoneNumber={setPhoneNumber}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
            <Box mt={'$3'}>
              <Text fontFamily={'Montserrat-Medium'} fontSize={14}>
                We'll send you a verification code to verify you're really you.
              </Text>
            </Box>
            {/* {isPhoneLogin ? (
              <PhoneLogin
                phoneNumber={phoneNumber!}
                setPhoneNumber={setPhoneNumber}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            ) : (
              <EmailLogin
                handleState={handleState}
                showPassword={showPassword}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            )} */}
          </Box>

          {/* <VStack gap={'$5'} mt={'$9'}>
            <Button
              bgColor={COLORS.secondary}
              borderRadius={8}
              isDisabled={isLoading}
              onPress={
                isPhoneLogin ? () => handelPhoneLogin() : () => onSubmit()
              }
              gap={'$1'}>
              <ButtonText color="$white" fontFamily={'Montserrat-Bold'}>
                Sign In
              </ButtonText>
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <ButtonIcon as={ArrowRightIcon} mt={'$0.5'} />
              )}
            </Button>

            <HStack alignItems={'center'} gap={'$2'} justifyContent={'center'}>
              <Box h={'$0.5'} bgColor={'$coolGray200'} w={'40%'}></Box>
              <Text
                fontFamily={'Montserrat-Bold'}
                color={'$blue600'}
                fontSize={13}>
                OR
              </Text>
              <Box h={'$0.5'} bgColor={'$coolGray200'} w={'40%'}></Box>
            </HStack>

            {!isPhoneLogin ? (
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Button
                  w={'45%'}
                  gap={'$2'}
                  alignItems={'center'}
                  onPress={() => setIsPhoneLogin(true)}
                  size="md"
                  variant="outline"
                  borderColor={'$coolGray300'}
                  action="primary"
                  isDisabled={false}
                  borderRadius={8}
                  isFocusVisible={false}>
                  <ButtonIcon as={PhoneIcon} color={'$blue600'} />
                  <ButtonText fontFamily={'Montserrat-Medium'} color={'$black'}>
                    Phone{' '}
                  </ButtonText>
                </Button>
                <Button
                  w={'45%'}
                  gap={'$2'}
                  alignItems={'center'}
                  onPress={() => setIsPhoneLogin(true)}
                  size="md"
                  variant="outline"
                  borderColor={'$coolGray300'}
                  action="primary"
                  isDisabled={false}
                  borderRadius={8}
                  isFocusVisible={false}>
                  <ButtonIcon as={GlobeIcon} color={'$red500'} />
                  <ButtonText fontFamily={'Montserrat-Medium'} color={'$black'}>
                    Google{' '}
                  </ButtonText>
                </Button>
              </HStack>
            ) : (
              <HStack>
                <Button
                  gap={'$2'}
                  w={'45%'}
                  onPress={() => setIsPhoneLogin(false)}
                  size="md"
                  variant="outline"
                  borderColor={'$coolGray300'}
                  action="primary"
                  isDisabled={false}
                  borderRadius={8}
                  isFocusVisible={false}>
                  <ButtonIcon as={MailIcon} color={'$green500'} />
                  <ButtonText fontFamily={'Montserrat-Medium'} color={'$black'}>
                    Mail{' '}
                  </ButtonText>
                </Button>
                <Button
                  w={'45%'}
                  gap={'$2'}
                  alignItems={'center'}
                  onPress={() => setIsPhoneLogin(true)}
                  size="md"
                  variant="outline"
                  borderColor={'$coolGray300'}
                  action="primary"
                  isDisabled={false}
                  borderRadius={8}
                  isFocusVisible={false}>
                  <ButtonIcon as={GlobeIcon} color={'$red500'} />
                  <ButtonText fontFamily={'Montserrat-Medium'} color={'$black'}>
                    Google{' '}
                  </ButtonText>
                </Button>
              </HStack>
            )}
          </VStack> */}
        </Box>
        {/* <Box alignItems="center" justifyContent="center" mt={'$10'}>
          <HStack gap={'$2'}>
            <Text fontFamily={'Montserrat-Medium'}>
              Don't have an account ?
            </Text>
            <Pressable onPress={() => navigate('SignUp')}>
              <Text color={'$blue800'} fontFamily={'Montserrat-Medium'}>
                Register
              </Text>
            </Pressable>
          </HStack>
        </Box> */}
      </ScrollView>
      <Box mb={'$3'} px={'$2'}>
        <Button
          bgColor={COLORS.secondary}
          borderRadius={8}
          isDisabled={isLoading}
          onPress={() => handelPhoneLogin()}
          gap={'$1'}>
          <ButtonText color="$white" fontFamily={'Montserrat-Bold'}>
            Sign In
          </ButtonText>
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <ButtonIcon as={ArrowRightIcon} mt={'$0.5'} />
          )}
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Login;
