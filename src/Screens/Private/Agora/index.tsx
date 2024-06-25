import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '~/Routes/Private/types';
import {Box, HStack, Pressable, VStack} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import {COLORS} from '~/Styles';
import {Avatar} from '@gluestack-ui/themed';
import {AvatarFallbackText} from '@gluestack-ui/themed';
import {AvatarImage} from '@gluestack-ui/themed';
import AppIcon from '~/Components/core/AppIcon';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
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
  const [isJoinLoading, setJoinLoading] = React.useState(false);
  const [isLeaveLoading, setLeaveLoading] = React.useState(false);
  const [message, setMessage] = useState('');
  const appId = 'eae9231f9e4a45748e2ac4208f87421f';
  const channelName = params?.channelId;
  const token = '92d00f7b953b4e6d8efb3e67baf1af33';
  const uid = 1234567892;
  const {userData} = useAppContext();

  console.log({params});
  // Get Token
  React.useEffect(() => {
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
    setupVoiceSDKEngine();
  }, [appId]);
  function showMessage(msg: string) {
    setMessage(msg);
  }

  const setupVoiceSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }

      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      const res = agoraEngine.initialize({
        appId: appId,
      });
      console.log({res});
      console.log('Agora engine initialized successfully');
    } catch (e) {
      console.log(e);
    }
  };

  console.log({isJoined});

  // Call End
  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      console.log('leave channel successfully');
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  // Join Call
  useEffect(() => {
    if (isJoined) {
      setJoinLoading(false);
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      if (isHost) {
        // agoraEngineRef.current?.startPreview();
        const joinUser = agoraEngineRef.current?.joinChannel(
          token,
          channelName,
          uid,
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          },
        );
        console.log({joinUser});
        console.log('user host use calling');
      } else {
        agoraEngineRef.current?.joinChannel(
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
      console.log(e);
    }
  }, [isJoined, isHost, userData?._id, tokenData]);

  const join = async () => {
    setJoinLoading(true);
    console.log('joining channel');
    if (isJoined) {
      setJoinLoading(false);
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleAudience,
      });
      console.log('User 2 join');
      setJoinLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  // const join = async () => {
  //   setJoinLoading(true);
  //   console.log('joining channel');
  //   if (isJoined) {
  //     setJoinLoading(false);
  //     return;
  //   }
  //   try {
  //     agoraEngineRef.current?.setChannelProfile(
  //       ChannelProfileType.ChannelProfileCommunication,
  //     );
  //     if (isHost) {
  //       agoraEngineRef.current?.startPreview();
  //       agoraEngineRef.current?.joinChannel(token, channelName, uid, {
  //         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
  //       });
  //       console.log('user host calling');
  //     } else {
  //       agoraEngineRef.current?.joinChannel(token, channelName, uid, {
  //         clientRoleType: ClientRoleType.ClientRoleAudience,
  //       });
  //       console.log('User 2 join');
  //     }
  //     setJoinLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
                setIsMicOff(!isMicOff), join();
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
              onPress={() => {
                // navigation.goBack();
                leave();
              }}
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
    // borderRadius: 5,
  },
});
