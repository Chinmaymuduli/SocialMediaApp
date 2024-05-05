import React, {useEffect, useRef, useState} from 'react';
import {InteractionManager} from 'react-native';
import {
  Box,
  CloseIcon,
  HStack,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Pressable,
  ScrollView,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/routes/private/types';
import AppIcon from '~/Components/core/AppIcon';
import {Button} from '~/Components/core';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {ModalHeader} from '@gluestack-ui/themed';
import {ModalCloseButton} from '@gluestack-ui/themed';
import {useSwrApi} from '~/Hooks';

const Post = () => {
  const {navigate, goBack} = useNavigation<PrivateScreenProps>();
  const handelPost = async () => {
    try {
      console.log('handel Post');
    } catch (error) {
      console.log(error);
    }
  };

  const {data} = useSwrApi(
    `tags?require_all=true&search=chilling&is_active=true`,
  );
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  // console.log(data?.data?.data);
  const handelTags = (id: any) => {
    const exist = tags?.filter(_ => _ === id);
    if (exist) {
      setTags(prev => []);
    }
  };
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Profile'),
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => navigate('Settings'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <ScrollView>
        <Box mt={'$2'} mx={'$4'}>
          <Text my={'$2'} fontFamily="Montserrat-Bold" fontSize={13}>
            Description
          </Text>

          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            w="$full">
            <TextareaInput
              placeholder="Your text goes here..."
              fontSize={13}
              fontFamily="Montserrat-Medium"
            />
          </Textarea>
        </Box>
        <Box mt={'$2'} mx={'$4'}>
          <HStack alignItems={'center'}>
            <Text my={'$2'} fontFamily="Montserrat-Bold" fontSize={13}>
              Choose File
            </Text>
          </HStack>
          <HStack mb={'$2'} justifyContent={'space-between'}>
            <Pressable
              bgColor={'white'}
              w={'$40'}
              alignItems={'center'}
              // h={150}
              justifyContent={'center'}
              borderWidth={1}
              borderRadius={7}
              borderColor={'$coolGray300'}>
              {/* <VStack>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/256/892/892311.png',
                  }}
                  alt="Default Image"
                  // style={{
                  //   height: 50,
                  //   width: 50,
                  // }}
                  size={'md'}
                />
              </VStack> */}
              <Box p={'$4'}>
                <Text fontFamily="Montserrat-SemiBold"> Photo</Text>
              </Box>
            </Pressable>
            <Pressable
              bgColor={'white'}
              // w={'$full'}
              w={'$40'}
              alignItems={'center'}
              // h={150}
              justifyContent={'center'}
              borderWidth={1}
              borderRadius={7}
              borderColor={'$coolGray300'}>
              {/* <VStack>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/256/892/892311.png',
                  }}
                  alt="Default Image"
                  // style={{
                  //   height: 50,
                  //   width: 50,
                  // }}
                  size={'md'}
                />
              </VStack> */}
              <Text fontFamily="Montserrat-SemiBold">Video</Text>
            </Pressable>
          </HStack>
          <Text my={'$2'} fontFamily="Montserrat-Bold" fontSize={13}>
            Select Tags
          </Text>
          <Pressable
            onPress={() => setShowModal(true)}
            bgColor={'white'}
            justifyContent={'center'}
            borderWidth={1}
            borderRadius={7}
            borderColor={'$coolGray300'}>
            <HStack alignItems="center" justifyContent="space-between" p={'$3'}>
              <Text fontFamily="Montserrat-Medium">Select Tags</Text>
              <AppIcon AntDesignName="caretdown" size={20} />
            </HStack>
          </Pressable>
        </Box>

        <Box mt={'$7'}>
          <Button
            borderRadius={5}
            btnWidth={'full'}
            mx={'$4'}
            py={'$2'}
            onPress={() => handelPost()}>
            <Text color="$white" fontFamily="Montserrat-Bold" fontSize={13}>
              Post
            </Text>
          </Button>
        </Box>
      </ScrollView>
      {/* modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">All Tags</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {data?.data?.data?.map((item: any) => (
              <Pressable key={item?._id} onPress={() => handelTags(item?._id)}>
                <Text fontFamily="Montserrat-SemiBold">{item?.title}</Text>
              </Pressable>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </PrivateContainer>
  );
};

export default Post;
