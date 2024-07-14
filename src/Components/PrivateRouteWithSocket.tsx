import {HStack, Pressable, Text, VStack} from '@gluestack-ui/themed';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import io from 'socket.io-client';
import {IMAGES} from '~/Assets';
import PrivateRoutes from '~/Routes/Private';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {HEIGHT, SOCKET_BASE_URL} from '~/Utils';
import AppIcon from './core/AppIcon';

const PrivateRouteWithSocket = ({initialRouteName}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [incomingCall, setIncomingCall] = useState(false);
  const socket = io(SOCKET_BASE_URL);
  useEffect(() => {
    socket.on('incomingCall', () => {
      setIncomingCall(true);
    });

    return () => {
      socket.off('incomingCall');
    };
  }, []);

  const handleAcceptCall = () => {
    setIncomingCall(false);
    navigate('AgoraVoiceCall', {
      avatar: '',
      nickName: '',
      channelId: '',
      isHost: false,
    });
  };

  const handleDeclineCall = () => {
    setIncomingCall(false);
  };

  return (
    <>
      <PrivateRoutes initialRouteName={initialRouteName} />
      <Modal animationType="slide" transparent={true} visible={incomingCall}>
        <Box flex={1}>
          <LinearGradient
            colors={['#F5E3E6', '#F6F6F6']}
            style={styles.linearGradient}>
            <Box alignItems={'center'}>
              <Avatar mt={'$32'}>
                <AvatarFallbackText>{'John'}</AvatarFallbackText>
                <AvatarImage
                  source={IMAGES.USER}
                  alt="img"
                  h={'$40'}
                  w={'$40'}
                />
              </Avatar>
            </Box>
            <Box
              position={'absolute'}
              top={'34%'}
              justifyContent="center"
              left={'4%'}
              w={'100%'}>
              <VStack gap={'$2'} alignItems={'center'}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={20}
                  color={'$black'}>
                  Incoming Call
                </Text>
                <Text
                  fontFamily="Montserrat-Bold"
                  fontSize={20}
                  color={'$black'}>
                  {'RAMA'}
                </Text>
              </VStack>
            </Box>
            <Box position={'absolute'} bottom={'5%'} left={'15%'}>
              <HStack gap={'$32'}>
                <Pressable
                  onPress={handleDeclineCall}
                  bg={'$pink600'}
                  borderRadius={40}
                  h={'$16'}
                  w={'$16'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <AppIcon
                    MaterialIconsName="call-end"
                    size={30}
                    color={'white'}
                  />
                </Pressable>

                <Pressable
                  onPress={handleAcceptCall}
                  bg={'$green700'}
                  borderRadius={40}
                  h={'$16'}
                  w={'$16'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <AppIcon MaterialIconsName="call" size={30} color={'white'} />
                </Pressable>
              </HStack>
            </Box>
          </LinearGradient>
        </Box>
      </Modal>
    </>
  );
};

export default PrivateRouteWithSocket;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
