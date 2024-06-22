import React from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
  Pressable,
  Spinner,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import AppIcon from '~/Components/core/AppIcon';

const SentCompo = ({data, sentMutate, isValidating}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  if (isValidating)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Spinner size={'large'} />
      </Box>
    );
  return (
    <Box mt={'$2'} px={'$2'}>
      <FlatList
        data={data}
        onRefresh={sentMutate}
        refreshing={isValidating}
        contentContainerStyle={{paddingBottom: 50}}
        renderItem={({item}: any) => (
          <Pressable
            // onPress={() =>
            //   navigate('UserProfile', {user_id: item?.receiver_id?._id})
            // }
            py={'$1'}
            softShadow="1"
            bg={'$white'}
            borderRadius={6}
            mb={'$3'}>
            <HStack
              py={'$2'}
              alignItems="center"
              justifyContent="space-between"
              px={'$4'}>
              <HStack gap={'$2'} alignItems="center">
                <Image
                  source={
                    item?.receiver_id?.avatar
                      ? {uri: item?.receiver_id?.avatar}
                      : IMAGES.USER
                  }
                  alt="img"
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  rounded={'$full'}
                />
                <VStack>
                  <Text fontFamily="Montserrat-SemiBold" fontSize={15}>
                    {item?.receiver_id?.nick_name}
                  </Text>
                  <HStack w={'$32'}>
                    {item?.receiver_id?.interests?.map((int: any) => (
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
              {/* button */}
              {/* <HStack justifyContent="space-around" px={'$2'} mt={'$4'}>
                <Button borderRadius={5} py={'$1'} btnWidth={'50%'}>
                  {data?.data?.data?.connection?.is_accepted ? (
                    <Pressable>
                      <Text
                        color="$white"
                        fontFamily="Montserrat-Medium"
                        fontSize={13}>
                        Accepted
                      </Text>
                    </Pressable>
                  ) : (
                    <Text
                      color="$white"
                      fontFamily="Montserrat-Medium"
                      fontSize={13}>
                      Pending
                    </Text>
                  )}
                </Button>

                <Button
                  borderRadius={5}
                  py={'$1'}
                  onPress={() =>
                    navigate('UserProfile', {user_id: item?.receiver_id?._id})
                  }
                  btnWidth={'50%'}>
                  <Text
                    color="$white"
                    fontFamily="Montserrat-Medium"
                    fontSize={13}>
                    Profile
                  </Text>
                </Button>
              </HStack> */}
              <Box bg={'#753CEF'} borderRadius={5}>
                <Box p={'$1'}>
                  <AppIcon
                    FontAwesome5Name={
                      item?.is_accepted ? 'user-check' : 'user-clock'
                    }
                    size={18}
                    color={'white'}
                  />
                </Box>
              </Box>
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
              <Text fontFamily="Montserrat-SemiBold">No data found</Text>
            </VStack>
          </Box>
        }
      />
    </Box>
  );
};

export default SentCompo;
