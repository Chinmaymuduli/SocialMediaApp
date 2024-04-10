import React from 'react';
import {Box, FormControl, Input, InputField, Text} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';

const PhoneLogin = () => {
  return (
    <Box mt={'$7'}>
      <VStack gap={'$2'}>
        <Text fontSize={15} fontFamily={'Montserrat-Medium'}>
          Phone Number
        </Text>
        <FormControl isRequired mt={1}>
          <Input>
            <InputField type="text" />
          </Input>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default PhoneLogin;
