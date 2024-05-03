import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
const AllPayments = () => {
  const transactionHistory = [
    {
      id: 1,
      date: 'May 1, 12:00 AM',
      name: 'John Doe',
      amount: 100.0,
      type: 'credit',
    },
    {
      id: 2,
      date: 'Apr 30, 12:00 AM',
      name: 'Grocery Store',
      amount: 50.0,
      type: 'credit',
    },
    {
      id: 3,
      date: 'Apr 29, 12:00 AM',
      name: 'Jane Smith',
      amount: 75.0,
      type: 'credit',
    },
    {
      id: 4,
      date: 'Apr 28, 12:00 AM',
      name: 'Amazon',
      amount: 120.0,
      type: 'credit',
    },
    {
      id: 5,
      date: 'Apr 27, 12:00 AM',
      name: 'Salary Deposit',
      amount: 1500.0,
      type: 'credit',
    },
    {
      id: 6,
      date: 'Apr 26, 12:00 AM',
      name: 'Gas Station',
      amount: 40.0,
      type: 'credit',
    },
    {
      id: 7,
      date: 'Apr 25, 12:00 AM',
      name: 'AT&T',
      amount: 85.0,
      type: 'credit',
    },
    {
      id: 8,
      date: 'Apr 24, 12:00 AM',
      name: 'Electricity Bill',
      amount: 120.0,
      type: 'credit',
    },
    {
      id: 9,
      date: 'Apr 23, 12:00 AM',
      name: 'Credit Card Payment',
      amount: 200.0,
      type: 'credit',
    },
    {
      id: 10,
      date: 'Apr 22, 12:00 AM',
      name: 'Netflix Subscription',
      amount: 15.0,
      type: 'credit',
    },
    {
      id: 11,
      date: 'Apr 21, 12:00 AM',
      name: 'Gift Shop',
      amount: 30.0,
      type: 'credit',
    },
    {
      id: 12,
      date: 'Apr 20, 12:00 AM',
      name: 'Tax Refund',
      amount: 300.0,
      type: 'credit',
    },
    {
      id: 13,
      date: 'Apr 19, 12:00 AM',
      name: 'Coffee Shop',
      amount: 5.0,
      type: 'credit',
    },
    {
      id: 14,
      date: 'Apr 18, 12:00 AM',
      name: 'Water Bill',
      amount: 50.0,
      type: 'credit',
    },
    {
      id: 15,
      date: 'Apr 17, 12:00 AM',
      name: 'Investment Dividend',
      amount: 200.0,
      type: 'credit',
    },
    {
      id: 16,
      date: 'Apr 16, 12:00 AM',
      name: 'Bookstore',
      amount: 25.0,
      type: 'credit',
    },
    {
      id: 17,
      date: 'Apr 15, 12:00 AM',
      name: 'Car Insurance',
      amount: 150.0,
      type: 'credit',
    },
    {
      id: 18,
      date: 'Apr 14, 12:00 AM',
      name: 'Restaurant Dinner',
      amount: 70.0,
      type: 'credit',
    },
    {
      id: 19,
      date: 'Apr 13, 12:00 AM',
      name: 'Flight Ticket',
      amount: 300.0,
      type: 'credit',
    },
    {
      id: 20,
      date: 'Apr 12, 12:00 AM',
      name: 'Stock Sale',
      amount: 500.0,
      type: 'credit',
    },
  ];
  const {navigate} = useNavigation<PrivateScreenProps>();
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
      <Box m={'$2'} bgColor={'#d1d1d1'} p={'$3'} borderRadius={'$md'}>
        <Text fontFamily={'Montserrat-Bold'} fontSize={14}>
          Transaction History
        </Text>
      </Box>
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={transactionHistory}
        renderItem={({item}: any) => (
          <Box px={'$4'} py={'$2'}>
            <HStack gap={'$3'} alignItems={'center'} bgColor={'#00000000'}>
              <Box
                h={'$10'}
                w={'$10'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius="$md"
                bgColor={item.type === 'credit' ? '#e5f2e5' : '#ffe5e5'}>
                <Icon
                  as={item?.type === 'credit' ? ArrowUpIcon : ArrowDownIcon}
                  color={item?.type === 'credit' ? 'green' : 'red'}
                />
              </Box>

              <VStack flex={1}>
                <Text fontFamily={'Montserrat-Bold'} fontSize={12}>
                  {item?.name}
                </Text>
                <Text
                  color={'#94a3b8'}
                  fontFamily={'Montserrat-Medium'}
                  fontSize={13}>
                  {item?.date}
                </Text>
              </VStack>
              <Text fontFamily={'Montserrat-Bold'} fontSize={12}>
                {/* {item?.type === 'credit' ? '+' : '-'} */}₹{item.amount}.00
              </Text>
            </HStack>
            <Divider mt={'$3'} />
          </Box>
        )}
      />
    </PrivateContainer>
  );
};

export default AllPayments;
