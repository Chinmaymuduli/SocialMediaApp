import React from 'react';
import {Box, Button, ButtonText, Divider} from '@gluestack-ui/themed';
import {FlatList} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {HStack} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {useSwrApi} from '~/Hooks';
import {Text} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';

const MyConnectionCompo = ({data}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  // console.log(data);

  return (
    <Box>
      <FlatList
        data={data}
        renderItem={({item}: any) => (
          <Box py={'$1'}>
            <VStack px={'$4'}>
              <HStack gap={'$1'} alignItems="center">
                <Image
                  source={
                    item?.sender_id?.avatar
                      ? {
                          uri: item?.is_received
                            ? item?.sender_id?.avatar
                            : item?.receiver_id?.avatar,
                        }
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
                  {item?.is_received
                    ? item?.sender_id?.nick_name
                    : item?.receiver_id?.nick_name}
                </Text>
              </HStack>
              <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
                <Button
                  onPress={() =>
                    navigate('UserProfile', {user_id: item?.sender_id?._id})
                  }
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
                  onPress={() =>
                    navigate('ChatDetails', {
                      connection_id: item?._id,
                      userNickName: item?.sender_id?.nick_name,
                      isReceived: true,
                      name: item?.sender_id?.name || 'Demo',
                    })
                  }
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
  );
};

export default MyConnectionCompo;
