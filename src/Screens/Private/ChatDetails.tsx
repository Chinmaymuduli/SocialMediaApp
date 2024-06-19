import React, {useEffect, useState} from 'react';
import {
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  Avatar,
  Box,
  CloseIcon,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  InputField,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateRoutesTypes, PrivateScreenProps} from '~/routes/private/types';
import AppIcon from '~/Components/core/AppIcon';
import {PrivateContainer} from '~/Components/container';
import {Alert, StyleSheet, useWindowDimensions} from 'react-native';
import {useMutation, useSwrApi} from '~/Hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Modal} from '@gluestack-ui/themed';
import {Button} from '~/Components/core';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';
import {useAppContext} from '~/Contexts';
import LinearGradient from 'react-native-linear-gradient';
import RenderHTML from 'react-native-render-html';
import {Actionsheet} from '@gluestack-ui/themed';
import {ActionsheetDragIndicator} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'ChatDetails'>;
const ChatDetails = ({route: {params}}: Props) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {socketRef} = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [upiId, setUpiId] = useState('');
  const [latitude, setLatitude] = useState('12.9880');
  const [longitude, setLongitude] = useState('77.6895');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {mutation, isLoading} = useMutation();
  const {width} = useWindowDimensions();
  const {userData} = useAppContext();
  const {data, mutate, isValidating} = useSwrApi(
    `chats/read-all?connection_id=${params?.connection_id}`,
  );
  const {data: productsData} = useSwrApi(`products`);
  const {data: commissionData} = useSwrApi(`commission`);
  const {data: latestMeetingData, mutate: latestMutate} = useSwrApi(
    `meetings/read-latest/${params?.connection_id}`,
  );
  useEffect(() => {
    socketRef?.current?.emit('join-to-connection', params?.connection_id);
    socketRef?.current?.on('message-received', (data: any) => {
      console.log('=========>', data);
      mutate();
    });
  }, [socketRef]);
  const handelChat = async () => {
    try {
      socketRef?.current.emit('send-message', {
        message: message,
        userId: userData?._id,
        connection_id: params?.connection_id,
      });

      const res = await mutation(`chats/send-message`, {
        method: 'POST',
        body: {
          message_type: 'text',
          connection_id: params?.connection_id,
          text: message,
        },
      });
      if (res?.status === 201) {
        mutate();
        setMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const handelCreatePayment = async () => {
    try {
      const res = await mutation(`meetings`, {
        method: 'POST',
        body: {
          connection_id: params?.connection_id,
          upi_id: upiId,
          amount: amount,
          date: selectedDate,
          location_details: {
            address: address,
            city: city,
            state: state,
            coordinates: [latitude, longitude],
            pincode: Number(pin),
          },
        },
      });
      console.log({res: res?.results});
      if (res?.results?.success === true) {
        Alert.alert('Success', 'Meeting scheduled successfully');
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdateMeeting = async () => {
    try {
      const res = await mutation(
        `meetings/${latestMeetingData?.data?.data?._id}`,
        {
          method: 'PUT',
          body: {
            connection_id: params?.connection_id,
            upi_id: upiId,
            amount: amount,
            date: selectedDate,
            location_details: {
              address: address,
              city: city,
              state: state,
              coordinates: [latitude, longitude],
              pincode: Number(pin),
            },
          },
        },
      );
      if (res?.results?.success === true) {
        Alert.alert('Success', 'Meeting updated successfully');
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async () => {
    try {
      const data: any = {
        meeting_id: latestMeetingData?.data?.data?._id,
        product: {
          list: [],
        },
      };
      if (selectedItems?.length > 0) {
        data.product.list = selectedItems.map((item: any) => ({
          title: item?.title,
          price: item?.price,
          product_id: item?._id,
        }));
      }
      const orderResponse = await mutation(`payments/orders/create`, {
        method: 'POST',
        body: data,
      });
      console.log(orderResponse);
      if (orderResponse?.results?.success === true) {
        checkOutOrder(orderResponse?.results?.data?._id);
      }
    } catch (error) {
      console.log(error);
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
          setShowPaymentModal(false);
          latestMutate();
          Alert.alert('Success', 'Payment Successful');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // const paymentMethod = () => {
  //   const options = {
  //     description: 'Feveal',
  //     currency: 'INR',
  //     key: 'rzp_test_hs7GKWV7szSVEA', // Your api key
  //     amount: 2450,
  //     name: userData?.name,
  //     prefill: {
  //       email: userData?.email || 'demo@gmail.com',
  //       contact: userData?.phoneNumber || 8956325102,
  //       name: userData?.name,
  //     },
  //   };
  //   RazorpayCheckout.open(options)
  //     .then(async (data: any) => {
  //       console.log({data});
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  // console.log(productsData?.data?.data);
  const addExtraItem = (extraItem: any) => {
    let exist = selectedItems?.find((_: any) => _?._id === extraItem?._id);
    if (exist) {
      const updatedItems = selectedItems?.filter(
        (item: any) => item?._id !== extraItem?._id,
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, extraItem]);
    }
  };

  useEffect(() => {
    setAmount(latestMeetingData?.data?.data?.amount?.toString());
    setUpiId(latestMeetingData?.data?.data?.upi_id);
    setSelectedDate(latestMeetingData?.data?.data?.date);
    setPin(latestMeetingData?.data?.data?.location_details?.pincode);
    setAddress(latestMeetingData?.data?.data?.location_details?.address);
    setCity(latestMeetingData?.data?.data?.location_details?.city);
    setState(latestMeetingData?.data?.data?.location_details?.state);
  }, [latestMeetingData?.data?.data]);

  // console.log(latestMeetingData?.data?.data?.is_sender_paid);

  return (
    <PrivateContainer
      hasBackIcon={true}
      title={params?.userNickName}
      icons={[
        {
          icon: {MaterialIconsName: 'add-call'},
          onPress: () => {
            navigate('AgoraVoiceCall', {
              avatar: params?.avatar,
              nickName: params?.userNickName,
              isHost: true,
            });
          },
          side: 'RIGHT',
        },
        {
          icon: {MaterialIconsName: 'payment'},
          onPress: params?.isReceived
            ? () => {
                setShowModal(true);
              }
            : () => {
                setShowPaymentModal(true);
              },
          side: 'RIGHT',
        },
      ]}>
      <LinearGradient
        colors={['#F5E3E6', '#F6F6F6']}
        style={styles.linearGradient}>
        <Box flex={1} mt={'$3'}>
          <FlatList
            // onRefresh={() => mutate()}
            // refreshing={isValidating}
            showsVerticalScrollIndicator={false}
            data={data?.data?.data}
            renderItem={({item}: any) => (
              <Box my={'$2'}>
                <Box alignItems="center" my={'$2'}>
                  <Text fontSize={13} fontFamily="Montserrat-SemiBold">
                    {item?.date === new Date().toDateString()
                      ? 'Today'
                      : item?.date}
                  </Text>
                </Box>
                {item?.messages?.map((msg: any, key: any) => (
                  <Box key={key} my={'$1'}>
                    {/* {console.log({msg})} */}
                    {msg?.is_received && msg?.message_type === 'text' ? (
                      <Box
                        alignSelf="flex-start"
                        bg={'$white'}
                        px={'$2'}
                        py={'$1'}
                        borderRadius={'$lg'}>
                        <Text fontFamily="Montserrat-Medium" fontSize={14}>
                          {msg?.text}
                        </Text>
                        <Box alignSelf="flex-end" pl={'$5'} mt={'$0.5'}>
                          <Text
                            fontFamily="Montserrat-Medium"
                            fontSize={11}
                            color={'$coolGray400'}>
                            {moment(item?.created_at).format('hh:mm A')}
                          </Text>
                        </Box>
                      </Box>
                    ) : (
                      msg?.message_type === 'text' && (
                        <Box alignSelf="flex-end" pr={'$4'}>
                          <Box
                            alignSelf="flex-start"
                            bg={'$white'}
                            px={'$2'}
                            py={'$1'}
                            borderRadius={'$lg'}>
                            <Text fontFamily="Montserrat-Medium">
                              {msg?.text}
                            </Text>
                            <Box alignSelf="flex-end" pl={'$5'} mt={'$0.5'}>
                              <Text
                                fontFamily="Montserrat-Medium"
                                fontSize={11}
                                color={'$coolGray400'}>
                                {moment(item?.created_at).format('hh:mm A')}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      )
                    )}
                    {msg?.message_type === 'markup' && (
                      <RenderHTML
                        contentWidth={width}
                        source={{
                          html: msg?.text,
                        }}
                        tagsStyles={{
                          body: {
                            whiteSpace: 'normal',
                            color: 'black',
                            fontWeight: '400',
                            fontFamily: 'Montserrat-Medium',
                          },
                          p: {
                            color: 'black',
                            fontFamily: 'Montserrat-Medium',
                          },
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            )}
          />
          <Box mb="$3" px={'$3'} mt={'$2'}>
            <HStack gap={'$2'}>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={false}
                borderRadius={20}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Text here"
                  fontSize={12}
                  value={message}
                  onChangeText={text => setMessage(text)}
                />
              </Input>
              <Pressable
                borderRadius={20}
                onPress={isLoading ? () => {} : () => handelChat()}
                h={'$10'}
                w={'$10'}
                bg={isLoading ? '$coolGray300' : '$blue200'}
                alignItems={'center'}
                justifyContent={'center'}>
                <AppIcon
                  IoniconsName="send"
                  size={22}
                  color={isLoading ? 'gray' : 'blue'}
                />
              </Pressable>
            </HStack>
          </Box>
        </Box>
      </LinearGradient>
      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Meeting Details</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack gap={'$3'}>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Amount</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChangeText={txt => setAmount(txt)}
                    keyboardType="number-pad"
                  />
                </Input>
              </VStack>

              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Upi ID</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChangeText={txt => setUpiId(txt)}
                    // keyboardType="number-pad"
                  />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Date & Time</Text>
                <Pressable
                  onPress={() => setDatePickerVisibility(true)}
                  borderRadius={8}
                  borderColor="$coolGray300"
                  borderWidth={1}>
                  <Text py={'$2'} px={'$2'} color="$coolGray500">
                    {selectedDate
                      ? moment(selectedDate).format('LLL')
                      : 'Select Date & Time'}
                  </Text>
                </Pressable>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Pincode</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter Pincode"
                    value={pin}
                    onChangeText={txt => setPin(txt)}
                    keyboardType="number-pad"
                  />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Address</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChangeText={txt => setAddress(txt)}
                  />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">City</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChangeText={txt => setCity(txt)}
                  />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">State</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter State"
                    value={state}
                    onChangeText={txt => setState(txt)}
                  />
                </Input>
              </VStack>
              {/* <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Latitude</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter Latitude"
                    value={latitude}
                    onChangeText={txt => setLatitude(txt)}
                  />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Longitude</Text>
                <Input borderRadius={'$lg'}>
                  <InputField
                    type="text"
                    placeholder="Enter Longitude"
                    value={longitude}
                    onChangeText={txt => setLongitude(txt)}
                  />
                </Input>
              </VStack> */}
              <Button
                borderRadius={5}
                isLoading={isLoading}
                py={'$2'}
                onPress={
                  latestMeetingData?.data?.data?._id
                    ? () => handelUpdateMeeting()
                    : () => handelCreatePayment()
                }
                btnWidth={'100%'}>
                <Text
                  color="$white"
                  fontFamily="Montserrat-Medium"
                  fontSize={13}>
                  Confirm
                </Text>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Send money */}

      {/* <Modal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Meeting Details</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack gap={'$3'}>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Amount</Text>
                <Input borderRadius={'$lg'}>
                  <InputField type="text" placeholder="Enter Amount" />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Date & Time</Text>
                <Pressable
                  onPress={() => setShowPaymentModal(true)}
                  borderRadius={8}
                  borderColor="$coolGray300"
                  borderWidth={1}>
                  <Text py={'$2'} px={'$2'} color="$coolGray500">
                    {'Select Date & Time'}
                  </Text>
                </Pressable>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Pincode</Text>
                <Input borderRadius={'$lg'}>
                  <InputField type="text" placeholder="Enter Pincode" />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">Address</Text>
                <Input borderRadius={'$lg'}>
                  <InputField type="text" placeholder="Enter Address" />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">City</Text>
                <Input borderRadius={'$lg'}>
                  <InputField type="text" placeholder="Enter City" />
                </Input>
              </VStack>
              <VStack gap={'$0.5'}>
                <Text fontFamily="Montserrat-Medium">State</Text>
                <Input borderRadius={'$lg'}>
                  <InputField type="text" placeholder="Enter State" />
                </Input>
              </VStack>

              <Button
                borderRadius={5}
                py={'$2'}
                onPress={() => makePayment()}
                btnWidth={'100%'}>
                <Text
                  color="$white"
                  fontFamily="Montserrat-Medium"
                  fontSize={13}>
                  Make Payment
                </Text>
              </Button>
            </VStack>
          </ModalBody>

        </ModalContent>
      </Modal> */}
      <Actionsheet
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          {/* <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper> */}
          <Box w={'$full'}>
            <Box
              py={'$3'}
              px={'$3'}
              borderBottomWidth={1}
              borderStyle={'dashed'}>
              <Text
                fontSize={15}
                fontFamily="Montserrat-SemiBold"
                color={'$black'}>
                Meeting Details
              </Text>
            </Box>
            {latestMeetingData?.data?.data?._id ? (
              <Box px={'$3'} py={'$3'}>
                <VStack>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={15}
                    color="$black">
                    Meeting Address :-
                  </Text>
                  <Box mt={'$2'}>
                    <Text fontFamily="Montserrat-Medium" fontSize={14}>
                      {latestMeetingData?.data?.data?.location_details
                        ?.address +
                        ' , ' +
                        latestMeetingData?.data?.data?.location_details?.city +
                        ' , ' +
                        latestMeetingData?.data?.data?.location_details?.state +
                        ' , ' +
                        latestMeetingData?.data?.data?.location_details
                          ?.pincode}
                    </Text>
                  </Box>
                </VStack>
                <VStack mt={'$5'} gap={'$2'}>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={15}
                    color="$black">
                    Meeting Date & Timing :-
                  </Text>
                  <Box>
                    <Text fontFamily="Montserrat-Medium" fontSize={15}>
                      {moment(latestMeetingData?.data?.data?.date).format(
                        'LL LT',
                      )}
                    </Text>
                  </Box>
                </VStack>
                <VStack mt={'$5'} gap={'$2'}>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={15}
                    color="$black">
                    Meeting Price :-
                  </Text>
                  <Box>
                    <Text
                      fontFamily="Montserrat-SemiBold"
                      color={COLORS.secondary}
                      fontSize={15}>
                      {`RS ${latestMeetingData?.data?.data?.amount}`}
                    </Text>
                  </Box>
                </VStack>
                {!latestMeetingData?.data?.data?.is_sender_paid && (
                  <VStack mt={'$5'} gap={'$2'}>
                    <Text
                      fontFamily="Montserrat-SemiBold"
                      fontSize={15}
                      color="$black">
                      Add Extra Items :-
                    </Text>
                    <Box>
                      {productsData?.data?.data?.map((item: any) => (
                        <HStack
                          key={item?._id}
                          alignItems="center"
                          justifyContent="space-between">
                          <HStack alignItems="center" gap={'$3'}>
                            <Text
                              fontFamily="Montserrat-SemiBold"
                              // color={COLORS.secondary}
                              fontSize={15}>
                              {item?.title}
                            </Text>
                            <Text
                              fontFamily="Montserrat-Medium"
                              // color={COLORS.secondary}
                              fontSize={15}>
                              {`(RS ${item?.price} /-)`}
                            </Text>
                          </HStack>
                          <Pressable onPress={() => addExtraItem(item)}>
                            {selectedItems?.find(
                              (_: any) => _?._id === item?._id,
                            ) ? (
                              <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={13}
                                color={'$red400'}>
                                Remove
                              </Text>
                            ) : (
                              <Text
                                fontFamily="Montserrat-SemiBold"
                                color={COLORS.secondary}>
                                Add
                              </Text>
                            )}
                          </Pressable>
                        </HStack>
                      ))}
                    </Box>
                  </VStack>
                )}
                <VStack mt={'$5'} gap={'$2'}>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={15}
                    color="$black">
                    Platform Fee :-
                  </Text>
                  <Box>
                    <Text
                      fontFamily="Montserrat-SemiBold"
                      color={COLORS.secondary}
                      fontSize={15}>
                      {`RS ${
                        (latestMeetingData?.data?.data?.amount *
                          commissionData?.data?.data?.percent) /
                        100
                      } `}
                    </Text>
                  </Box>
                </VStack>
                {latestMeetingData?.data?.data?.is_sender_paid && (
                  <VStack mt={'$5'} gap={'$2'}>
                    <Text
                      fontFamily="Montserrat-SemiBold"
                      fontSize={15}
                      color="$black">
                      Payment Status :-
                    </Text>
                    <Box>
                      <Text
                        fontFamily="Montserrat-SemiBold"
                        color={'$green500'}
                        fontSize={15}>
                        {'Paid'}
                      </Text>
                    </Box>
                  </VStack>
                )}
                {!latestMeetingData?.data?.data?.is_sender_paid && (
                  <Box mt={'$10'}>
                    <Button
                      borderRadius={5}
                      isLoading={isLoading}
                      py={'$2'}
                      onPress={() => makePayment()}
                      btnWidth={'100%'}>
                      <Text
                        color="$white"
                        fontFamily="Montserrat-SemiBold"
                        fontSize={13}>
                        Make Payment
                      </Text>
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Box py={'$3'} alignItems="center" justifyContent="center">
                <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                  No Meeting Found
                </Text>
              </Box>
            )}
          </Box>
        </ActionsheetContent>
      </Actionsheet>

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        minimumDate={new Date()}
        onConfirm={date => handleConfirm(date)}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </PrivateContainer>
  );
};

export default ChatDetails;
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
