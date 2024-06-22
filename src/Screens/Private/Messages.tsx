import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {VStack} from '@gluestack-ui/themed';
import {useSwrApi} from '~/Hooks';
import moment from 'moment';
import {COLORS} from '~/Styles';

const Messages = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {data, isValidating, mutate} = useSwrApi(
    `chats/read-chat-heads?is_accepted=true&is_blocked=false`,
  );

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );

  // console.log(data?.data?.data?.[0]);

  if (isValidating)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size={'large'} color={COLORS.secondary} />
      </Box>
    );
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Profile'),
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => navigate('Settings'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <Box flex={1}>
        <FlatList
          contentContainerStyle={{paddingBottom: 50}}
          data={data?.data?.data}
          renderItem={({item}: any) => (
            <Pressable
              bgColor={'#00000000'}
              px={'$4'}
              py={'$2'}
              onPress={() =>
                navigate('ChatDetails', {
                  connection_id: item?._id,
                  isReceived: item?.is_received,
                  name: item?.is_received
                    ? item?.sender_id?.name || ''
                    : item?.receiver_id?.name || '',
                  userNickName: item?.is_received
                    ? item?.sender_id?.nick_name || ''
                    : item?.receiver_id?.nick_name || '',
                  avatar: item?.is_received
                    ? item?.sender_id?.avatar
                    : item?.receiver_id?.avatar,
                })
              }>
              <HStack gap={'$3'} alignItems={'center'}>
                <Pressable>
                  <Image
                    source={{
                      uri: item?.is_received
                        ? item?.sender_id?.avatar ||
                          'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg'
                        : item?.receiver_id?.avatar ||
                          'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg',
                    }}
                    alt="image"
                    h={'$12'}
                    w={'$12'}
                    borderRadius={30}
                  />
                </Pressable>
                <VStack flex={1}>
                  <Text fontFamily={'Montserrat-Bold'} fontSize={12}>
                    {item?.is_received
                      ? item?.sender_id?.nick_name || item?.sender_id?.name
                      : item?.receiver_id?.nick_name || item?.receiver_id?.name}
                  </Text>
                  <Text
                    color={'#94a3b8'}
                    fontFamily={'Montserrat-Medium'}
                    fontSize={13}>
                    {item?.last_message?.text}
                  </Text>
                </VStack>
                <Text color={'#94a3b8'} fontSize={11}>
                  {moment(item?.last_message?.updated_at).fromNow()}
                </Text>
              </HStack>
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
                <Text fontFamily="Montserrat-SemiBold">No Messages found</Text>
              </VStack>
            </Box>
          }
        />
      </Box>
    </PrivateContainer>
  );
};

export default Messages;
