import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '~/Routes/Private/types';
import {Box, HStack, Pressable} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import {COLORS} from '~/Styles';
import {Avatar} from '@gluestack-ui/themed';
import {AvatarFallbackText} from '@gluestack-ui/themed';
import {AvatarImage} from '@gluestack-ui/themed';
import AppIcon from '~/Components/core/AppIcon';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'AgoraVoiceCall'>;
const AgoraVoiceCall = ({route: {params}, navigation}: Props) => {
  const [isMicOff, setIsMicOff] = useState(false);
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
        <Box position={'absolute'} top={'34%'} left={'35%'}>
          <Box alignItems={'center'}>
            <Text fontFamily="Montserrat-Bold" fontSize={20} color={'$black'}>
              {params?.nickName}
            </Text>
            <Text
              fontFamily="Montserrat-SemiBold"
              fontSize={20}
              color={'$black'}>
              Calling
            </Text>
          </Box>
        </Box>
        <Box position={'absolute'} bottom={'5%'} left={'28%'}>
          <HStack gap={'$16'}>
            <Pressable
              onPress={() => setIsMicOff(!isMicOff)}
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
                navigation.goBack();
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
