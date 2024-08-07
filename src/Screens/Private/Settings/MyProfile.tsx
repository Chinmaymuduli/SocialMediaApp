import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {IMAGES} from '~/Assets';
import {PrivateContainer} from '~/Components/container';
import AppIcon from '~/Components/core/AppIcon';
import FetchLoader from '~/Components/core/FetchLoader';
import {UserPost} from '~/Components/screens';
import {useAppContext} from '~/Contexts';
import {useMutation, useSwrApi} from '~/Hooks';
import {COLORS} from '~/Styles';

const MyProfile = () => {
  const {userData} = useAppContext();

  const {data, isValidating, mutate} = useSwrApi(`users/read/${userData?._id}`);

  if (isValidating)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size={'large'} />
      </Box>
    );

  return (
    <PrivateContainer title={'My Profile'} bg={'purple.50'} hasBackIcon={true}>
      <ScrollView contentContainerStyle={{paddingBottom: 70}}>
        <HStack
          px={'$4'}
          py={'$3'}
          justifyContent="space-between"
          alignItems="center">
          <Box borderWidth={2} borderRadius={50} borderColor={COLORS.secondary}>
            <Image
              source={
                data?.data?.data?.avatar
                  ? {uri: data?.data?.data?.avatar}
                  : IMAGES.USER
              }
              alt="image"
              style={{height: 70, width: 70, borderRadius: 50}}
            />
          </Box>
          <HStack gap={'$7'}>
            <VStack alignItems="center" justifyContent="center">
              <Text
                color={'$black'}
                fontFamily="Montserrat-Medium"
                fontSize={13}>
                {data?.data?.data?.total_posts || 0}
              </Text>
              <Text color={'$black'} fontSize={12} fontFamily="Montserrat-Bold">
                Posts
              </Text>
            </VStack>
            <VStack alignItems="center" justifyContent="center">
              <Text
                color={'$black'}
                fontFamily="Montserrat-Medium"
                fontSize={13}>
                {data?.data?.data?.total_followers || 0}
              </Text>
              <Text color={'$black'} fontFamily="Montserrat-Bold" fontSize={12}>
                Followers
              </Text>
            </VStack>
            <VStack alignItems="center" justifyContent="center">
              <Text
                color={'$black'}
                fontFamily="Montserrat-Medium"
                fontSize={13}>
                {data?.data?.data?.total_followings || 0}
              </Text>
              <Text color={'$black'} fontFamily="Montserrat-Bold" fontSize={12}>
                Following
              </Text>
            </VStack>
          </HStack>
        </HStack>
        <VStack px={'$4'}>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            {data?.data?.data?.nick_name}
          </Text>
          <HStack alignItems="center" gap={'$2'}>
            {data?.data?.data?.interests?.map((item: any) => (
              <Text
                fontFamily="Montserrat-Medium"
                fontSize={13}
                key={item?._id}>
                {item?.label},
              </Text>
            ))}
          </HStack>

          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            {data?.data?.data?.location_details?.city +
              ' | ' +
              data?.data?.data?.location_details?.state}
          </Text>

          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            {data?.data?.data?.email}
          </Text>
        </VStack>

        <Pressable mb={'$4'} mt={'$7'} px={'$2'}>
          <HStack alignItems={'center'} px={'$3'} gap={'$3'}>
            <AppIcon AntDesignName="table" size={20} />
            <Text
              color={'black'}
              fontFamily="Montserrat-Medium"
              fontSize={13}
              fontWeight={'bold'}
              py={1}>
              {'All Posts'}
            </Text>
          </HStack>
        </Pressable>
        <Box w={'100%'} h={'$0.5'} bgColor={'$pink300'}></Box>

        <Box>
          {data?.data?.data?.posts?.length > 0 ? (
            <UserPost
              postData={data?.data?.data?.posts}
              isFormUser={true}
              mutate={mutate}
            />
          ) : (
            <Box mt={'$4'} alignItems="center">
              <Image
                source={IMAGES.CONNECT}
                style={{
                  height: 120,
                  width: 120,
                }}
                alt="img"
              />
              <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$4'}>
                No Post Found
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    </PrivateContainer>
  );
};

export default MyProfile;
