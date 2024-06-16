import {Divider, Spinner, TextareaInput} from '@gluestack-ui/themed';
import {
  CloseIcon,
  Modal,
  ModalBody,
  ModalFooter,
  Textarea,
} from '@gluestack-ui/themed';
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Icon,
  Image,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {NativeScrollEvent} from 'react-native';
import {NativeSyntheticEvent, StatusBar} from 'react-native';
import {Alert} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '~/Assets';
import {Button} from '~/Components/core';
import AppIcon from '~/Components/core/AppIcon';
import {useAppContext} from '~/Contexts';

import {useMutation, useSwrApi} from '~/Hooks';
import {PrivateRoutesTypes} from '~/Routes/Private/types';
import {COLORS} from '~/Styles';
type Props = NativeStackScreenProps<PrivateRoutesTypes, 'UserProfile'>;
const UserProfile = ({route: {params}, navigation}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const {mutation, isLoading} = useMutation();
  const {data, mutate: connectMutate} = useSwrApi(
    `connections/check-is-connected/${params?.user_id}`,
  );

  const {userData: currentUser} = useAppContext();
  const {
    data: userData,
    isValidating,
    mutate,
  } = useSwrApi(`users/read/${params?.user_id}`);
  console.log(userData);

  const handelConnectRequest = async () => {
    try {
      const res = await mutation(`connections/send-request`, {
        method: 'POST',
        body: {
          message,
          receiver_id: params?.user_id,
        },
      });
      console.log({res: res?.results?.error});
      if (res?.status === 201) {
        connectMutate();
        setShowModal(false);
        setMessage('');
        Alert.alert('success', 'Connection request sent successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelRemoveUser = (id: any) => {
    Alert.alert('Remove User', 'Are you sure you want to remove this user?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const res = await mutation(`connections/accept-or-reject/${id}`, {
              method: 'PUT',
              body: {
                is_accepted: false,
              },
            });
            console.log(res?.results?.error);
            if (res?.results?.success === true) {
              mutate();
            } else {
              Alert.alert('Error', res?.results?.error?.message);
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.5)');

      return () => {
        StatusBar.setBarStyle('default');
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor('#000');
      };
    }, []),
  );

  // console.log(userData?.data?.data, '====>');

  if (isValidating)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size={'large'} />
      </Box>
    );

  return (
    <>
      {scrollY < 300 && (
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
      )}
      <Box flex={1}>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          <Box position="relative">
            <Image
              source={
                userData?.data?.data?.avatar
                  ? {uri: userData?.data?.data?.avatar}
                  : IMAGES.USER
              }
              alt="image"
              style={{height: 450, width: '100%'}}
            />
            {userData?.data?.data?.avatars?.length > 0 && (
              <Box position="absolute" top={60} right={20}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('UserAllPhotos', {
                      photos: userData?.data?.data?.avatars,
                    })
                  }>
                  <AppIcon
                    MaterialCommunityIconsName="folder-multiple-image"
                    size={23}
                    color={'white'}
                  />
                </Pressable>
              </Box>
            )}
            <LinearGradient
              // colors={['transparent', COLORS.primary]}
              colors={['transparent', '#290D61']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 300,
                zIndex: 1,
              }}>
              <VStack>
                <VStack
                  alignItems="center"
                  justifyContent="flex-end"
                  style={{height: '95%', paddingBottom: 100}}>
                  <Text fontFamily="Montserrat-SemiBold" color="#fff">
                    {userData?.data?.data?.nick_name}
                  </Text>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={13}
                    color="#fff">
                    {userData?.data?.data?.location_details?.state}
                  </Text>
                </VStack>
                <Box position="absolute" bottom={25} left="18%">
                  <Box bg={'$white'} px={'$3'} borderRadius={40}>
                    <HStack alignItems="center" gap={'$3'} py={'$1'}>
                      <HStack alignItems="center" gap={'$2'}>
                        <CircularProgress
                          value={
                            userData?.data?.data
                              ?.personal_matching_percentage || 0
                          }
                          radius={25}
                          duration={2500}
                          progressValueColor={COLORS.secondary}
                          maxValue={100}
                          activeStrokeColor={COLORS.secondary}
                          activeStrokeSecondaryColor={COLORS.secondary}
                          valueSuffix={'%'}
                        />
                        <Text
                          fontFamily="Montserrat-SemiBold"
                          color={COLORS.secondary}>
                          social
                        </Text>
                      </HStack>
                      <HStack alignItems="center" gap={'$2'} py={'$1'}>
                        <CircularProgress
                          value={
                            userData?.data?.data
                              ?.professional_matching_percentage || 0
                          }
                          radius={25}
                          duration={2500}
                          progressValueColor={COLORS.secondary}
                          maxValue={100}
                          activeStrokeColor={COLORS.secondary}
                          activeStrokeSecondaryColor={COLORS.secondary}
                          valueSuffix={'%'}
                        />
                        <Text
                          fontFamily="Montserrat-SemiBold"
                          color={COLORS.secondary}>
                          skill
                        </Text>
                      </HStack>
                    </HStack>
                  </Box>
                </Box>
              </VStack>
            </LinearGradient>
          </Box>
          <Box
            bg={'#fff'}
            mt={'-$1'}
            flex={1}
            borderTopLeftRadius={25}
            borderTopRightRadius={25}
            zIndex={101} // Updated zIndex
            position="relative"
            top={-15}>
            <Box mt={'$4'} px={'$4'}>
              <HStack
                justifyContent="space-between"
                bg={COLORS.gradientLow}
                borderRadius={7}
                px={'$3'}
                py={'$2'}>
                <VStack alignItems="center" justifyContent="center" gap={'$1'}>
                  <Text
                    color={'$black'}
                    fontFamily="Montserrat-Bold"
                    fontSize={13}>
                    {userData?.data?.data?.total_posts || 0}
                  </Text>
                  <Text
                    color={'$black'}
                    fontSize={12}
                    fontFamily="Montserrat-Bold">
                    Posts
                  </Text>
                </VStack>
                <VStack alignItems="center" justifyContent="center" gap={'$1'}>
                  <Text
                    color={'$black'}
                    fontFamily="Montserrat-Bold"
                    fontSize={13}>
                    {userData?.data?.data?.total_followers || 0}
                  </Text>
                  <Text
                    color={'$black'}
                    fontFamily="Montserrat-Bold"
                    fontSize={12}>
                    Followers
                  </Text>
                </VStack>
                <VStack alignItems="center" justifyContent="center" gap={'$1'}>
                  <Text
                    color={'$black'}
                    fontFamily="Montserrat-Bold"
                    fontSize={13}>
                    {userData?.data?.data?.total_followings || 0}
                  </Text>
                  <Text
                    color={'$black'}
                    fontFamily="Montserrat-Bold"
                    fontSize={12}>
                    Following
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Box mt={'$4'} px={'$4'}>
              <Text
                fontFamily="Montserrat-SemiBold"
                fontSize={14}
                color={COLORS.secondary}>
                Interests
              </Text>
              {/* {data?.data?.data?.connection?._id ? ( */}
              <HStack flexWrap="wrap" mt={'$3'}>
                {userData?.data?.data?.interests?.map((int: any) => (
                  <Box
                    key={int._id}
                    borderWidth={1}
                    borderColor={COLORS.secondary}
                    borderRadius={20}
                    mr={'$2'}>
                    <Text
                      px={'$2'}
                      py={'$1'}
                      fontFamily="Montserrat-SemiBold"
                      fontSize={12}
                      color={'$black'}>
                      {int?.label}
                    </Text>
                  </Box>
                ))}
              </HStack>
              {/* // ) : (
              //   <Box mt={'$2'}>
              //     <Box bg={'$pink50'} py={'$2'} px={'$2'} borderRadius={7}>
              //       <Text fontFamily="Montserrat-SemiBold" fontSize={11}>
              //         After connected with user you can see their interests !
              //       </Text>
              //     </Box>
              //   </Box>
              // )} */}
            </Box>

            <Box px={'$4'} mt={'$5'}>
              <Text
                fontFamily="Montserrat-SemiBold"
                fontSize={14}
                color={COLORS.secondary}>
                User Details :-
              </Text>
            </Box>

            {data?.data?.data?.connection?._id ? (
              <VStack mt={'$2'} px={'$4'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13}>
                  {userData?.data?.data?.location_details?.city +
                    ' | ' +
                    userData?.data?.data?.location_details?.state}
                </Text>
                <Text fontFamily="Montserrat-Medium" fontSize={13}>
                  {userData?.data?.data?.email}
                </Text>
              </VStack>
            ) : (
              <Box px={'$4'} mt={'$2'}>
                <Box bg={'$pink50'} py={'$2'} px={'$2'} borderRadius={7}>
                  <Text fontFamily="Montserrat-SemiBold" fontSize={11}>
                    After connected with user you can see their details !
                  </Text>
                </Box>
              </Box>
            )}
            {/* Connect Button Section */}

            {!userData?.data?.data?.connection?.is_blocked &&
              userData?.data?.data?.connection?.blocked_by !==
                currentUser?._id && (
                <Box px={'$4'} mt={'$4'}>
                  <Box bg={COLORS.secondary} borderRadius={7}>
                    {data?.data?.data?.connection?._id &&
                    data?.data?.data?.connection?.is_accepted ? (
                      <HStack py={'$3'}>
                        {!data?.data?.data?.connection?._id ? (
                          <Pressable
                            w={'$1/3'}
                            onPress={() => {
                              setShowModal(true);
                            }}
                            justifyContent="center"
                            alignItems="center">
                            <Text
                              color="$white"
                              fontFamily="Montserrat-Medium"
                              fontSize={13}>
                              Connect
                            </Text>
                          </Pressable>
                        ) : (
                          <Pressable
                            w={'$1/3'}
                            onPress={
                              data?.data?.data?.connection?.is_accepted
                                ? () =>
                                    handelRemoveUser(
                                      data?.data?.data?.connection?._id,
                                    )
                                : () => {}
                            }
                            justifyContent="center"
                            alignItems="center">
                            {data?.data?.data?.connection?.is_accepted ? (
                              <Text
                                color="$white"
                                fontFamily="Montserrat-Medium"
                                fontSize={13}>
                                Remove
                              </Text>
                            ) : (
                              <Text
                                color="$white"
                                fontFamily="Montserrat-Medium"
                                fontSize={13}>
                                Pending
                              </Text>
                            )}
                          </Pressable>
                        )}
                        <Divider orientation="vertical" />
                        <Pressable
                          onPress={() =>
                            navigation.navigate('ChatDetails', {
                              connection_id: data?.data?.data?.connection?._id,
                              userNickName: data?.data?.data?.nick_name,
                              isReceived: data?.data?.data?.is_received,
                              name: data?.data?.data?.name,
                            })
                          }
                          w={'$1/3'}
                          justifyContent="center"
                          alignItems="center">
                          <Text
                            color="$white"
                            fontFamily="Montserrat-Medium"
                            fontSize={13}>
                            Message
                          </Text>
                        </Pressable>
                        <Divider orientation="vertical" />
                        <Pressable
                          onPress={() =>
                            navigation.navigate('Reviews', {
                              user_id: params?.user_id,
                            })
                          }
                          w={'$1/3'}
                          justifyContent="center"
                          alignItems="center">
                          <Text
                            color="$white"
                            fontFamily="Montserrat-Medium"
                            fontSize={13}>
                            Review
                          </Text>
                        </Pressable>
                      </HStack>
                    ) : (
                      <HStack py={'$3'}>
                        <Pressable
                          w={'$2/4'}
                          onPress={
                            data?.data?.data?.connection?.connection?._id
                              ? () => {}
                              : () => {
                                  setShowModal(true);
                                }
                          }
                          justifyContent="center"
                          alignItems="center">
                          {data?.data?.data?.connection?.is_accepted ===
                            false && data?.data?.data?.connection?._id ? (
                            <Text
                              color="$white"
                              fontFamily="Montserrat-Medium"
                              fontSize={13}>
                              Pending
                            </Text>
                          ) : (
                            <Text
                              color="$white"
                              fontFamily="Montserrat-Medium"
                              fontSize={13}>
                              Connect
                            </Text>
                          )}
                        </Pressable>
                        <Divider orientation="vertical" />
                        <Pressable
                          onPress={() =>
                            navigation.navigate('Reviews', {
                              user_id: params?.user_id,
                            })
                          }
                          w={'$2/4'}
                          justifyContent="center"
                          alignItems="center">
                          <Text
                            color="$white"
                            fontFamily="Montserrat-Medium"
                            fontSize={13}>
                            Review
                          </Text>
                        </Pressable>
                      </HStack>
                    )}
                  </Box>
                </Box>
              )}
            {userData?.data?.data?.connection?.is_blocked &&
              userData?.data?.data?.connection?.blocked_by ===
                currentUser?._id && (
                <Box px={'$4'} mt={'$2'}>
                  <Box bg={'$pink50'} py={'$2'} px={'$2'} borderRadius={7}>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={11}>
                      This user is blocked by you !
                    </Text>
                  </Box>
                </Box>
              )}

            {/* All Posts */}
            <Box px={'$4'} mt={'$7'}>
              <Box>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={14}
                  color={'$coolGray500'}>
                  All Posts
                </Text>
              </Box>
              {data?.data?.data?.connection?.is_accepted ? (
                <Box mt={'$3'}>
                  <FlatList
                    numColumns={3}
                    data={userData?.data?.data?.posts}
                    renderItem={({item}: any) => (
                      <Pressable
                        mr={'$0.5'}
                        mb={'$0.5'}
                        onPress={() =>
                          navigation.navigate('ShareScreenDetails', {
                            postId: item?._id,
                          })
                        }>
                        {item?.media?.[0]?.fileType === 'image' && (
                          <Box>
                            <Image
                              source={{
                                uri: item?.media?.[0]?.url,
                              }}
                              alt="image"
                              style={{height: 110, width: 110}}
                            />
                            {item?.media?.length > 1 && (
                              <Box
                                style={{
                                  position: 'absolute',
                                  top: 5,
                                  right: 5,
                                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                  borderRadius: 20,
                                  padding: 5,
                                }}>
                                <AppIcon
                                  MaterialCommunityIconsName="checkbox-multiple-blank"
                                  color={'white'}
                                  size={18}
                                />
                              </Box>
                            )}
                          </Box>
                        )}
                        {item?.media?.[0]?.fileType === 'video' && (
                          <Box>
                            <Image
                              source={{
                                uri: 'https://imgs.search.brave.com/ZQKFWt71y6kyxaexg-bVvHR_3oR1RaCfjeDmspvxgJk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzQv/OTU0LzMwMC9zbWFs/bC9wbGF5LXZpZGVv/LWljb24tcG5nLnBu/Zw',
                              }}
                              alt="image"
                              style={{height: 110, width: 110}}
                            />
                            {item?.media?.length > 1 && (
                              <Box
                                style={{
                                  position: 'absolute',
                                  top: 5,
                                  right: 5,
                                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                  borderRadius: 20,
                                  padding: 5,
                                }}>
                                <AppIcon
                                  MaterialCommunityIconsName="checkbox-multiple-blank"
                                  color={'white'}
                                  size={18}
                                />
                              </Box>
                            )}
                          </Box>
                        )}
                      </Pressable>
                    )}
                    ListEmptyComponent={
                      <Box alignItems="center" mt={'$10'}>
                        <VStack alignItems="center" gap={10}>
                          <Image
                            source={IMAGES.CONNECT_BG_REMOVE}
                            alt="img"
                            style={{width: 100, height: 100}}
                          />
                          <Text fontFamily="Montserrat-SemiBold">
                            No Post found
                          </Text>
                        </VStack>
                      </Box>
                    }
                  />
                </Box>
              ) : (
                <Box mt={'$4'} alignItems="center">
                  <Image
                    source={IMAGES.CONNECT}
                    style={{
                      height: 120,
                      width: 120,
                    }}
                    alt="img"
                  />
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$4'}>
                    After connected with user you can see their posts
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </ScrollView>
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Reason for connect</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Textarea
                size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}
                w="$64">
                <TextareaInput
                  placeholder="Your reason goes here..."
                  value={message}
                  onChangeText={txt => setMessage(txt)}
                />
              </Textarea>
            </ModalBody>
            <ModalFooter>
              <Button
                borderRadius={5}
                py={'$2'}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text
                  color="$white"
                  fontFamily="Montserrat-Medium"
                  fontSize={13}>
                  Cancel
                </Text>
              </Button>
              <Button
                isLoading={isLoading}
                isDisabled={!message}
                borderRadius={5}
                py={'$2'}
                onPress={() => handelConnectRequest()}>
                <Text
                  color="$white"
                  fontFamily="Montserrat-Medium"
                  fontSize={13}>
                  Connect
                </Text>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Back button */}
        {scrollY > 300 ? (
          <Box position="absolute" top={0} zIndex={10} w={'$full'}>
            <Box bg={'$coolGray200'} w={'$full'}>
              <Pressable
                ml={'$2'}
                w={'$12'}
                py={'$2'}
                onPress={() => navigation.goBack()}>
                <Box
                  bgColor={'$coolGray200'}
                  softShadow="1"
                  borderRadius={8}
                  alignItems="center"
                  justifyContent="center">
                  <Box p={'$1'}>
                    <AppIcon
                      EntypoName="chevron-small-left"
                      size={30}
                      color={COLORS.secondary}
                    />
                  </Box>
                </Box>
              </Pressable>
            </Box>
          </Box>
        ) : (
          <Box position="absolute" top={40} left={10} zIndex={10}>
            <Pressable
              bg={'$coolGray400'}
              borderRadius={8}
              onPress={() => navigation.goBack()}>
              <Box p={'$1'}>
                <AppIcon
                  EntypoName="chevron-small-left"
                  size={30}
                  color={'white'}
                />
              </Box>
            </Pressable>
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserProfile;
