import React, {useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
  Pressable,
  Modal,
  ModalBackdrop,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  Divider,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {useMutation} from '~/Hooks';
import {ModalContent} from '@gluestack-ui/themed';
import {ModalHeader} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';

const RequestCompo = ({data, requestMutate, mutate}: any) => {
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

  return (
    <Box px={'$2'}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => (
          <Pressable
            softShadow="1"
            bg={'$white'}
            borderRadius={6}
            overflow="hidden"
            mb={'$3'}>
            <HStack
              py={'$2'}
              alignItems="center"
              justifyContent="space-between"
              px={'$4'}>
              <HStack gap={'$2'} alignItems="center">
                <Image
                  source={
                    item?.sender_id?.avatar
                      ? {uri: item?.sender_id?.avatar}
                      : IMAGES.USER
                  }
                  alt="img"
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  rounded={'$full'}
                />
                <VStack>
                  <Text fontFamily="Montserrat-SemiBold" fontSize={15}>
                    {item?.sender_id?.nick_name}
                  </Text>
                  <HStack w={'$32'}>
                    {item?.sender_id?.interests?.map((int: any) => (
                      <Text
                        key={int?._id}
                        numberOfLines={1}
                        fontFamily="Montserrat-SemiBold"
                        fontSize={11}
                        color={'$coolGray400'}>
                        {int?.label} ,{' '}
                      </Text>
                    ))}
                  </HStack>
                </VStack>
              </HStack>
            </HStack>
            <HStack bg={COLORS.secondary} py={'$2'}>
              <Pressable
                w={'$1/3'}
                alignItems="center"
                justifyContent="center"
                onPress={() => handelConfirmReject(item?._id, true)}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  color={'$white'}
                  fontSize={12}>
                  Accept
                </Text>
              </Pressable>
              <Divider orientation="vertical" />
              <Pressable
                w={'$1/3'}
                alignItems="center"
                justifyContent="center"
                onPress={() => handelConfirmReject(item?._id, false)}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  color={'$white'}
                  fontSize={12}>
                  Reject
                </Text>
              </Pressable>
              <Divider orientation="vertical" />
              <Pressable
                w={'$1/3'}
                alignItems="center"
                justifyContent="center"
                onPress={() => {
                  setConnectMessage(item?.message), setShowModal(true);
                }}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  color={'$white'}
                  fontSize={12}>
                  Info
                </Text>
              </Pressable>
            </HStack>
          </Pressable>
        )}
        ListEmptyComponent={
          <Box alignItems="center" mt={'$10'}>
            <VStack alignItems="center" gap={10}>
              <Image
                source={IMAGES.CONNECT_BG_REMOVE}
                alt="img"
                style={{width: 200, height: 200}}
              />
              <Text fontFamily="Montserrat-SemiBold">No Request found</Text>
            </VStack>
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
