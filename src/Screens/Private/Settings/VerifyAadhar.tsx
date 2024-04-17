import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {Box, Image, InputField, VStack} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {Input} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {Button} from '~/Components/core';

const VerifyAadhar = () => {
  return (
    <PrivateContainer title={'Verify Aadaar'} hasBackIcon={true}>
      <Box mt={'$10'}>
        <Box alignItems="center" justifyContent="center">
          <Image
            source={IMAGES.AADHAAR}
            style={{
              height: 150,
              width: 200,
            }}
            alt="image"
          />
        </Box>
        <VStack mt={'$10'}>
          <VStack gap={'$2'} px={'$4'}>
            <Text fontFamily="Montserrat-Bold" fontSize={13}>
              Enter Aadhaar Number *
            </Text>
            <Input
              variant="outline"
              isDisabled={false}
              alignItems="center"
              borderColor="$coolGray300"
              isInvalid={false}
              isReadOnly={false}>
              <InputField placeholder="Enter Aadhaar" fontSize={12} />
            </Input>
          </VStack>
        </VStack>
        <Box mt={'$10'} mb={'$4'}>
          <Button
            borderRadius={5}
            btnWidth={'full'}
            mx={'$4'}
            py={'$2'}
            onPress={() => {}}>
            <Text color="$white" fontFamily="Montserrat-Bold" fontSize={13}>
              Verify Aadhaar
            </Text>
          </Button>
        </Box>
      </Box>
    </PrivateContainer>
  );
};

export default VerifyAadhar;
