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
  Pressable,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';

const AllUsers = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Notifications'),
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => navigate('Settings'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      {/* <Text>Hello</Text> */}

      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={Array(10).fill('')}
        renderItem={({item}) => (
          <HStack
            gap={'$3'}
            alignItems={'center'}
            bgColor={'#00000000'}
            px={'$4'}
            py={'$2'}>
            <Avatar>
              <AvatarFallbackText>Demo User</AvatarFallbackText>
              <AvatarImage
                // source={IMAGES.USER}
                alt="img"
                h={'$12'}
                w={'$12'}
              />
            </Avatar>

            <VStack flex={1}>
              <Text fontFamily={'Montserrat-Bold'} fontSize={12}>
                {'DemoUser@gmail.com'}
              </Text>
              <Text
                color={'#94a3b8'}
                fontFamily={'Montserrat-Medium'}
                fontSize={13}>
                {'user'}
              </Text>
              <Text color={'#94a3b8'} fontSize={10}>
                {new Date().toDateString()}
              </Text>
            </VStack>

            <HStack alignItems={'center'} justifyContent={'center'} gap={'$3'}>
              <Pressable>
                <Switch size="sm" />
              </Pressable>
              <Pressable>
                <MaterialIcons
                  name="delete"
                  style={{fontSize: 20, color: 'red'}}
                />
              </Pressable>
            </HStack>
          </HStack>
        )}
      />
    </PrivateContainer>
  );
};

export default AllUsers;
