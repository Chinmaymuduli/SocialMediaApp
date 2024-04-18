import React from 'react';
import {
  Box,
  EyeIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  VStack,
  EyeOffIcon,
  MailIcon,
  Pressable,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlErrorIcon,
  AlertCircleIcon,
  FormControlErrorText,
} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {FormControl} from '@gluestack-ui/themed';
import {UnlockIcon} from '@gluestack-ui/themed';
import {FormControlLabel} from '@gluestack-ui/themed';
import {FormControlError} from '@gluestack-ui/themed';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native';

type EmailType = {
  showPassword: boolean;
  handleState: () => void;
  email?: string;
  setEmail: (email: string) => void;
  password?: string;
  setPassword: (password: string) => void;
};
const EmailLogin = ({
  handleState,
  showPassword,
  email,
  setEmail,
  password,
  setPassword,
}: EmailType) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Box mt={'$7'} gap={'$3'}>
      <VStack gap={'$2'}>
        <Text fontSize={15} fontFamily={'Montserrat-Medium'}>
          Email
        </Text>
        <FormControl isRequired mt={1}>
          <Input alignItems="center">
            <InputIcon as={MailIcon} color="$coolGray500" pl="$8" size="lg" />

            <InputField
              type="text"
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
          </Input>
        </FormControl>
      </VStack>

      <VStack gap={'$2'}>
        <Text fontFamily={'Montserrat-Medium'} fontSize={15}>
          Password
        </Text>
        <FormControl isRequired mt={1}>
          <Input alignItems="center">
            <InputIcon as={UnlockIcon} color="$coolGray500" pl="$8" size="lg" />
            <InputField
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
            <Pressable onPress={handleState} pr="$3">
              {showPassword ? (
                <Text
                  color={'$pink600'}
                  fontFamily={'Montserrat-Medium'}
                  fontSize={13}>
                  Hide
                </Text>
              ) : (
                <Text
                  color={'$green500'}
                  fontFamily={'Montserrat-Medium'}
                  fontSize={13}>
                  Show
                </Text>
              )}
            </Pressable>
          </Input>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default EmailLogin;
