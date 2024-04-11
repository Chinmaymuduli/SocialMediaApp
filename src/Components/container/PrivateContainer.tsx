import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {COLORS} from '~/Styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Box, HStack, Image, Pressable, Text} from '@gluestack-ui/themed';
import {SafeAreaView} from '@gluestack-ui/themed';
import AppIcon from '../core/AppIcon';
type Props = {
  title?: string;
  color?: string;
  image?: ImageSourcePropType;
  hasBackIcon?: boolean;
  icons?: {
    icon?: any;
    onPress?: () => void;
    side: 'LEFT' | 'RIGHT';
  }[];
} & React.ComponentProps<typeof Box>;
const PrivateContainer = ({
  children,
  color,
  hasBackIcon,
  title,
  icons,
  image,
  ..._box
}: Props) => {
  const {canGoBack, goBack} = useNavigation();
  const leftIcon = icons?.find(_ => _.side === 'LEFT');
  const rightIcons = icons?.filter(_ => _.side === 'RIGHT');
  return (
    <SafeAreaView flex={1} bg={'white'}>
      {/* <Box {..._box}> */}
      <Box bgColor={'white'} softShadow="1">
        <HStack
          px={'$3'}
          bg={color}
          alignItems={'center'}
          justifyContent={'space-between'}
          py={'$3'}>
          <HStack alignItems={'center'} gap={'$3'}>
            {hasBackIcon && (
              <Pressable
                onPress={() => {
                  if (leftIcon?.onPress) return leftIcon.onPress();
                  if (canGoBack()) return goBack();
                }}
                h={'$9'}
                w={'$9'}
                borderRadius={12}
                bgColor={'white'}
                softShadow="1"
                alignItems={'center'}
                justifyContent={'center'}>
                <FontAwesome6
                  name="chevron-left"
                  size={24}
                  color={COLORS.secondary}
                />
              </Pressable>
            )}
            {image ? (
              <Image
                source={image}
                alt="image"
                style={{height: 30, width: 100}}
                resizeMode="contain"
              />
            ) : (
              <Text fontSize="$lg" fontFamily={'Montserrat-Medium'}>
                {title}
              </Text>
            )}
          </HStack>
          <HStack
            alignItems={'center'}
            gap={rightIcons?.length! > 0 ? '$5' : '$0'}>
            {rightIcons?.map((_, i) => (
              <React.Fragment key={i}>
                <Pressable
                  onPress={() => {
                    if (_?.onPress) return _.onPress();
                  }}>
                  <AppIcon size={25} color={COLORS.secondary} {..._?.icon} />
                </Pressable>
              </React.Fragment>
            ))}
          </HStack>
        </HStack>
      </Box>
      {children}
      {/* </Box> */}
    </SafeAreaView>
  );
};

export default PrivateContainer;
