// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {PrivateContainer} from '~/Components/container';
// import {IMAGES} from '~/Assets';

// const AllPayments = () => {
//   return (
//     <PrivateContainer
//       icons={[
//         {
//           icon: {IoniconsName: 'notifications'},
//           onPress: () => {},
//           side: 'RIGHT',
//         },
//         {
//           icon: {EntypoName: 'dots-three-vertical'},
//           onPress: () => {},
//           side: 'RIGHT',
//         },
//       ]}
//       image={IMAGES.LOGO}>
//       <Text>Hello</Text>
//     </PrivateContainer>
//   );
// };

// export default AllPayments;

// const styles = StyleSheet.create({});
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {PrivateContainer} from '~/Components/container';
import AppIcon from '~/Components/core/AppIcon';
import {IMAGES} from '~/Assets';

const MeetingData = [
  {
    id: '1',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: '20 July,2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    meeting: 'Sales Representative',
    day: 'Friday',
    person: 'Jhone',
  },

  {
    id: '2',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'For Development',
    person: 'Jhone',
  },
  {
    id: '3',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'Sales Representative',
    person: 'Jhone',
  },
  {
    id: '4',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'About Salary',
    person: 'Jhone',
  },
  {
    id: '5',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'Client Visit',
    person: 'Jhone',
  },
  {
    id: '6',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    designation: 'App Developer',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    day: 'Friday',
    meeting: 'Sales Representative',
    person: 'Jhone',
  },
];

const AllPayments = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [order, setOrder] = useState('');

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
      <HStack
        px={'$3'}
        pt={'$5'}
        pb={'$1'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text bold fontSize={16}>
          All Payments
        </Text>

        <Pressable onPress={() => setDatePickerVisibility(true)}>
          <HStack gap={'$2'} alignItems={'center'}>
            <AppIcon IoniconsName="filter" size={25} color={COLORS.secondary} />
            <Text fontWeight={'semibold'}>FilterBy</Text>
          </HStack>
        </Pressable>
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 70,
        }}>
        {MeetingData.map(item => (
          <Pressable
            mx={'$3'}
            key={item?.id}
            mt={'$4'}
            borderRadius={5}
            borderColor={COLORS.textSecondary}
            softShadow={'1'}
            bgColor={'white'}>
            <HStack
              alignItems={'center'}
              gap={'$2'}
              bg={'$pink50'}
              px={'$2'}
              py={'$1'}>
              <AppIcon
                AntDesignName="calendar"
                size={20}
                color={COLORS.secondary}
              />
              <Text fontSize={12} fontFamily="Montserrat-Bold">
                Payment Date : {'20th April , 2024'}
              </Text>
            </HStack>

            <Box px={'$3'} mt={'$2'}>
              <VStack gap={'$2'}>
                <HStack gap={'$0.5'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    Payment By :
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {'demo user'}
                  </Text>
                </HStack>
                <HStack gap={'$0.5'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    Payment To :
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {'Tim David'}
                  </Text>
                </HStack>
              </VStack>
            </Box>
            <Box borderBottomWidth={1} borderStyle={'dashed'} py={'$2'}></Box>
            <HStack px={'$3'} py={'$3'} justifyContent={'space-between'}>
              <HStack mr={'$1'} alignItems={'center'}>
                <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                  Payment :
                </Text>
                <Text
                  fontSize={13}
                  fontFamily="Montserrat-Bold"
                  px={'$2'}
                  color={COLORS.secondary}>
                  {'1524.00'}
                </Text>
              </HStack>
              <Box
                mr={'$1'}
                alignItems={'center'}
                bg={'$orange600'}
                px={'$3'}
                py={'$0.5'}
                borderRadius={10}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={13}
                  color={'$white'}>
                  Pending
                </Text>
              </Box>
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
        ))}
      </ScrollView>

      {/* <BottomSheet
        visible={isOpen}
        onDismiss={() => {
          onClose();
        }}>
        <VStack space={2} mt={3}>
          <Text bold fontSize={16} px={2}>
            Status :{' '}
          </Text>
          <VStack space={3}>
            {Sort_Array?.map((item, _) => (
              <Pressable
                key={item?.id}
                m={1}
                onPress={() => {
                  setOrder(item?.title), onClose();
                }}
                borderWidth={1}
                borderRadius={20}
                borderColor={COLORS.primary}
                bgColor={order === item?.title ? COLORS.primary : 'white'}>
                <HStack alignItems={'center'} mx={'4'} py={2}>
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
                    fontSize={'sm'}
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

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={() => setDatePickerVisibility(false)}
        onCancel={() => setDatePickerVisibility(false)}
      /> */}
    </PrivateContainer>
  );
};

export default AllPayments;
