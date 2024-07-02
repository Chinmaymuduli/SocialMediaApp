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
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [isHost, setIsHost] = useState(params?.isHost);
  const [isJoinLoading, setJoinLoading] = useState(false);
  const [isLeaveLoading, setLeaveLoading] = useState(false);
  const [message, setMessage] = useState('');
  const appId = 'eae9231f9e4a45748e2ac4208f87421f';
  const channelName = params?.channelId;
  const token =
    '007eJxSYOBn3T410HRRV02FIv+t+TMWPDGydzUTPjNFXXdO87SdazMUGFITUy2NjA3TLFNNEk1MzU0sUo0Sk02MDCzSLMxNjAzT0jVa0gT4GBjCfStYGBkYGVgYGBlAfCYwyQwmWcCkBIOZmbmZZVKysamhiYWZSZplmkWKaZpJmiUbg6GRsYmpGSAAAP//f0Ahww==';
  const uid = 123456;
  const {userData} = useAppContext();

  const agoraEventHandler: IRtcEngineEventHandler = {
    onJoinChannelSuccess: (_connection, uid) => {
      console.log('Successfully joined the channel');
      showMessage('Successfully joined the channel ' + channelName);
      setIsJoined(true);
    },
    onUserJoined: (_connection, Uid) => {
      console.log({Uid});
      showMessage('Remote user joined with uid ' + Uid);
      setRemoteUid(Uid);
    },
    onUserOffline: (_connection, Uid) => {
      showMessage('Remote user left the channel. uid: ' + Uid);
      setRemoteUid(0);
    },
    onLeaveChannel: _connection => {
      console.log('Left the channel');
      showMessage('Left the channel');
      setIsJoined(false);
      navigation.goBack();
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
        console.log('Agora engine initialized successfully');
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

  function showMessage(msg: string) {
    setMessage(msg);
    console.log(msg);
  }

  const leave = () => {
    try {
      const leaveRes = agoraEngineRef.current?.leaveChannel();
      console.log({leaveRes});
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      console.log('Leave channel successfully');
      // navigation.goBack();
    } catch (e) {
      console.log('Error in leave:', e);
    }
  };

  useEffect(() => {
    const joinChannel = async () => {
      if (isJoined) {
        console.log('Already joined the channel');
        setJoinLoading(false);
        return;
      }
      try {
        const agoraEngine = agoraEngineRef.current;
        agoraEngine?.setChannelProfile(
          ChannelProfileType.ChannelProfileCommunication,
        );
        if (isHost) {
          const joinUser = agoraEngine?.joinChannel(token, channelName, uid, {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          });
          console.log({joinUser});
          console.log('User host use calling');
        } else {
          agoraEngine?.joinChannel(
            tokenData,
            channelName,
            Number(userData?._id),
            {
              clientRoleType: ClientRoleType.ClientRoleAudience,
            },
          );
          console.log('Remote user');
        }
        setJoinLoading(false);
      } catch (e) {
        console.log('Error in joinChannel:', e);
      }
    };
    joinChannel();
  }, [isHost, userData?._id, tokenData]);

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
                //  join();
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
              // onPress={joinChannel}
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
