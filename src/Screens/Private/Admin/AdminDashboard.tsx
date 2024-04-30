import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {WIDTH} from '~/Utils';
import AppIcon from '~/Components/core/AppIcon';
import {COLORS} from '~/Styles';

const AdminDashboard = () => {
  const boxData = [
    {
      id: '1',
      name: 'Total Users',
      count: '760',
      icon: (
        <AppIcon IoniconsName={'people'} size={28} color={COLORS.textWhite} />
      ),
      source: IMAGES.USER,
    },
    {
      id: '2',
      name: 'Total Meetings',
      count: '180',
      icon: (
        <AppIcon
          MaterialCommunityIconsName={'folder-account'}
          size={28}
          color={COLORS.textWhite}
        />
      ),
      source: IMAGES.USER,
    },
    {
      id: '3',
      name: 'Payment',
      count: '21',
      icon: (
        <AppIcon
          MaterialIconsName={'meeting-room'}
          size={28}
          color={COLORS.textWhite}
        />
      ),
      source: IMAGES.USER,
    },
    {
      id: '4',
      name: 'Posts',
      count: '42',
      icon: (
        <AppIcon
          AntDesignName={'calendar'}
          size={28}
          color={COLORS.textWhite}
        />
      ),
      source: IMAGES.USER,
    },
    {
      id: '5',
      name: 'Total Department',
      count: '42',
      icon: (
        <AppIcon
          AntDesignName={'calendar'}
          size={28}
          color={COLORS.textWhite}
        />
      ),
      source: IMAGES.USER,
    },
    {
      id: '6',
      name: 'Research',
      count: '17',
      icon: (
        <AppIcon
          AntDesignName={'calendar'}
          size={28}
          color={COLORS.textWhite}
        />
      ),
      source: IMAGES.USER,
    },
  ];
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => {},
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => {},
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <ScrollView>
        <Box mx={'$2'}>
          <Box my={'$3'}>
            <HStack flexWrap={'wrap'}>
              {boxData?.slice(0, 4)?.map((item, index) => (
                <Pressable key={index}>
                  <Box
                    m={'$2'}
                    p={'$4'}
                    softShadow={'1'}
                    w={WIDTH / 2.31}
                    rounded={'$xl'}
                    bg={'$pink100'}
                    alignItems={'center'}>
                    <Box
                      p={'$3'}
                      softShadow={'1'}
                      bg={'white'}
                      rounded={'$full'}
                      borderColor={'blue.300'}
                      // borderLeftWidth={'$3'}
                      // borderRightWidth={'$3'}
                    >
                      <Image
                        source={item?.source}
                        h={'$10'}
                        w={'$10'}
                        alt={item?.name}
                      />
                    </Box>
                    <Box alignItems={'center'} my={'$3'}>
                      <Text
                        fontWeight={'bold'}
                        //   fontSize={'$20'}
                        fontFamily={'Montserrat-Bold'}>
                        {item?.count}
                      </Text>
                      <Text
                        fontWeight={'semibold'}
                        //   fontSize={'$12'}
                        fontFamily={'Montserrat-Bold'}>
                        {item?.name}
                      </Text>
                    </Box>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </Box>
        </Box>
      </ScrollView>
    </PrivateContainer>
  );
};

export default AdminDashboard;
