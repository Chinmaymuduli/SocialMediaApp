import React from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
  Pressable,
} from '@gluestack-ui/themed';
import {ANIMATIONS, IMAGES} from '~/Assets';
import Empty from '~/Components/core/Empty';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import AppIcon from '~/Components/core/AppIcon';

const Suggestions = ({data}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  return (
    <Box px={'$2'}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => (
          <Pressable
            onPress={() => navigate('UserProfile', {user_id: item?._id})}
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
                  source={item?.avatar ? {uri: item?.avatar} : IMAGES.USER}
                  alt="img"
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  rounded={'$full'}
                />
                <VStack>
                  <Text fontFamily="Montserrat-SemiBold" fontSize={15}>
                    {item?.nick_name}
                  </Text>
                  <HStack w={'$32'}>
                    {item?.interests?.map((int: any) => (
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

              <Pressable
                bg={'#753CEF'}
                borderRadius={5}
                onPress={() => navigate('UserProfile', {user_id: item?._id})}>
                <Box p={'$1'}>
                  <AppIcon
                    FontAwesome5Name={'user-plus'}
                    size={18}
                    color={'white'}
                  />
                </Box>
              </Pressable>
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
              <Text fontFamily="Montserrat-SemiBold">No Suggestions found</Text>
            </VStack>
          </Box>
        }
      />
    </Box>
  );
};

export default Suggestions;
