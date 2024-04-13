import React from 'react';
import AppIcon, {IconProps} from './AppIcon';
import {COLORS} from '~/Styles';
import {HStack, Pressable, Spinner, Text} from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';

type RowProps = React.ComponentProps<typeof HStack>;
type TextProps = React.ComponentProps<typeof Text>;

type ButtonProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  colors?: Array<string>;
  icon?: IconProps;
  iconSide?: 'LEFT' | 'RIGHT';
  onPress?: () => void;
  _text?: TextProps;
  btnWidth?: any;
} & RowProps;

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  isDisabled = false,
  colors = [COLORS.primary, COLORS.secondary],
  icon,
  onPress,
  _text,
  btnWidth,
  iconSide = 'LEFT',
  ..._row
}) => {
  const renderIcon = () => {
    if (isLoading) {
      return <Spinner color={'white'} />;
    }
    if (icon) {
      return <AppIcon color={'#fff'} size={20} {...icon} />;
    }
    return null;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      w={btnWidth ? btnWidth : '45%'}
      bg="transparent">
      <LinearGradient
        colors={['#4c669f', COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          borderRadius: 10,
          overflow: 'hidden',
          marginHorizontal: 11,
        }}>
        <HStack
          // py="$2"
          // px="$4"
          // bgColor={COLORS.secondary}
          // gap="$1"
          alignItems="center"
          justifyContent={'center'}
          {..._row}>
          {iconSide === 'LEFT' && renderIcon()}
          {typeof children === 'string' ? (
            <Text color="white" fontWeight="600" {..._text}>
              {children}
            </Text>
          ) : (
            children
          )}
          {iconSide === 'RIGHT' && renderIcon()}
        </HStack>
      </LinearGradient>
    </Pressable>
  );
};

export default Button;
