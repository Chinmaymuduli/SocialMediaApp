import {
  Actionsheet,
  Box,
  FormControl,
  HStack,
  Heading,
  Text,
  Input,
  Pressable,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import AppIcon, {IconProps} from './AppIcon';
import BottomSheet from './BottomSheet';
import {WIDTH} from '~/utils';
import {COLORS} from '~/styles';
import {Dimensions} from 'react-native';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  setSelectGender: (selectGender: string) => void;
  selectGender: string;
};
export default function GenderPicker({
  isOpen,
  onClose,
  selectGender,
  setSelectGender,
}: Props) {
  const GENDER_DATA = [
    {
      id: 'MALE',
      title: 'Male',
      icon: {
        MaterialCommunityIconsName: 'gender-male',
      },
    },
    {
      id: 'FEMALE',
      title: 'Female',
      icon: {
        MaterialCommunityIconsName: 'gender-female',
      },
    },
    {
      id: 'OTHER',
      title: 'Other',
      icon: {
        MaterialCommunityIconsName: 'gender-transgender',
      },
    },
  ];
  return (
    <BottomSheet
      visible={isOpen}
      onDismiss={() => {
        onClose();
      }}>
      <Box bg={'white'}>
        <HStack
          p={2}
          width={Dimensions.get('window').width}
          borderBottomWidth={1}
          //   borderBottomRadius={10}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottomColor={'coolGray.400'}>
          <Text
            mx={1}
            fontSize={'$md'}
            fontWeight={'bold'}
            color={COLORS.primary}>
            Select Gender :
          </Text>
          <AppIcon
            size={25}
            color={'#e11d48'}
            AntDesignName="close"
            style={{
              paddingRight: 20,
            }}
            onPress={onClose}
          />
        </HStack>

        <Box my={5} alignItems={'center'}>
          {GENDER_DATA &&
            GENDER_DATA?.map(
              (
                item: {
                  icon: any;
                  title: string;
                  id: string;
                },
                index,
              ) => (
                <Pressable
                  key={index}
                  _pressed={{opacity: 0.6}}
                  onPress={() => {
                    setSelectGender(item?.id), onClose();
                  }}>
                  <Row
                    w={WIDTH / 1.2}
                    space={3}
                    alignItems={'center'}
                    justifyContent={'center'}
                    p={2}
                    my={1}
                    rounded={'2xl'}
                    bg={
                      selectGender === item?.id
                        ? {
                            linearGradient: {
                              colors: ['green.400', 'teal.400'],
                              start: [0, 1],
                              end: [1, 1],
                            },
                          }
                        : 'coolGray.200'
                    }>
                    <Box w={'43%'} alignItems={'flex-end'}>
                      <AppIcon {...item?.icon} size={18} color={'#000'} />
                    </Box>
                    <Box w={'57%'} alignItems={'flex-start'}>
                      <Text
                        fontWeight={'semibold'}
                        color={'#000'}
                        fontSize={'md'}>
                        {item?.title}
                      </Text>
                    </Box>
                  </Row>
                </Pressable>
              ),
            )}
        </Box>
      </Box>
    </BottomSheet>
  );
}
