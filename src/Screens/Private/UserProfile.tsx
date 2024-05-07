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
import {IMAGES} from '~/Assets';
import {PrivateContainer} from '~/Components/container';
import {Button} from '~/Components/core';
import AppIcon from '~/Components/core/AppIcon';
import {UserCaption, UserPost} from '~/Components/screens';
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
  const {data} = useSwrApi(`connections/check-is-connected/${params?.user_id}`);
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
  // console.log(data?.data?.data);
  return (
    <PrivateContainer title="Demo User" bg={'purple.50'} hasBackIcon={true}>
      <ScrollView contentContainerStyle={{paddingBottom: 70}}>
        <HStack
          px={'$4'}
          py={'$3'}
          justifyContent="space-between"
          alignItems="center">
          <Box borderWidth={2} borderRadius={50} borderColor={COLORS.secondary}>
            <Image
              source={IMAGES.USER}
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
                1215
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
                956
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
                566
              </Text>
              <Text color={'$black'} fontFamily="Montserrat-Bold" fontSize={12}>
                Following
              </Text>
            </VStack>
          </HStack>
        </HStack>
        <VStack px={'$4'}>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            Chinmay Muduli
          </Text>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            Coding
          </Text>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            Hyderabad | Fitness | Perfectional Coder
          </Text>
          <Text fontFamily="Montserrat-Medium" fontSize={13}>
            demo@gmail.com
          </Text>
        </VStack>
        <HStack px={'$4'} gap={'$10'} mt={'$4'}>
          {!data?.data?.data?.connection?._id ? (
            <Button
              borderRadius={5}
              py={'$2'}
              onPress={() => {
                setShowModal(true);
              }}>
              <Text color="$white" fontFamily="Montserrat-Medium" fontSize={13}>
                Connect
              </Text>
            </Button>
          ) : (
            <Button
              borderRadius={5}
              py={'$2'}
              onPress={() => {
                setShowModal(true);
              }}>
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
            </Button>
          )}

          <Button borderRadius={5} py={'$2'} onPress={() => {}}>
            <Text color="$white" fontFamily="Montserrat-Medium" fontSize={13}>
              Message
            </Text>
          </Button>
        </HStack>
        {data?.data?.data?.connection?.is_accepted && (
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
          <Box mt={'$20'} alignItems="center">
            <Image
              source={IMAGES.CONNECT}
              style={{
                height: 150,
                width: 150,
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
