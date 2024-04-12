import React, {useState} from 'react';
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  InputField,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {IMAGES} from '~/Assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/routes/private/types';
import AppIcon from '~/Components/core/AppIcon';
import {PrivateContainer} from '~/Components/container';

const ChatDetails = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const messageArray = [
    {
      id: '1',
      message: 'Hello',
      time: '10:00 AM',
      senderText: 'Hy, I am fine',
    },
  ];

  return (
    <PrivateContainer
      hasBackIcon={true}
      title={'Demo User'}
      icons={[
        {
          icon: {MaterialIconsName: 'add-call'},
          onPress: () => {},
          side: 'RIGHT',
        },
        {
          icon: {MaterialIconsName: 'payment'},
          onPress: () => {},
          side: 'RIGHT',
        },
      ]}>
      <Box flex={1} mt={'$3'}>
        <FlatList
          data={messageArray}
          renderItem={({item}: any) => (
            <Box mt={'$1'}>
              <Text ml={'$2'}>{item?.senderText}</Text>
              <Box alignSelf="flex-end" pr={'$4'}>
                <Text>{item?.message}</Text>
              </Box>
            </Box>
          )}
        />
        <Box mb="$3" px={'$3'}>
          <HStack gap={'$2'}>
            <Input
              flex={1}
              variant="outline"
              size="md"
              isDisabled={false}
              borderRadius={20}
              alignItems="center"
              borderColor="$coolGray300"
              isInvalid={false}
              isReadOnly={false}>
              <InputField placeholder="Enter Text here" fontSize={12} />
            </Input>
            <Pressable
              borderRadius={20}
              h={'$10'}
              w={'$10'}
              bg={'$blue200'}
              alignItems={'center'}
              justifyContent={'center'}>
              <AppIcon IoniconsName="send" size={22} color={'blue'} />
            </Pressable>
          </HStack>
        </Box>
      </Box>
    </PrivateContainer>
  );
};

export default ChatDetails;
