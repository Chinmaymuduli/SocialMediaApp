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
import AppIcon from '~/Components/core/AppIcon';
import {COLORS} from '~/Styles';

const MyConnectionCompo = ({data}: any) => {
  // const {navigate} = useNavigation<PrivateScreenProps>();
  // console.log(data?.[0]);

  return (
    <Box px={'$2'}>
      <FlatList
        data={data}
        renderItem={({item}: any) => (
          <Box py={'$1'} softShadow="1" bg={'$white'} borderRadius={6}>
            <HStack
              px={'$4'}
              py={'$2'}
              justifyContent="space-between"
              alignItems="center">
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
                    height: 50,
                    width: 50,
                  }}
                  borderRadius={30}
                />
                <VStack>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={12}
                    color={'$black'}>
                    {item?.is_received
                      ? item?.sender_id?.nick_name
                      : item?.receiver_id?.nick_name}
                  </Text>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={11}
                    color={'$coolGray400'}>
                    Football , Photography
                  </Text>
                </VStack>
              </HStack>
              {/* <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
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
                      userNickName: item?.receiver_id?.nick_name,
                      isReceived: item?.is_received,
                      name: item?.receiver_id?.name || 'Demo',
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
              </HStack> */}
              <Box bg={'#753CEF'} borderRadius={5}>
                <Box p={'$1'}>
                  <AppIcon
                    MaterialCommunityIconsName={'message-outline'}
                    size={20}
                    color={'white'}
                  />
                </Box>
              </Box>
            </HStack>
            {/* <Divider mt={'$4'} /> */}
          </Box>
        )}
        ListEmptyComponent={
          <Box alignItems="center" mt={'$10'}>
            <VStack alignItems="center" gap={10}>
              <Image
                source={IMAGES.CONNECT_BG_REMOVE}
                alt="img"
                style={{width: 200, height: 200}}
              />
              <Text fontFamily="Montserrat-SemiBold">No connection found</Text>
            </VStack>
          </Box>
        }
      />
    </Box>
  );
};

export default MyConnectionCompo;
