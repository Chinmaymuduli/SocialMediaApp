import {TextareaInput} from '@gluestack-ui/themed';
import {
  ButtonText,
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, Dimensions} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {IMAGES} from '~/Assets';
import {PrivateContainer} from '~/Components/container';
import {Button} from '~/Components/core';
import AppIcon from '~/Components/core/AppIcon';
import {UserCaption, UserPost} from '~/Components/screens';
import {useAppContext} from '~/Contexts';
import {useMutation, useSwrApi} from '~/Hooks';
import {PrivateRoutesTypes} from '~/Routes/Private/types';
import {COLORS} from '~/Styles';
type Props = NativeStackScreenProps<PrivateRoutesTypes, 'UserProfile'>;
const UserProfile = ({route: {params}, navigation}: Props) => {
  const [selectSwitch, setSelectSwitch] = useState<string>('Posts');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const HEADER_BTN = [
    {
      id: 'b1',
      title: 'Posts',
      icon: {AntDesignName: 'table'},
    },
    {
      id: 'b2',
      title: 'Captions',
      icon: {AntDesignName: 'edit'},
    },
  ];
  const {mutation, isLoading} = useMutation();
  const {userData: userDetails} = useAppContext();
  const {data} = useSwrApi(`connections/check-is-connected/${params?.user_id}`);
  const {data: userData, mutate} = useSwrApi(`users/read/${params?.user_id}`);
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
        setShowModal(false);
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
            console.log(res);
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

  // console.log(userData?.data?.data?.posts);

  return (
    <PrivateContainer
      title={userData?.data?.data?.nick_name}
      bg={'purple.50'}
      hasBackIcon={true}>
      <ScrollView contentContainerStyle={{paddingBottom: 70}}>
        <HStack
          px={'$4'}
          py={'$3'}
          justifyContent="space-between"
          alignItems="center">
          <Box borderWidth={2} borderRadius={50} borderColor={COLORS.secondary}>
            <Image
              source={
                userData?.data?.data?.avatar
                  ? {uri: userData?.data?.data?.avatar}
                  : IMAGES.USER
              }
              alt="image"
              style={{height: 70, width: 70, borderRadius: 50}}
            />
          </Box>
          <HStack gap={'$7'}>
            <VStack alignItems="center" justifyContent="center">
              <Text
                color={'$black'}
                fontFamily="Montserrat-Medium"
                fontSize={13}>
                {userData?.data?.data?.total_posts}
              </Text>
              <Text color={'$black'} fontSize={12} fontFamily="Montserrat-Bold">
                Posts
              </Text>
            </VStack>
            <VStack alignItems="center" justifyContent="center">
              <Text
                color={'$black'}
                fontFamily="Montserrat-Medium"
                fontSize={13}>
                {userData?.data?.data?.total_followers}
              </Text>
              <Text color={'$black'} fontFamily="Montserrat-Bold" fontSize={12}>
                Followers
              </Text>
            </VStack>
            <VStack alignItems="center" justifyContent="center">
              <Text
                color={'$black'}
                fontFamily="Montserrat-Medium"
                fontSize={13}>
                {userData?.data?.data?.total_followings}
              </Text>
              <Text color={'$black'} fontFamily="Montserrat-Bold" fontSize={12}>
                Following
              </Text>
            </VStack>
          </HStack>
        </HStack>
        <VStack px={'$4'}>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            {userData?.data?.data?.nick_name || userData?.data?.data?.name}
          </Text>
          {data?.data?.data?.connection?._id &&
            userData?.data?.data?.interests?.map((item: any) => (
              <Text
                fontFamily="Montserrat-Medium"
                fontSize={13}
                key={item?._id}>
                {item?.label},
              </Text>
            ))}
          {data?.data?.data?.connection?._id && (
            <Text fontFamily="Montserrat-Medium" fontSize={13}>
              {userData?.data?.data?.location_details?.city +
                ' | ' +
                userData?.data?.data?.location_details?.state}
            </Text>
          )}
          {data?.data?.data?.connection?._id && (
            <Text fontFamily="Montserrat-Medium" fontSize={13}>
              {userData?.data?.data?.email}
            </Text>
          )}
        </VStack>
        {userDetails?.is_profile_completed ? (
          <HStack justifyContent="space-around" px={'$2'} mt={'$4'}>
            {!data?.data?.data?.connection?._id ? (
              <Button
                btnWidth={'35%'}
                borderRadius={5}
                py={'$2'}
                onPress={() => {
                  setShowModal(true);
                }}>
                <Text
                  color="$white"
                  fontFamily="Montserrat-Medium"
                  fontSize={13}>
                  Connect
                </Text>
              </Button>
            ) : (
              <Button borderRadius={5} py={'$2'} btnWidth={'35%'}>
                {data?.data?.data?.connection?.is_accepted ? (
                  <Pressable
                    onPress={() =>
                      handelRemoveUser(data?.data?.data?.connection?._id)
                    }>
                    <Text
                      color="$white"
                      fontFamily="Montserrat-Medium"
                      fontSize={13}>
                      Remove
                    </Text>
                  </Pressable>
                ) : (
                  <Text
                    color="$white"
                    fontFamily="Montserrat-Medium"
                    fontSize={13}>
                    Pending
                  </Text>
                )}
              </Button>
            )}

            {data?.data?.data?.connection?.is_accepted && (
              <Button
                borderRadius={5}
                py={'$2'}
                btnWidth={'35%'}
                onPress={() =>
                  navigation.navigate('ChatDetails', {
                    connection_id: data?.data?.data?._id,
                    userNickName: data?.data?.data?.nick_name,
                    isReceived: true,
                    name: data?.data?.data?.name,
                  })
                }>
                <Text
                  color="$white"
                  fontFamily="Montserrat-Medium"
                  fontSize={13}>
                  Message
                </Text>
              </Button>
            )}

            <Button
              borderRadius={5}
              py={'$2'}
              onPress={() => navigation.navigate('Reviews')}
              btnWidth={'35%'}>
              <Text color="$white" fontFamily="Montserrat-Medium" fontSize={13}>
                Reviews
              </Text>
            </Button>
          </HStack>
        ) : (
          <Box px={'$3'} mt={'$2'}>
            <Box bg={'$pink50'} py={'$2'} px={'$2'}>
              <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                Please complete your profile to connect and message !
              </Text>
            </Box>
          </Box>
        )}
        {/* Indicator */}
        <Box px={'$3'} mt={'$3'}>
          <Box bg="$white" borderRadius={8} softShadow="2">
            <Box px={'$3'} py={'$3'}>
              <Text fontFamily="Montserrat-SemiBold">
                Profile Match Percentage
              </Text>
            </Box>
            <Box borderBottomWidth={1} borderStyle="dashed"></Box>
            <HStack justifyContent={'space-around'} py={'$5'}>
              <Box alignItems={'center'}>
                <CircularProgress
                  value={
                    userData?.data?.data?.personal_matching_percentage || 0
                  }
                  radius={35}
                  duration={2500}
                  progressValueColor={COLORS.primary}
                  maxValue={100}
                  activeStrokeColor={COLORS.primary}
                  activeStrokeSecondaryColor={COLORS.secondary}
                  valueSuffix={'%'}
                />
                <VStack alignItems={'center'} pt={'$2'}>
                  <Text fontFamily="Montserrat-Medium">Personal</Text>
                </VStack>
              </Box>
              <Box alignItems={'center'}>
                <CircularProgress
                  value={
                    userData?.data?.data?.professional_matching_percentage || 0
                  }
                  radius={35}
                  duration={2500}
                  progressValueColor={COLORS.secondary}
                  maxValue={100}
                  activeStrokeColor={COLORS.secondary}
                  activeStrokeSecondaryColor={'#C25AFF'}
                  valueSuffix={'%'}
                />
                <VStack alignItems={'center'} pt={'$2'}>
                  <Text fontFamily="Montserrat-Medium">Professional</Text>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Box>

        {/* {data?.data?.data?.connection?.is_accepted && (
          <Box mt={'$8'} flex={1}>
            <FlatList
              data={HEADER_BTN}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}: any) => (
                <>
                  <Pressable
                    w={Dimensions.get('window').width / 2}
                    mb={'$4'}
                    justifyContent="center"
                    alignItems="center"
                    onPress={() => {
                      setSelectSwitch(item?.title);
                    }}>
                    <HStack alignItems={'center'} px={'$3'} gap={'$3'}>
                      <AppIcon {...item.icon} size={20} />
                      <Text
                        color={'black'}
                        fontFamily="Montserrat-Medium"
                        fontSize={13}
                        fontWeight={
                          selectSwitch === item?.title ? 'bold' : 'medium'
                        }
                        py={1}>
                        {item?.title}
                      </Text>
                    </HStack>
                  </Pressable>
                </>
              )}
            />
            <Box w={'100%'} h={'$0.5'} bgColor="$coolGray200"></Box>
            {selectSwitch === 'Posts' ? (
              <Box
                w={'50%'}
                h={'$0.5'}
                bgColor={COLORS.secondary}
                position="absolute"
                top={'$9'}></Box>
            ) : (
              <Box
                w={'50%'}
                h={'$0.5'}
                bgColor={COLORS.secondary}
                position="absolute"
                top={'$9'}
                left={'50%'}></Box>
            )}
          </Box>
        )}
        {data?.data?.data?.connection?.is_accepted ? (
          <Box>
            {selectSwitch === 'Posts' && <UserPost />}
            {selectSwitch === 'Captions' && <UserCaption />}
          </Box>
        ) : (
          <Box mt={'$16'} alignItems="center">
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
        )} */}

        {data?.data?.data?.connection?.is_accepted && (
          <>
            <Pressable mb={'$4'} mt={'$7'} px={'$2'}>
              <HStack alignItems={'center'} px={'$3'} gap={'$3'}>
                <AppIcon AntDesignName="table" size={20} />
                <Text
                  color={'black'}
                  fontFamily="Montserrat-Medium"
                  fontSize={13}
                  fontWeight={'bold'}
                  py={1}>
                  {'All Posts'}
                </Text>
              </HStack>
            </Pressable>
            <Box w={'100%'} h={'$0.5'} bgColor={'$pink300'}></Box>
          </>
        )}
        {data?.data?.data?.connection?.is_accepted ? (
          <Box>
            {selectSwitch === 'Posts' && (
              <UserPost postData={userData?.data?.data?.posts} />
            )}
            {/* {selectSwitch === 'Captions' && <UserCaption />} */}
          </Box>
        ) : (
          <Box mt={'$16'} alignItems="center">
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
      </ScrollView>
      {/* Modal */}
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
              <Text color="$white" fontFamily="Montserrat-Medium" fontSize={13}>
                Cancel
              </Text>
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={!message}
              borderRadius={5}
              py={'$2'}
              onPress={() => handelConnectRequest()}>
              <Text color="$white" fontFamily="Montserrat-Medium" fontSize={13}>
                Connect
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PrivateContainer>
  );
};

export default UserProfile;
