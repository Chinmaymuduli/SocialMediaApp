import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {
  Box,
  ButtonText,
  Divider,
  FlatList,
  HStack,
  Image,
  Spinner,
  VStack,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {Button} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {useSwrApi} from '~/Hooks';
import FetchLoader from '~/Components/core/FetchLoader';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';

const MyConnections = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {data, isValidating} = useSwrApi(
    `connections/read-all?type=all&is_accepted=true&require_all=true`,
  );
  if (isValidating) <FetchLoader />;

  return (
    <PrivateContainer title={'My Connections'} hasBackIcon={true}>
      <Box mt={'$4'}>
        <FlatList
          data={data?.data?.data}
          renderItem={({item}: any) => (
            <Box py={'$1'}>
              <VStack px={'$4'}>
                <HStack gap={'$1'} alignItems="center">
                  <Image
                    source={
                      item?.sender_id?.image
                        ? {uri: item?.sender_id?.image}
                        : IMAGES.USER
                    }
                    alt="img"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    borderRadius={20}
                  />
                  <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                    {item?.sender_id?.name
                      ? item?.sender_id?.name
                      : item?.sender_id?.phone}
                  </Text>
                </HStack>
                <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
                  <Button
                    onPress={() => navigate('UserProfile')}
                    size="sm"
                    h={20}
                    variant="outline"
                    action="primary"
                    borderColor={'$green400'}
                    isDisabled={false}
                    isFocusVisible={false}>
                    <ButtonText fontSize={12} color={'$green600'}>
                      Visit Profile{' '}
                    </ButtonText>
                  </Button>
                  <Button
                    onPress={() => navigate('ChatDetails')}
                    size="md"
                    h={20}
                    w={'$24'}
                    variant="outline"
                    action="primary"
                    borderColor={'$pink400'}
                    isDisabled={false}
                    isFocusVisible={false}>
                    <ButtonText fontSize={12} color={'$pink600'}>
                      Message{' '}
                    </ButtonText>
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

export default MyConnections;
