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
  Text,
} from '@gluestack-ui/themed';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {useNavigation} from '@react-navigation/native';
import {VStack} from '@gluestack-ui/themed';

const Messages = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
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
          data={Array(20).fill('')}
          renderItem={({item}) => (
            <Pressable
              bgColor={'#00000000'}
              px={'$4'}
              py={'$2'}
              onPress={() => navigate('ChatDetails')}>
              <HStack gap={'$3'} alignItems={'center'}>
                <Pressable>
                  <Avatar>
                    <AvatarFallbackText>Chinmay Muduli</AvatarFallbackText>
                    <AvatarImage
                      source={IMAGES.USER}
                      alt="img"
                      h={'$12'}
                      w={'$12'}
                    />
                  </Avatar>
                </Pressable>
                <VStack flex={1}>
                  <Text fontFamily={'Montserrat-Bold'} fontSize={12}>
                    {'Demo User'}
                  </Text>
                  <Text
                    color={'#94a3b8'}
                    fontFamily={'Montserrat-Medium'}
                    fontSize={13}>
                    {'hello'}
                  </Text>
                </VStack>
                <Text color={'#94a3b8'} fontSize={11}>
                  {new Date().toDateString()}
                </Text>
              </HStack>
            </Pressable>
          )}
        />
      </Box>
    </PrivateContainer>
  );
};

export default Messages;
