import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {IMAGES} from '~/Assets';
import {PrivateContainer} from '~/Components/container';
import {Button} from '~/Components/core';
import AppIcon from '~/Components/core/AppIcon';
import {UserCaption, UserPost} from '~/Components/screens';
import {COLORS} from '~/Styles';

const UserProfile = () => {
  const [selectSwitch, setSelectSwitch] = useState<string>('Posts');
  const HEADER_BTN = [
    {
      id: 'b1',
      title: 'Posts',
      icon: {AntDesignName: 'table'},
    },
    {
      id: 'b2',
      title: 'Captions',
      icon: {AntDesignName: 'edit'},
    },
  ];

  return (
    <PrivateContainer title="Demo User" bg={'purple.50'} hasBackIcon={true}>
      <ScrollView contentContainerStyle={{paddingBottom: 70}}>
        <HStack
          px={'$4'}
          py={'$3'}
          justifyContent="space-between"
          alignItems="center">
          <Box borderWidth={2} borderRadius={50} borderColor={COLORS.secondary}>
            <Image
              source={IMAGES.USER}
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
                1215
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
                956
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
                566
              </Text>
              <Text color={'$black'} fontFamily="Montserrat-Bold" fontSize={12}>
                Following
              </Text>
            </VStack>
          </HStack>
        </HStack>
        <VStack px={'$4'}>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            Chinmay Muduli
          </Text>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            Coding
          </Text>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            Hyderabad | Fitness | Perfectional Coder
          </Text>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            demo@gmail.com
          </Text>
        </VStack>
        <HStack px={'$4'} gap={'$10'} mt={'$4'}>
          <Button borderRadius={5}>
            <Text color="$white" fontFamily="Montserrat-Medium" fontSize={13}>
              Connect
            </Text>
          </Button>
          <Button borderRadius={5}>
            <Text color="$white" fontFamily="Montserrat-Medium" fontSize={13}>
              Message
            </Text>
          </Button>
        </HStack>
        <Box mt={'$8'} flex={1}>
          <FlatList
            data={HEADER_BTN}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}: any) => (
              <>
                <Pressable
                  w={Dimensions.get('window').width / 2}
                  mb={'$4'}
                  justifyContent="center"
                  alignItems="center"
                  onPress={() => {
                    setSelectSwitch(item?.title);
                  }}>
                  <HStack alignItems={'center'} px={'$3'} gap={'$3'}>
                    <AppIcon {...item.icon} size={20} />
                    <Text
                      color={'black'}
                      fontFamily="Montserrat-Medium"
                      fontSize={13}
                      fontWeight={
                        selectSwitch === item?.title ? 'bold' : 'medium'
                      }
                      py={1}>
                      {item?.title}
                    </Text>
                  </HStack>
                </Pressable>
              </>
            )}
          />
          <Box w={'100%'} h={'$0.5'} bgColor="$coolGray200"></Box>
          {selectSwitch === 'Posts' ? (
            <Box
              w={'50%'}
              h={'$0.5'}
              bgColor={COLORS.secondary}
              position="absolute"
              top={'$9'}></Box>
          ) : (
            <Box
              w={'50%'}
              h={'$0.5'}
              bgColor={COLORS.secondary}
              position="absolute"
              top={'$9'}
              left={'50%'}></Box>
          )}
        </Box>
        {selectSwitch === 'Posts' && <UserPost />}
        {selectSwitch === 'Captions' && <UserCaption />}
      </ScrollView>
    </PrivateContainer>
  );
};

export default UserProfile;
