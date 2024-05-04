import React, {useState} from 'react';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {
  Box,
  FormControl,
  HStack,
  Image,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  MailIcon,
  Pressable,
  ScrollView,
  Text,
  VStack,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {WIDTH} from '~/Utils';
import AppIcon from '~/Components/core/AppIcon';
import {COLORS} from '~/Styles';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';

const AdminDashboard = () => {
  const boxData = [
    {
      id: '1',
      name: 'Total Users',
      count: '760',
      icon: (
        <AppIcon IoniconsName={'people'} size={28} color={COLORS.secondary} />
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
          color={COLORS.secondary}
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
          color={COLORS.secondary}
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
          color={COLORS.secondary}
        />
      ),
      source: IMAGES.USER,
    },
  ];
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [commission, setCommission] = useState('');
  const handleCommissionChange = (value: any) => {
    setCommission(value);
  };
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Notifications'),
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => navigate('Settings'),
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
                    p={'$6'}
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
                      borderColor={'blue.300'}>
                      {/* <Image
                        source={item?.source}
                        h={'$10'}
                        w={'$10'}
                        alt={item?.name}
                      /> */}
                      {item?.icon}
                    </Box>
                    <Box alignItems={'center'} my={'$3'}>
                      <Text fontFamily={'Montserrat-Bold'} fontSize={13}>
                        {item?.count}
                      </Text>
                      <Text
                        fontWeight={'semibold'}
                        fontSize={14}
                        fontFamily={'Montserrat-Bold'}>
                        {item?.name}
                      </Text>
                    </Box>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </Box>

          <FormControl p="$4">
            <VStack space="xs">
              <Text fontFamily={'Montserrat-Bold'} fontSize={13}>
                Add Your Commission
              </Text>
              <Input>
                <InputField
                  type="text"
                  value={commission}
                  onChangeText={handleCommissionChange}
                />
                <InputSlot pr="$3">
                  <AppIcon
                    MaterialIconsName="percent"
                    size={25}
                    color="black"
                  />
                </InputSlot>
              </Input>
              <Button
                ml="auto"
                onPress={() => {
                  // setShowModal(false);
                }}>
                <ButtonText color="$white">Add</ButtonText>
              </Button>
            </VStack>
          </FormControl>
        </Box>
      </ScrollView>
    </PrivateContainer>
  );
};

export default AdminDashboard;
