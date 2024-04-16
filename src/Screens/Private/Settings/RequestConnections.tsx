import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {
  AddIcon,
  Box,
  Button,
  ButtonText,
  Divider,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {ButtonIcon} from '@gluestack-ui/themed';
import {CloseIcon} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';

const RequestConnections = () => {
  const userArray = [
    {
      userName: 'user4',
      image: IMAGES.USER,
    },
    {
      userName: 'user5',
      image: IMAGES.USER,
    },
    {
      userName: 'user6',
      image: IMAGES.USER,
    },
    {
      userName: 'user7',
      image: IMAGES.USER,
    },
    {
      userName: 'user8',
      image: IMAGES.USER,
    },
    {
      userName: 'user9',
      image: IMAGES.USER,
    },
  ];

  return (
    <PrivateContainer title={'Request Connections'} hasBackIcon={true}>
      <Box mt={'$4'}>
        <FlatList
          data={userArray}
          renderItem={({item}: any) => (
            <Box py={'$1'}>
              <VStack px={'$4'}>
                <HStack gap={'$1'} alignItems="center">
                  <Image
                    source={item?.image}
                    alt="img"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    rounded={'$full'}
                  />
                  <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                    {item?.userName} wants to connect with you.
                  </Text>
                </HStack>
                <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
                  <Button
                    size="sm"
                    h={20}
                    w={'$24'}
                    variant="outline"
                    action="primary"
                    borderColor={'$green400'}
                    isDisabled={false}
                    isFocusVisible={false}>
                    <ButtonText fontSize={12} color={'$green600'}>
                      Add{' '}
                    </ButtonText>
                    <ButtonIcon as={AddIcon} color={'$green600'} mt={'$0.5'} />
                  </Button>
                  <Button
                    size="md"
                    h={20}
                    w={'$24'}
                    variant="outline"
                    action="primary"
                    borderColor={'$pink400'}
                    isDisabled={false}
                    isFocusVisible={false}>
                    <ButtonText fontSize={12} color={'$pink600'}>
                      Cancel{' '}
                    </ButtonText>
                    <ButtonIcon as={CloseIcon} color={'$pink600'} />
                  </Button>
                </HStack>
              </VStack>
              <Divider mt={'$4'} />
            </Box>
          )}
        />
      </Box>
    </PrivateContainer>
  );
};

export default RequestConnections;
