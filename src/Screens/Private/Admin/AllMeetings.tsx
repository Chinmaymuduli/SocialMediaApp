import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  FlatList,
  HStack,
  Input,
  InputField,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {PrivateContainer} from '~/Components/container';
import AppIcon from '~/Components/core/AppIcon';
import {IMAGES} from '~/Assets';
import {MeetingData} from '../Settings/Meetings';
import {StyleSheet} from 'react-native';
import {COLORS} from '~/Styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import BottomSheet from '~/Components/core/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
interface Meeting {
  id: string;
  name: string;
  starttime: string;
  endtime: string;
  area: string;
  location: string;
  clientname: string;
  date: string;
  img: string;
  designation: string;
  meeting: string;
  day: string;
  person: string;
  type: string;
}
const AllMeetings = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [order, setOrder] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Meeting[]>();

  const Sort_Array = [
    {
      id: '13',
      title: 'Ongoing',
    },
    {
      id: '15',
      title: 'Closed',
    },
    {
      id: '16',
      title: 'Upcoming',
    },
    // {
    //   id: '19',
    //   title: 'CreatedAt Descending',
    // },
  ];

  useEffect(() => {
    if (order === 'All Meetings') {
      setData(MeetingData);
    } else {
      const filterData = MeetingData?.filter(item => item?.type === order);
      setData(filterData);
    }
  }, [order?.length]);
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
      {/* <Text>Hello</Text> */}
      <HStack
        px={'$3'}
        pt={'$5'}
        pb={'$1'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text bold fontSize={16}>
          All Meetings
        </Text>

        <Pressable onPress={() => setIsOpen(true)}>
          <HStack gap={'$2'} alignItems={'center'}>
            <AppIcon IoniconsName="filter" size={25} color={COLORS.secondary} />
            <Text fontWeight={'semibold'}>FilterBy</Text>
          </HStack>
        </Pressable>
      </HStack>

      <FlatList
        mb={'$10'}
        data={order?.length ? data : MeetingData}
        renderItem={({item}: any) => (
          <Pressable
            mx={'$3'}
            key={item?.id}
            mt={'$4'}
            borderRadius={5}
            borderColor={COLORS.textSecondary}
            softShadow={'1'}
            bgColor={'white'}>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              gap={'$2'}
              bg={'$pink50'}
              px={'$2'}
              py={'$1'}>
              <HStack>
                <AppIcon
                  AntDesignName="calendar"
                  size={20}
                  color={COLORS.secondary}
                />
                <Text fontSize={12} fontFamily="Montserrat-Bold">
                  {/* {item?.meeting} */}
                  Payment Date : {'20th April , 2024'}
                </Text>
              </HStack>
              <Box
                alignItems={'center'}
                bg={COLORS.secondary}
                px={'$3'}
                py={'$0.5'}
                borderRadius={10}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={13}
                  color={'$white'}>
                  1040.00
                </Text>
              </Box>
            </HStack>

            <Box px={'$3'} mt={'$2'}>
              <HStack justifyContent={'space-between'}>
                <VStack gap={'$0.5'}>
                  <Text fontFamily="Montserrat-Bold" fontSize={13}>
                    Meeting Date
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {item?.date}
                  </Text>
                </VStack>
                <VStack>
                  <Text fontFamily="Montserrat-Bold" fontSize={13}>
                    Meeting Time
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {item?.starttime}
                  </Text>
                </VStack>
              </HStack>
            </Box>
            <Box borderBottomWidth={1} borderStyle={'dashed'} py={'$2'}></Box>
            <HStack px={'$3'} py={'$3'} justifyContent={'space-between'}>
              <VStack
                gap={'$1'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                  Meeting With
                </Text>
                <Text
                  fontSize={13}
                  fontFamily="Montserrat-Bold"
                  px={'$2'}
                  color={COLORS.secondary}>
                  {'Demo user 1'}
                </Text>
                <Button
                  size="sm"
                  h={'$8'}
                  w={'$24'}
                  variant="outline"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}>
                  <ButtonText fontSize={12}>Feedback</ButtonText>
                </Button>
              </VStack>
              <Divider orientation="vertical" />
              <VStack
                gap={'$1'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                  Meeting By
                </Text>
                <Text
                  fontSize={13}
                  fontFamily="Montserrat-Bold"
                  px={'$2'}
                  color={COLORS.secondary}>
                  {'Demo user 2'}
                </Text>
                <Button
                  size="sm"
                  h={'$8'}
                  w={'$24'}
                  variant="outline"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}>
                  <ButtonText fontSize={12}>Feedback</ButtonText>
                </Button>
              </VStack>
            </HStack>
            {/* <Box position={'absolute'} bottom={0} right={0}>
              <Box
                bg={'blue.300'}
                p={2}
                borderTopLeftRadius={20}
                borderBottomRightRadius={5}>
                <AppIcon AntDesignName="arrowright" size={18} color={'black'} />
              </Box>
            </Box> */}
          </Pressable>
        )}
      />

      <BottomSheet
        visible={isOpen}
        onDismiss={() => {
          setIsOpen(false);
        }}>
        <VStack gap={2} mt={3}>
          <Text bold fontSize={16} px={2}>
            Status :{' '}
          </Text>
          <VStack gap={3}>
            {Sort_Array?.map((item, _) => (
              <Pressable
                key={item?.id}
                m={1}
                onPress={() => {
                  setOrder(item?.title), setIsOpen(false);
                }}
                borderWidth={1}
                borderRadius={20}
                borderColor={COLORS.primary}
                bgColor={order === item?.title ? COLORS.primary : 'white'}>
                <HStack alignItems={'center'} mx={'$4'} py={2}>
                  <AppIcon
                    AntDesignName="codepen-circle"
                    size={20}
                    color={order === item?.title ? 'white' : 'blue'}
                    style={{
                      width: '8%',
                    }}
                  />
                  <Text
                    bold
                    fontSize={12}
                    color={order === item?.title ? 'white' : COLORS.primary}
                    mx={4}
                    width={'70%'}>
                    {item?.title}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </BottomSheet>

      {/* <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={() => setDatePickerVisibility(false)}
        onCancel={() => setDatePickerVisibility(false)}
      /> */}
    </PrivateContainer>
  );
};

export default AllMeetings;

const styles = StyleSheet.create({});
