import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '~/Routes/Private/types';
import {Box, HStack, Pressable, VStack} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import {COLORS} from '~/Styles';
import {Avatar, AvatarFallbackText, AvatarImage} from '@gluestack-ui/themed';
import AppIcon from '~/Components/core/AppIcon';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '~/Contexts';
import {BASE_URL} from '~/Utils';
import {TextareaInput} from '@gluestack-ui/config/build/theme';

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  }
};

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'AgoraVoiceCall'>;

const AgoraVoiceCall = ({route: {params}, navigation}: Props) => {
  const [isMicOff, setIsMicOff] = useState(false);
  const [tokenData, setToken] = useState('');
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);
  const [agoraToken, setAgoraToken] = useState<any>('');
  const [isHost, setIsHost] = useState(params?.isHost);
  const appId = 'eae9231f9e4a45748e2ac4208f87421f';
  const channelName = params?.channelId;
  const uid = 123456;

  const agoraEventHandler: IRtcEngineEventHandler = {
    onJoinChannelSuccess: (_connection, uid) => {
      console.log('Successfully joined the channel');
      setIsJoined(true);
    },
    onUserJoined: (_connection, Uid) => {
      console.log({Uid});
      setRemoteUid(Uid);
    },
    onUserOffline: (_connection, Uid) => {
      setRemoteUid(0);
      console.log({_connection});
      console.log('Remote user offline');
    },
    onLeaveChannel: _connection => {
      console.log('Left the channel');
      setIsJoined(false);
      navigation.navigate('Messages');
    },
  };

  useEffect(() => {
    const getTokenData = async () => {
      try {
        const value = await AsyncStorage.getItem('accessToken');
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        console.log('error', e);
      }
    };
    getTokenData();
  }, []);

  const tokenCreateFn = async () => {
    try {
      const fetchData = await fetch(
        `${BASE_URL}/meetings/generate-agora-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenData}`,
          },
          body: JSON.stringify({
            channel_name: String(channelName),
            uid: String(uid),
            role: 'publisher',
            expire_time: 3600,
          }),
        },
      );
      const token = await fetchData.json();
      console.log(token.data?.token, '===========');
      return token.data?.token;
    } catch (error) {
      new Error();
      console.log(error);
    }
  };

  useEffect(() => {
    tokenCreateFn().then(res => {
      setAgoraToken(res);
    });
  }, [tokenData]);

  useEffect(() => {
    const setupVoiceSDKEngine = async () => {
      try {
        if (Platform.OS === 'android') {
          await getPermission();
        }

        const agoraEngine = createAgoraRtcEngine();
        agoraEngineRef.current = agoraEngine;

        agoraEngine.registerEventHandler(agoraEventHandler);

        agoraEngine.initialize({appId});
      } catch (e) {
        console.log('Error in setupVoiceSDKEngine:', e);
      }
    };

    setupVoiceSDKEngine();

    return () => {
      const agoraEngine = agoraEngineRef.current;
      if (agoraEngine) {
        agoraEngine.leaveChannel();
        agoraEngine.unregisterEventHandler(agoraEventHandler);
        agoraEngine.release();
      }
    };
  }, []);

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      console.log('Leave channel successfully');
      navigation.navigate('Messages');
    } catch (e) {
      console.log('Error in leave:', e);
    }
  };

  useEffect(() => {
    const joinChannel = async () => {
      if (isJoined) {
        console.log('Already joined the channel');
        return;
      }
      try {
        const agoraEngine = agoraEngineRef.current;
        agoraEngine?.setChannelProfile(
          ChannelProfileType.ChannelProfileCommunication,
        );
        if (isHost) {
          console.log({agoraToken, channelName, uid});
          const joinUser = await agoraEngine?.joinChannel(
            agoraToken,
            channelName,
            uid,
            {
              clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            },
          );
          console.log({joinUser});
        } else {
          await agoraEngine?.joinChannel(agoraToken, channelName, 521456, {
            clientRoleType: ClientRoleType.ClientRoleAudience,
          });
          console.log('Remote user');
        }
      } catch (e) {
        console.log('Error in joinChannel:', e);
      }
    };
    if (agoraToken) {
      joinChannel();
    }
  }, [isHost, agoraToken]);

  console.log({isJoined});

  return (
    <Box flex={1}>
      <LinearGradient
        colors={['#F5E3E6', '#F6F6F6']}
        style={styles.linearGradient}>
        <Box alignItems={'center'}>
          <Avatar mt={'$32'}>
            <AvatarFallbackText>{params?.nickName}</AvatarFallbackText>
            <AvatarImage
              source={params?.avatar}
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
            <Text fontFamily="Montserrat-Bold" fontSize={20} color={'$black'}>
              {params?.nickName}
            </Text>
            <Text
              fontFamily="Montserrat-SemiBold"
              fontSize={20}
              color={'$black'}>
              Calling
            </Text>
          </VStack>
        </Box>
        <Box position={'absolute'} bottom={'5%'} left={'28%'}>
          <HStack gap={'$16'}>
            <Pressable
              onPress={() => {
                setIsMicOff(!isMicOff);
              }}
              bg={'$pink600'}
              borderRadius={40}
              h={'$16'}
              w={'$16'}
              alignItems={'center'}
              justifyContent={'center'}>
              <AppIcon
                FontAwesomeName={isMicOff ? 'microphone-slash' : 'microphone'}
                size={30}
                color={'white'}
              />
            </Pressable>

            <Pressable
              onPress={leave}
              bg={'$red500'}
              borderRadius={40}
              h={'$16'}
              w={'$16'}
              alignItems={'center'}
              justifyContent={'center'}>
              <AppIcon MaterialIconsName="call-end" size={30} color={'white'} />
            </Pressable>
          </HStack>
        </Box>
      </LinearGradient>
    </Box>
  );
};

export default AgoraVoiceCall;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
