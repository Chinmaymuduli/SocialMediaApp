import React, {useState} from 'react';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  HStack,
  Icon,
  InfoIcon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pressable,
  VStack,
} from '@gluestack-ui/themed';
import {FlatList} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {ButtonText} from '@gluestack-ui/themed';
import {Divider} from '@gluestack-ui/themed';
import {ANIMATIONS, IMAGES} from '~/Assets';
import Empty from '~/Components/core/Empty';
import {CloseIcon} from '@gluestack-ui/themed';
import {useMutation} from '~/Hooks';
import {ModalBackdrop} from '@gluestack-ui/themed';
import {Heading} from '@gluestack-ui/themed';
import {ModalCloseButton} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';

const RequestCompo = ({
  data,
  requestMutate,
  mutate,
  recommendationData,
}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [showModal, setShowModal] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');
  const {mutation, isLoading} = useMutation();
  const handelConfirmReject = async (id: any, isAccepted: boolean) => {
    try {
      const res = await mutation(`connections/accept-or-reject/${id}`, {
        method: 'PUT',
        body: {
          is_accepted: isAccepted,
        },
      });
      if (res?.results?.success === true) {
        requestMutate();
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log({recommendationData});
  return (
    <Box>
      <FlatList
        data={data}
        renderItem={({item}: any) => (
          <Box py={'$1'}>
            <VStack px={'$4'}>
              <HStack gap={'$1'} alignItems="center">
                <Image
                  source={
                    item?.sender_id?.image
                      ? {uri: item?.sender_id?.image}
                      : IMAGES.USER
                  }
                  alt="img"
                  style={{
                    height: 40,
                    width: 40,
                  }}
                  rounded={'$full'}
                />
                <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                  {item?.sender_id?.name} wants to connect with you.
                </Text>
              </HStack>
              <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
                <Button
                  onPress={() => handelConfirmReject(item?._id, true)}
                  size="sm"
                  h={20}
                  w={'$24'}
                  variant="outline"
                  action="primary"
                  borderColor={'$green400'}
                  isDisabled={false}
                  isFocusVisible={false}>
                  <ButtonText fontSize={12} color={'$green600'}>
                    Add{' '}
                  </ButtonText>
                  <ButtonIcon as={AddIcon} color={'$green600'} mt={'$0.5'} />
                </Button>
                <Button
                  onPress={() => handelConfirmReject(item?._id, false)}
                  size="md"
                  h={20}
                  w={'$24'}
                  variant="outline"
                  action="primary"
                  borderColor={'$pink400'}
                  isDisabled={false}
                  isFocusVisible={false}>
                  <ButtonText fontSize={12} color={'$pink600'}>
                    Cancel{' '}
                  </ButtonText>
                  <ButtonIcon as={CloseIcon} color={'$pink600'} />
                </Button>
                <Button
                  onPress={() => {
                    setConnectMessage(item?.message), setShowModal(true);
                  }}
                  size="md"
                  h={20}
                  w={'$24'}
                  variant="outline"
                  action="primary"
                  borderColor={'$pink400'}
                  isDisabled={false}
                  isFocusVisible={false}>
                  <ButtonText fontSize={12} color={'$pink600'}>
                    Info
                  </ButtonText>
                  <ButtonIcon as={InfoIcon} color={'$pink600'} />
                </Button>
              </HStack>
            </VStack>
            <Divider mt={'$4'} />
          </Box>
        )}
        ListEmptyComponent={
          <Box alignItems="center" mt={'$10'}>
            <VStack alignItems="center" gap={10}>
              <Image
                source={IMAGES.CONNECT_BG_REMOVE}
                alt="img"
                style={{width: 200, height: 200}}
              />
              <Text fontFamily="Montserrat-SemiBold">No request found</Text>
            </VStack>
          </Box>
        }
        ListFooterComponent={
          <Box mt={'$8'} ml={'$3'}>
            <Box my={'$4'}>
              <Text fontFamily="Montserrat-SemiBold">
                Suggested Connections
              </Text>
            </Box>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              // contentContainerStyle={{backgroundColor: 'white'}}
              data={recommendationData}
              renderItem={({item}: any) => (
                <Box w={'$32'} mr={'$2'} mb={'$1'} p={'$0.5'}>
                  <Box
                    borderRadius={7}
                    softShadow="1"
                    bg={'$white'}
                    alignItems="center"
                    py={'$3'}>
                    <Image
                      source={item?.avatar ? {uri: item?.avatar} : IMAGES.USER}
                      alt="image"
                      style={{height: 60, width: 60}}
                      rounded={'$full'}
                    />
                    <Text
                      mt={'$1'}
                      fontFamily="Montserrat-SemiBold"
                      fontSize={13}
                      numberOfLines={1}>
                      {item?.nick_name}
                    </Text>
                    <Pressable
                      onPress={() =>
                        navigate('UserProfile', {user_id: item?._id})
                      }
                      bg={COLORS.secondary}
                      py={'$1'}
                      px={'$3'}
                      mt={'$2'}
                      borderRadius={6}>
                      <Text
                        fontFamily="Montserrat-SemiBold"
                        color={'$white'}
                        fontSize={13}>
                        Profile
                      </Text>
                    </Pressable>
                  </Box>
                </Box>
              )}
            />
          </Box>
        }
      />

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Request Message</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text fontSize={13} fontFamily="Montserrat-Medium">
              {connectMessage}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RequestCompo;
