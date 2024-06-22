import React from 'react';
import {Box, Pressable} from '@gluestack-ui/themed';
import {FlatList} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {HStack} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {Text} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';

const MyConnectionCompo = ({data}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  return (
    <Box px={'$2'} mt={'$3'}>
      <FlatList
        data={data}
        renderItem={({item}: any) => (
          <Pressable
            onPress={() =>
              navigate('UserProfile', {
                user_id: item?.is_received
                  ? item?.sender_id?._id
                  : item?.receiver_id?._id,
              })
            }
            py={'$1'}
            mx={'$2'}
            softShadow="1"
            bg={'$white'}
            borderRadius={6}
            mb={'$3'}>
            <HStack
              py={'$2'}
              px={'$2'}
              justifyContent="space-between"
              alignItems="center">
              <HStack gap={'$1'} alignItems="center">
                <Image
                  source={{
                    uri: item?.is_received
                      ? item?.sender_id?.avatar ||
                        'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg'
                      : item?.receiver_id?.avatar ||
                        'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg',
                  }}
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
                  <HStack w={'$32'}>
                    {item?.is_received
                      ? item?.sender_id?.interests?.map((int: any) => (
                          <Text
                            key={int?._id}
                            numberOfLines={1}
                            fontFamily="Montserrat-SemiBold"
                            fontSize={11}
                            color={'$coolGray400'}>
                            {int?.label} ,{' '}
                          </Text>
                        ))
                      : item?.receiver_id?.interests?.map((int: any) => (
                          <Text
                            key={int?._id}
                            numberOfLines={1}
                            fontFamily="Montserrat-SemiBold"
                            fontSize={11}
                            color={'$coolGray400'}>
                            {int?.label} ,{' '}
                          </Text>
                        ))}
                  </HStack>
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
              {/* <Box bg={'#753CEF'} borderRadius={5}>
                <Box p={'$1'}>
                  <AppIcon
                    MaterialCommunityIconsName={'message-outline'}
                    size={20}
                    color={'white'}
                  />
                </Box>
              </Box> */}
            </HStack>
            {/* <Divider mt={'$4'} /> */}
          </Pressable>
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
