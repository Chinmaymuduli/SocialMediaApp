import React, {useEffect, useState} from 'react';
import {
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
import {StyleSheet, useWindowDimensions} from 'react-native';
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

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'ChatDetails'>;
const ChatDetails = ({route: {params}}: Props) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {socketRef} = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const {userData} = useAppContext();
  const {data, mutate, isValidating} = useSwrApi(
    `chats/read-all?connection_id=${params?.connection_id}`,
  );
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [upiId, setUpiId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const {mutation, isLoading} = useMutation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {width} = useWindowDimensions();
  useEffect(() => {
    socketRef?.current?.on('join-to-connection', params?.connection_id);
    socketRef?.current?.emit('new-user-joined', {
      message: 'New user joined.',
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
      if (res?.status === 201) {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = () => {
    paymentMethod();
  };

  const paymentMethod = () => {
    const options = {
      description: 'Feveal',
      currency: 'INR',
      key: 'rzp_test_hs7GKWV7szSVEA', // Your api key
      amount: 2450,
      name: userData?.name,
      prefill: {
        email: userData?.email || 'demo@gmail.com',
        contact: userData?.phoneNumber || 8956325102,
        name: userData?.name,
      },
    };
    RazorpayCheckout.open(options)
      .then(async (data: any) => {
        console.log({data});
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
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
            onRefresh={() => mutate()}
            refreshing={isValidating}
            data={data?.data?.data}
            renderItem={({item}: any) => (
              <Box my={'$2'}>
                <Box alignItems="center">
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
                      <Text ml={'$2'} fontFamily="Montserrat-Medium">
                        {msg?.text}
                      </Text>
                    ) : (
                      msg?.message_type === 'text' && (
                        <Box alignSelf="flex-end" pr={'$4'}>
                          <Text fontFamily="Montserrat-Medium">
                            {msg?.text}
                          </Text>
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
              <VStack gap={'$0.5'}>
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
              </VStack>
              <Button
                borderRadius={5}
                isLoading={isLoading}
                py={'$2'}
                onPress={() => handelCreatePayment()}
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

      <Modal
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
      </Modal>

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
