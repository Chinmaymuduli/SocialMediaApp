import {Alert, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
  ButtonText,
  HStack,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  TextareaInput,
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
import {Actionsheet} from '@gluestack-ui/themed';
import {ActionsheetBackdrop} from '@gluestack-ui/themed';
import {ActionsheetContent} from '@gluestack-ui/themed';
import {Heading} from '@gluestack-ui/themed';
import {CloseIcon} from '@gluestack-ui/themed';
import {ModalFooter} from '@gluestack-ui/themed';
import {Button} from '@gluestack-ui/themed';
import {Textarea} from '@gluestack-ui/themed';
import {Rating} from 'react-native-ratings';
import {Image} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';

const Meetings = () => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [meetingData, setMeetingData] = React.useState<any>();
  const [showModal, setShowModal] = React.useState(false);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [ratings, setRatings] = React.useState(0);
  const [reviews, setReviews] = React.useState('');
  const [reportType, setReportType] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [meetingId, setMeetingId] = useState('');
  const ref = React.useRef(null);
  const {userData} = useAppContext();

  const {data, isValidating, mutate} = useSwrApi(
    `meetings?require_all=true&user_id=${userData?._id}&type=all`,
  );
  const {data: reviewData, mutate: reviewMutate} = useSwrApi(
    `meetings/reviews?meeting_id=${meetingData?._id}`,
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

  const handelMeetingFinished = async (item: any, status: boolean) => {
    try {
      const updateData: any = {};
      if (item?.is_accepted) updateData.is_meeting_finished = true;
      if (!item?.is_accepted) updateData.is_accepted = status;
      const res = await mutation(`meetings/${item?._id}`, {
        method: 'PUT',
        body: updateData,
      });
      console.log(res);
      if (res?.results?.success === true) {
        mutate();
      } else {
        Alert.alert('Error', res?.results?.error?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addReviews = async () => {
    try {
      const res = await mutation(`meetings/reviews`, {
        method: 'POST',
        body: {
          rating: ratings,
          comment: reviews,
          meeting_id: meetingId,
        },
      });
      if (res?.results?.success === true) {
        Alert.alert('Success', 'Review Added');
        mutate();
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelReport = (type: string) => {
    setReportType(type), setShowActionsheet(false), setShowReportModal(true);
  };

  const handelReportPost = async () => {
    try {
      const res = await mutation(`meetings/report`, {
        method: 'POST',
        body: {
          connection_id: meetingData?.connection_id,
          meeting_id: meetingData?._id,
          report_receiver_id: meetingData?.is_received
            ? meetingData?.sender_id?._id
            : meetingData?.receiver_id?._id,
          comment: comment,
          is_blocked: reportType === 'report' ? false : true,
        },
      });
      if (res?.results?.success === true) {
        setShowReportModal(false);
        Alert.alert(
          'Success',
          `${
            reportType === 'report' ? 'Report' : 'Report & Block'
          } done successfully !`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(meetingData);

  if (isValidating) {
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
        {data?.data?.data?.length > 0 && (
          <Text bold fontSize={16}>
            All Meetings
          </Text>
        )}

        {/* <Pressable onPress={() => setDatePickerVisibility(true)}>
          <HStack gap={'$2'} alignItems={'center'}>
            <AppIcon IoniconsName="filter" size={25} color={COLORS.secondary} />
            <Text fontWeight={'semibold'}>FilterBy</Text>
          </HStack>
        </Pressable> */}
      </HStack>

      {data?.data?.data?.length > 0 ? (
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
                    color={
                      item?.is_sender_paid ? '$green500' : COLORS.secondary
                    }>
                    {item?.is_sender_paid ? 'Accepted' : 'Pending'}
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

                {item?.is_accepted && (
                  <Box pt={'$3'}>
                    <HStack mr={'$1'} alignItems={'center'} gap={'$4'}>
                      <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                        Is Meeting Accepted ?
                      </Text>

                      <HStack alignItems="center" gap={'$5'}>
                        <Pressable
                          bg={'$green400'}
                          borderRadius={5}
                          onPress={() => handelMeetingFinished(item, true)}>
                          <Text
                            fontFamily="Montserrat-SemiBold"
                            px={'$4'}
                            py={'$1'}
                            color={'$white'}
                            fontSize={13}>
                            Yes
                          </Text>
                        </Pressable>
                        {!item?.is_accepted && !item?.is_received && (
                          <Pressable
                            bg={COLORS.secondary}
                            borderRadius={5}
                            onPress={() => handelMeetingFinished(item, false)}>
                            <Text
                              fontFamily="Montserrat-SemiBold"
                              px={'$4'}
                              py={'$1'}
                              color={'$white'}
                              fontSize={13}>
                              No
                            </Text>
                          </Pressable>
                        )}
                      </HStack>
                    </HStack>
                  </Box>
                )}

                {item?.is_meeting_finished && (
                  <Box pt={'$3'}>
                    <Pressable
                      onPress={() => {
                        setMeetingId(item?._id), setShowModal(true);
                      }}>
                      <Text
                        fontFamily="Montserrat-SemiBold"
                        fontSize={13}
                        textDecorationLine="underline"
                        color={COLORS.secondary}>
                        Give Review
                      </Text>
                    </Pressable>
                  </Box>
                )}
              </Box>
              {!item?.is_sender_paid && (
                <Box
                  borderBottomWidth={1}
                  borderStyle={'dashed'}
                  py={'$2'}></Box>
              )}
              {!item?.is_sender_paid && !item?.is_received && (
                <Box px={'$3'} py={'$3'}>
                  {/* <Box mr={'$1'} w={'$80'}> */}
                  {/* <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
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
                </Text> */}

                  <Pressable
                    w={'$24'}
                    borderRadius={10}
                    onPress={() => makePayment(item?._id)}
                    bg={'$pink100'}>
                    <Text
                      px={'$3'}
                      py={'$1'}
                      fontFamily="Montserrat-Bold"
                      fontSize={12}
                      color={COLORS.secondary}>
                      Pay Now
                    </Text>
                  </Pressable>
                  {/* </Box> */}
                </Box>
              )}
              {item?.is_sender_paid || item?.is_received ? (
                <Pressable
                  onPress={() => {
                    setMeetingData(item), setShowActionsheet(true);
                  }}
                  bg={COLORS.secondary}
                  mt={'$3'}
                  alignItems={'center'}
                  borderBottomLeftRadius={5}
                  borderBottomRightRadius={5}>
                  <Text
                    py={'$1.5'}
                    fontFamily="Montserrat-SemiBold"
                    fontSize={14}
                    color={'$white'}>
                    See Details
                  </Text>
                </Pressable>
              ) : (
                <Box position={'absolute'} bottom={0} right={0}>
                  <Pressable
                    onPress={() => {
                      setMeetingData(item), setShowActionsheet(true);
                    }}
                    bg={COLORS.secondary}
                    p={'$3'}
                    borderTopLeftRadius={20}
                    borderBottomRightRadius={5}>
                    <AppIcon AntDesignName="info" size={18} color={'white'} />
                  </Pressable>
                </Box>
              )}
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <>
          <Box alignItems="center" mt={'$10'}>
            <VStack alignItems="center" gap={10}>
              <Image
                source={IMAGES.CONNECT_BG_REMOVE}
                alt="img"
                style={{width: 200, height: 200}}
              />
              <Text fontFamily="Montserrat-SemiBold">No Meetings found</Text>
            </VStack>
          </Box>
        </>
      )}

      {/* Action Sheet */}
      <Actionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box w={'$full'}>
            <ScrollView>
              <Pressable mx={'$1'} mt={'$4'}>
                <Box
                  justifyContent="space-between"
                  bg={'$pink50'}
                  alignItems={'center'}>
                  <Box
                    alignItems={'center'}
                    justifyContent="center"
                    px={'$2'}
                    py={'$1'}>
                    <Text
                      fontSize={14}
                      fontFamily="Montserrat-Bold"
                      color={COLORS.secondary}>
                      {' - : Meeting Details : -'}
                    </Text>
                  </Box>
                </Box>

                <Box px={'$3'} mt={'$2'}>
                  <HStack justifyContent={'space-between'}>
                    <VStack gap={'$1'}>
                      <Text fontFamily="Montserrat-Bold" fontSize={13}>
                        Meeting Date
                      </Text>
                      <Text fontFamily="Montserrat-Medium" fontSize={13}>
                        {moment(meetingData?.date).format('ll')}
                      </Text>
                    </VStack>
                    <VStack gap={'$1'}>
                      <Text bold fontSize={13}>
                        Meeting Time
                      </Text>
                      <Text fontFamily="Montserrat-Medium" fontSize={13}>
                        {moment(meetingData?.date).format('LT')}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack pt={'$3'}>
                    <VStack>
                      <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                        Meeting With :
                      </Text>
                      <Text
                        fontSize={13}
                        fontFamily="Montserrat-Bold"
                        mt={'$1'}
                        color={COLORS.secondary}>
                        {meetingData?.sender_id?.nick_name}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
                <Box px={'$3'} py={'$3'}>
                  <Box mr={'$1'} w={'$80'}>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                      Location :
                    </Text>
                    <Text
                      fontSize={12}
                      fontFamily="Montserrat-Medium"
                      mt={'$1'}>
                      {meetingData?.location_details?.address +
                        ' , ' +
                        meetingData?.location_details?.city +
                        ' , ' +
                        meetingData?.location_details?.state +
                        ' , ' +
                        meetingData?.location_details?.pincode}
                    </Text>
                  </Box>
                </Box>
                <Box px={'$3'} py={'$1'}>
                  <Box mr={'$1'} w={'$80'}>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                      Meeting Amount :
                    </Text>
                    <Text
                      fontSize={12}
                      fontFamily="Montserrat-Bold"
                      mt={'$1'}
                      color={COLORS.secondary}>
                      {meetingData?.amount}
                    </Text>
                  </Box>
                </Box>
                <Box px={'$3'} py={'$1'}>
                  <Box mr={'$1'} w={'$80'}>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                      Payment Status :
                    </Text>
                    <Text
                      fontSize={12}
                      fontFamily="Montserrat-Bold"
                      mt={'$1'}
                      color={
                        meetingData?.is_sender_paid
                          ? '$green500'
                          : COLORS.secondary
                      }>
                      {meetingData?.is_sender_paid ? 'Accepted' : 'Pending'}
                    </Text>
                  </Box>
                </Box>
                <Box px={'$3'} py={'$1'}>
                  <Box mr={'$1'} w={'$80'}>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                      Is Meeting Finished ?
                    </Text>
                    <Text
                      fontSize={12}
                      fontFamily="Montserrat-Bold"
                      mt={'$1'}
                      color={
                        meetingData?.is_sender_paid
                          ? '$green500'
                          : COLORS.secondary
                      }>
                      {meetingData?.is_meeting_finished ? 'Yes' : 'No'}
                    </Text>
                  </Box>
                </Box>

                {meetingData?.is_meeting_finished && (
                  <HStack px={'$3'} justifyContent="space-between" my={'$4'}>
                    <Pressable
                      onPress={() => handelReport('report')}
                      borderWidth={1}
                      w={'40%'}
                      alignItems="center"
                      justifyContent="center"
                      py={'$2'}
                      borderRadius={8}
                      borderColor={COLORS.secondary}>
                      <Text
                        fontSize={12}
                        fontFamily="Montserrat-Bold"
                        color={COLORS.secondary}>
                        Report
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handelReport('report&block')}
                      py={'$2'}
                      borderRadius={8}
                      borderColor={'$red400'}
                      borderWidth={1}
                      w={'40%'}
                      alignItems="center"
                      justifyContent="center">
                      <Text
                        fontSize={12}
                        fontFamily="Montserrat-Bold"
                        color={'$red400'}>
                        Report & Block
                      </Text>
                    </Pressable>
                  </HStack>
                )}

                {reviewData?.data?.data?.length > 0 && (
                  <Box px={'$3'} py={'$1'} mt={'$2'}>
                    <Pressable mr={'$1'} w={'$80'}>
                      <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                        All Reviews
                      </Text>
                      <Box mt={'$3'}>
                        {reviewData?.data?.data?.map((rev: any) => (
                          <VStack
                            px={'$1'}
                            py={'$1'}
                            mb={'$2'}
                            key={rev?._id}
                            borderWidth={1}
                            borderColor="$coolGray200">
                            <HStack>
                              <Text
                                fontFamily="Montserrat-Medium"
                                fontSize={12}>
                                Ratings :{' '}
                              </Text>
                              <Text
                                fontFamily="Montserrat-Medium"
                                fontSize={12}>
                                {rev?.rating}
                              </Text>
                            </HStack>
                            <Text
                              fontSize={12}
                              fontFamily="Montserrat-Medium"
                              mt={'$1'}>
                              {rev?.comment}
                            </Text>
                          </VStack>
                        ))}
                      </Box>
                    </Pressable>
                  </Box>
                )}
              </Pressable>
            </ScrollView>
          </Box>
        </ActionsheetContent>
      </Actionsheet>

      {/* Modal for review */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Rate & Review</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack>
              <Text fontFamily="Montserrat-Medium">Rate</Text>
              <Box px={'$0'}>
                <Rating
                  type="custom"
                  startingValue={ratings}
                  ratingColor={COLORS.secondary}
                  tintColor={'#fff'}
                  ratingBackgroundColor={'gray'}
                  ratingCount={5}
                  imageSize={30}
                  onFinishRating={(rating: React.SetStateAction<number>) => {
                    setRatings(rating);
                  }}
                />
              </Box>
            </VStack>
            <VStack gap={'$1'}>
              <Text fontFamily="Montserrat-Medium">Review</Text>
              <Textarea
                size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}
                w="$64">
                <TextareaInput
                  placeholder="Your text goes here..."
                  value={reviews}
                  onChangeText={txt => {
                    setReviews(txt);
                  }}
                />
              </Textarea>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => addReviews()}>
              <ButtonText>Send</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Report */}
      <Modal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">
              {reportType === 'report' ? 'Report' : 'Report & Block'}
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack gap={'$1'}>
              <Text fontFamily="Montserrat-Medium">Comments</Text>
              <Textarea
                size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}
                w="$64">
                <TextareaInput
                  placeholder="Your text goes here..."
                  value={comment}
                  onChangeText={txt => {
                    setComment(txt);
                  }}
                />
              </Textarea>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowReportModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => handelReportPost()}>
              <ButtonText>
                {reportType === 'report' ? 'Report' : 'Report & Block'}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PrivateContainer>
  );
};

export default Meetings;

const styles = StyleSheet.create({});
