import {Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Box,
  HStack,
  Input,
  InputField,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {PrivateContainer} from '~/Components/container';
import AppIcon from '~/Components/core/AppIcon';
import {useMutation, useSwrApi} from '~/Hooks';
import {useAppContext} from '~/Contexts';
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';

const Meetings = () => {
  const {userData} = useAppContext();
  const {data, isValidating, mutate} = useSwrApi(
    `meetings?require_all=true&user_id=${userData?._id}`,
  );
  const {mutation, isLoading} = useMutation();
  const makePayment = async (id: any) => {
    const orderResponse = await mutation(`payments/orders/create`, {
      method: 'POST',
      body: {
        meeting_id: id,
      },
    });
    if (orderResponse?.results?.success === true) {
      checkOutOrder(orderResponse?.results?.data?._id);
    }
  };

  const checkOutOrder = async (orderId: any) => {
    try {
      const res = await mutation(`payments/orders/checkout`, {
        method: 'POST',
        body: {
          order_id: orderId,
          payment_type: 'send',
        },
      });
      if (res?.results?.success === true) {
        paymentMethod(res?.results?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paymentMethod = (paymentData: any) => {
    const options = {
      description: 'Feveal',
      currency: 'INR',
      key: 'rzp_test_hs7GKWV7szSVEA',
      amount: paymentData?.total_fare * 100,
      name: userData?.name,
      order_id: paymentData?.metadata?.razorpay_order_id,
      prefill: {
        email: userData?.email || 'demo@gmail.com',
        contact: userData?.phoneNumber,
        name: userData?.name,
      },
    };
    RazorpayCheckout.open(options)
      .then(async (data: any) => {
        console.log({data});
        const verifyOrder = await mutation(`payments/orders/verify`, {
          method: 'PUT',
          body: {
            payment_order_id: paymentData?.order_id,
            razorpay_order_id: paymentData?.metadata?.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
          },
        });
        if (verifyOrder?.results?.success === true) {
          mutate();
          Alert.alert('Success', 'Payment Successful');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (isLoading) {
    <Spinner size={'large'} />;
  }
  return (
    <PrivateContainer title={'Meetings'} bg={'purple.50'} hasBackIcon={true}>
      <HStack
        px={'$3'}
        pt={'$5'}
        pb={'$1'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text bold fontSize={16}>
          All Meetings
        </Text>

        {/* <Pressable onPress={() => setDatePickerVisibility(true)}>
          <HStack gap={'$2'} alignItems={'center'}>
            <AppIcon IoniconsName="filter" size={25} color={COLORS.secondary} />
            <Text fontWeight={'semibold'}>FilterBy</Text>
          </HStack>
        </Pressable> */}
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        {data?.data?.data?.map((item: any) => (
          <Pressable
            mx={'$3'}
            key={item?._id}
            mt={'$4'}
            borderRadius={5}
            borderColor={COLORS.textSecondary}
            softShadow={'1'}
            bgColor={'white'}>
            <HStack
              justifyContent="space-between"
              bg={'$pink50'}
              alignItems={'center'}>
              <HStack alignItems={'center'} gap={'$2'} px={'$2'} py={'$1'}>
                <AppIcon
                  AntDesignName="calendar"
                  size={20}
                  color={COLORS.secondary}
                />
                <Text fontSize={12} fontFamily="Montserrat-Bold">
                  {'Amount' + ' : ' + item?.amount}
                </Text>
              </HStack>
              <Box px={'$4'}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={13}
                  color={item?.is_accepted ? '$green500' : COLORS.secondary}>
                  {item?.is_accepted ? 'Accepted' : 'Pending'}
                </Text>
              </Box>
            </HStack>

            <Box px={'$3'} mt={'$2'}>
              <HStack justifyContent={'space-between'}>
                <VStack gap={'$1'}>
                  <Text fontFamily="Montserrat-Bold" fontSize={13}>
                    Meeting Date
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {moment(item?.date).format('ll')}
                  </Text>
                </VStack>
                <VStack gap={'$1'}>
                  <Text bold fontSize={13}>
                    Meeting Time
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {moment(item?.date).format('LT')}
                  </Text>
                </VStack>
              </HStack>
              <HStack pt={'$3'}>
                <HStack mr={'$1'} alignItems={'center'}>
                  <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                    Meeting With :
                  </Text>
                  <Text
                    fontSize={13}
                    fontFamily="Montserrat-Bold"
                    px={'$2'}
                    color={COLORS.secondary}>
                    {item?.sender_id?.nick_name}
                  </Text>
                </HStack>
              </HStack>
            </Box>
            <Box borderBottomWidth={1} borderStyle={'dashed'} py={'$2'}></Box>
            <HStack px={'$3'} py={'$3'}>
              <HStack mr={'$1'} w={'$80'}>
                <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                  Location :
                </Text>
                <Text
                  fontSize={12}
                  fontFamily="Montserrat-Medium"
                  px={'$2'}
                  color={COLORS.secondary}>
                  {item?.location_details?.address +
                    ' , ' +
                    item?.location_details?.city +
                    ' , ' +
                    item?.location_details?.state +
                    ' , ' +
                    item?.location_details?.pincode}
                </Text>
              </HStack>
            </HStack>
            {!item?.is_accepted && (
              <Box position={'absolute'} bottom={0} right={0}>
                <Pressable
                  onPress={() => makePayment(item?._id)}
                  bg={'blue.300'}
                  p={'$2'}
                  borderTopLeftRadius={20}
                  borderBottomRightRadius={5}>
                  <AppIcon
                    AntDesignName="arrowright"
                    size={18}
                    color={'black'}
                  />
                </Pressable>
              </Box>
            )}
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

export default Meetings;

const styles = StyleSheet.create({});
