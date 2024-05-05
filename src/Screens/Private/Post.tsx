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
import {Button, PhotoPicker} from '~/Components/core';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {ModalHeader} from '@gluestack-ui/themed';
import {ModalCloseButton} from '@gluestack-ui/themed';
import {useMutation, useSwrApi} from '~/Hooks';
import {COLORS} from '~/Styles';
import {ButtonText} from '@gluestack-ui/themed';

const Post = () => {
  const {navigate, goBack} = useNavigation<PrivateScreenProps>();

  const {data} = useSwrApi(
    `tags?require_all=true&search=chilling&is_active=true`,
  );
  const [showModal, setShowModal] = useState(false);
  const [imagesPicker, setImagesPicker] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [cation, setCaption] = useState<any>('');
  const [tags, setTags] = useState<any>([]);
  const {mutation, isLoading} = useMutation();
  const handelTags = (i: any) => {
    const exist = tags?.find((_: any) => _?._id === i?._id);
    if (exist) {
      const updatedTags = tags?.filter((tag: any) => tag?._id !== i?._id);
      setTags(updatedTags);
    } else {
      setTags((prevTags: any) => [...prevTags, i]);
    }
  };
  const handelImages = (img: any) => {
    console.log({img});
    setImages((prev: any) => [...prev, img]);
  };
  const handelPost = async () => {
    try {
      let formData = new FormData();
      formData.append('caption', cation);
      formData.append('media_type', 'image');
      tags?.forEach(tg => formData.append('tags', tg?._id));
      images?.forEach(img => {
        formData.append('media', {
          uri: img?.path,
          name: `file.jpg`,
          type: 'image/jpeg',
        });
      });
      const res = await mutation(`posts/create`, {
        method: 'POST',
        body: formData,
        isFormData: true,
      });
      console.log({res});
      if (res?.status === 200) {
        setImages('');
        setCaption('');
        setTags([]);
      }
    } catch (error) {
      console.log(error);
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
              value={cation}
              onChangeText={txt => setCaption(txt)}
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
              onPress={() => setImagesPicker(true)}
              // w={'$40'}
              w={'$full'}
              alignItems={'center'}
              justifyContent={'center'}
              borderWidth={1}
              borderRadius={7}
              borderColor={'$coolGray300'}>
              <VStack>
                <Image
                  source={{
                    uri:
                      images?.length > 0
                        ? images?.[0]?.path
                        : 'https://cdn-icons-png.flaticon.com/256/892/892311.png',
                  }}
                  alt="Default Image"
                  size={'md'}
                />
              </VStack>
              {/* <Box p={'$4'}>
                <Text fontFamily="Montserrat-SemiBold">Photo</Text>
              </Box> */}
            </Pressable>
            {/* <Pressable
              bgColor={'white'}
              // w={'$full'}
              w={'$40'}
              alignItems={'center'}
              // h={150}
              justifyContent={'center'}
              borderWidth={1}
              borderRadius={7}
              borderColor={'$coolGray300'}>
              <Text fontFamily="Montserrat-SemiBold">Video</Text>
            </Pressable> */}
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
          <Box>
            {tags?.map((tag: any) => (
              <Box
                my={'$2'}
                px={'$2'}
                bg={'$pink100'}
                borderRadius={15}
                key={tag?._id}>
                <Text fontFamily="Montserrat-Medium" py={'$2'}>
                  {tag?.title}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Box mt={'$7'}>
          <Button
            borderRadius={5}
            btnWidth={'full'}
            isLoading={isLoading}
            isDisabled={isLoading}
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
              <Pressable
                mt={'$3'}
                key={item?._id}
                onPress={() => handelTags(item)}
                borderWidth={1}
                borderColor="$coolGray400"
                bgColor={
                  tags?.find(i => i?._id === item?._id)
                    ? COLORS.secondary
                    : '$white'
                }
                borderRadius={20}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  p={'$2'}
                  color={
                    tags?.find((i: any) => i?._id === item?._id)
                      ? '$white'
                      : '$black'
                  }>
                  {item?.title}
                </Text>
              </Pressable>
            ))}
            <Pressable
              mt={'$5'}
              onPress={() => setShowModal(false)}
              borderWidth={1}
              borderRadius={20}
              alignItems="center">
              <Text fontFamily="Montserrat-SemiBold" py={'$2'}>
                Confirm
              </Text>
            </Pressable>
          </ModalBody>
        </ModalContent>
      </Modal>
      <PhotoPicker
        visible={imagesPicker}
        onDismiss={() => setImagesPicker(false)}
        setImageUrl={img => handelImages(img)}
        cropperCircleOverlay={true}
        postImages={false}
      />
    </PrivateContainer>
  );
};

export default Post;
