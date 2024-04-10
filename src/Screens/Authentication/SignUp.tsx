import {SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Center,
  FormControl,
  Image,
  Input,
  Text,
  VStack,
  Button,
  ScrollView,
  InputField,
  ButtonText,
  InputIcon,
  InputSlot,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  PhoneIcon,
  MailIcon,
  HStack,
  Pressable,
  Heading,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {IMAGES} from '~/Assets';
import {ButtonIcon} from '@gluestack-ui/themed';
import PhoneLogin from './PhoneLogin';
import EmailLogin from './EmailLogin';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigationProps} from '~/Routes/Public/types';
import {GlobeIcon} from '@gluestack-ui/themed';

const SignUp = () => {
  const {navigate} = useNavigation<PublicNavigationProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  const onSubmit = async (data: any) => {
    console.log({data});
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
                Please create account to continue.
              </Text>
            </Box>
            {isPhoneLogin ? (
              <PhoneLogin />
            ) : (
              <EmailLogin
                handleState={handleState}
                showPassword={showPassword}
              />
            )}
          </Box>

          <VStack gap={'$5'} mt={'$9'}>
            <Button
              bgColor={COLORS.secondary}
              borderRadius={8}
              onPress={() => navigate('OtpScreen')}
              gap={'$1'}>
              <ButtonText color="$white" fontFamily={'Montserrat-Bold'}>
                Save & Continue
              </ButtonText>
              <ButtonIcon as={ArrowRightIcon} mt={'$0.5'} />
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
          </VStack>
        </Box>
        <Box alignItems="center" justifyContent="center" mt={'$10'}>
          <HStack gap={'$2'}>
            <Text fontFamily={'Montserrat-Medium'}>Have an account ?</Text>
            <Pressable onPress={() => navigate('Login')}>
              <Text color={'$blue800'} fontFamily={'Montserrat-Medium'}>
                Sign In
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
