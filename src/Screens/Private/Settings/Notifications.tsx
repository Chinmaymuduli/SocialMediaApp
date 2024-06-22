import React, {useState} from 'react';
import {
  Pressable,
  FlatList,
  HStack,
  VStack,
  Text,
  Box,
  Spinner,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import AppIcon from '~/Components/core/AppIcon';
import {PrivateContainer} from '~/Components/container';
import {useMutation, useSwrApi} from '~/Hooks';
import {useAppContext} from '~/Contexts';
import {Image} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import moment from 'moment';

const Notifications = () => {
  const {userData} = useAppContext();
  const {data, isValidating, mutate} = useSwrApi(
    `notifications?user_id=${userData?._id}`,
  );

  const {mutation, isLoading} = useMutation();
  const queryString = data?.data?.data
    ?.map((item: any) => `notificationIds=${item?._id}`)
    .join('&');
  const deleteAll = async () => {
    try {
      const res = await mutation(
        `notifications?user_id=${userData?._id}&${queryString}`,
        {
          method: 'DELETE',
        },
      );
      if (res?.results?.success === true) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readAll = async () => {
    try {
      const res = await mutation(
        `notifications/mark-as-read?user_id=${userData?._id}&${queryString}`,
        {
          method: 'PUT',
        },
      );
      if (res?.results?.success === true) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data?.data?.data?.[0]);

  if (isValidating)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size={'large'} />
      </Box>
    );

  return (
    <PrivateContainer title={'Notifications'} hasBackIcon={true}>
      <Box mx={'$3'} flex={1}>
        {/* SEARCH BAR & FILTER  */}
        <HStack
          mx={'$2'}
          my={'$3'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Pressable
            bg={'white'}
            softShadow={'1'}
            rounded={'$lg'}
            p={'$2'}
            onPress={() => readAll()}>
            <HStack gap={'$2'} alignItems={'center'}>
              <AppIcon
                MaterialCommunityIconsName={'playlist-check'}
                size={22}
                color={'blue'}
              />
              <Text fontWeight={'semibold'} fontSize={'$sm'} color={'$blue500'}>
                Mark All Read
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            bg={'white'}
            softShadow={'1'}
            rounded={'$lg'}
            p={'$2'}
            onPress={() => deleteAll()}>
            <HStack gap={'$2'} alignItems={'center'}>
              <AppIcon
                MaterialCommunityIconsName={'delete'}
                size={20}
                color={'red'}
              />
              <Text fontWeight={'semibold'} fontSize={'$sm'} color={'$red500'}>
                Delete All
              </Text>
            </HStack>
          </Pressable>
        </HStack>

        {/* content  */}
        <FlatList
          data={data?.data?.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}: any) => (
            <Pressable>
              <HStack
                w={'$full'}
                key={index}
                p={'$3'}
                my={'$1.5'}
                softShadow={'1'}
                borderLeftWidth={4}
                rounded={'$lg'}
                bg={'white'}
                overflow={'hidden'}
                alignItems={'center'}
                borderColor={'$red500'}>
                <AppIcon
                  MaterialCommunityIconsName={'mail'}
                  size={32}
                  color={COLORS.primary}
                />
                <VStack ml={'$3'} w={'$full'} mb={'$4'}>
                  <Box w={'80%'}>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={'$xs'}>
                      {item?.title}
                    </Text>
                  </Box>
                  <Box w={'70%'}>
                    <Text fontFamily="Montserrat-Medium" fontSize={'$xs'}>
                      {item?.description}
                    </Text>
                  </Box>
                </VStack>
                <Box position="absolute" left={10} bottom={2}>
                  <Text fontFamily="Montserrat-Medium" fontSize={'$xs'}>
                    {moment(item?.created_at).format('ll')}
                  </Text>
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
                <Text fontFamily="Montserrat-SemiBold">
                  No Notifications found
                </Text>
              </VStack>
            </Box>
          }
        />

        {/* Notification details bottomSheet  */}
        {/* <BottomSheet
                    visible={isOpen}
                    onDismiss={() => {
                        onClose();
                    }}>
                    <Box bg={'white'}>
                        <HStack
                            justifyContent={'space-between'}
                            width={WIDTH}
                            alignItems={'center'}
                            borderBottomWidth={1}
                            borderBottomRadius={'10'}
                            borderBottomColor={'gray.400'}
                            pb={2}>
                            <Text
                                fontWeight={'bold'}
                                fontSize={'md'}
                                color={COLORS.primary}
                                m={2}>
                                Details :
                            </Text>
                            <AppIcon
                                AntDesignName="close"
                                size={25}
                                color={'#e11d48'}
                                style={{
                                    paddingRight: 20,
                                }}
                                onPress={onClose}
                            />
                        </HStack>

                        <Box m={2}>
                            <Text
                                my={1}
                                fontWeight={'semibold'}
                                fontSize={'md'}
                                color={'coolGray.700'}>
                                {notificationTitle}
                            </Text>
                            <Text
                                my={2}
                                fontWeight={'medium'}
                                fontSize={'sm'}
                                color={'coolGray.600'}>
                                {notificationDesc}
                            </Text>
                        </Box>

                        <Row m={2} justifyContent={'space-between'} alignItems={'center'}>
                            <Pressable _pressed={{ opacity: 0.6 }} onPress={onClose}>
                                <Box
                                    w={WIDTH / 2.5}
                                    alignItems={'center'}
                                    p={2}
                                    my={1}
                                    rounded={'2xl'}
                                    bg={'coolGray.200'}>
                                    <Text fontWeight={'semibold'} color={'#000'}>
                                        Cancel
                                    </Text>
                                </Box>
                            </Pressable>

                            <Pressable _pressed={{ opacity: 0.6 }} onPress={onClose}>
                                <Box
                                    w={WIDTH / 2.5}
                                    alignItems={'center'}
                                    p={2}
                                    my={1}
                                    rounded={'2xl'}
                                    bg={{
                                        linearGradient: {
                                            colors: ['red.400', 'rose.400'],
                                            start: [0, 1],
                                            end: [1, 1],
                                        },
                                    }}>
                                    <Text fontWeight={'semibold'} color={'#fff'}>
                                        Delete
                                    </Text>
                                </Box>
                            </Pressable>
                        </Row>
                    </Box>
                </BottomSheet> */}
      </Box>
    </PrivateContainer>
  );
};

export default Notifications;
