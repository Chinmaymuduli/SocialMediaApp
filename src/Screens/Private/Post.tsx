import React, {useEffect, useRef, useState} from 'react';
import {Alert, InteractionManager} from 'react-native';
import {
  Box,
  CloseIcon,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Pressable,
  RadioGroup,
  RadioLabel,
  ScrollView,
  Spinner,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/routes/private/types';
import AppIcon from '~/Components/core/AppIcon';
import {Button, LinearComponent, PhotoPicker} from '~/Components/core';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {ModalHeader} from '@gluestack-ui/themed';
import {ModalCloseButton} from '@gluestack-ui/themed';
import {useMutation, useSwrApi} from '~/Hooks';
import {COLORS} from '~/Styles';
import {ButtonText} from '@gluestack-ui/themed';
import {InputField} from '@gluestack-ui/themed';
import {useAppContext} from '~/Contexts';
import {Radio} from '@gluestack-ui/themed';
import {RadioIndicator} from '@gluestack-ui/themed';
import {RadioIcon} from '@gluestack-ui/themed';
import {CircleIcon} from '@gluestack-ui/themed';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

const Post = () => {
  const {navigate, goBack} = useNavigation<PrivateScreenProps>();
  const {userData} = useAppContext();
  const {data, mutate} = useSwrApi(`tags?require_all=true&is_active=true`);
  const [showModal, setShowModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [imagesPicker, setImagesPicker] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [cation, setCaption] = useState<any>('');
  const [createTag, setCreateTag] = useState<any>('');
  const [file, setFile] = useState('Photo');
  const [videoUrl, setVideoUrl] = useState<any>([]);
  const [multipleMedia, setMultipleMedia] = useState<any>();
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
      // formData.append('media_type', file === 'Photo' ? 'image' : 'video');
      multipleMedia?.length > 0 &&
        multipleMedia?.forEach((type: any) =>
          formData.append(
            'media_type',
            type?.path?.substring(type?.path?.lastIndexOf('.')) === 'mp4'
              ? 'video'
              : 'image',
          ),
        );
      tags?.forEach((tg: any) => formData.append('tags', tg?._id));
      multipleMedia?.length > 0 &&
        multipleMedia.forEach((file: any) => {
          if (file?.path && file?.mime) {
            formData.append('media', {
              uri: file.path,
              name: file.path.split('/').pop(),
              type: file.mime,
            });
          }
        });
      // file === 'Photo' &&
      //   images?.forEach((img: any) => {
      //     formData.append('media', {
      //       uri: img?.path,
      //       name: `file.jpg`,
      //       type: 'image/jpeg',
      //     });
      //   });
      // file === 'Video' &&
      // videoUrl.forEach((video: any) => {
      //   if (video?.path && video?.mime) {
      //     formData.append('media', {
      //       uri: video.path,
      //       name: video.path.split('/').pop(),
      //       type: video.mime,
      //     });
      //   }
      // });
      if (userData?.is_profile_completed) {
        const res = await mutation(`posts/create`, {
          method: 'POST',
          body: formData,
          isFormData: true,
        });
        // console.log(res?.results?.error);
        if (res?.status === 201) {
          setMultipleMedia([]);
          // setVideoUrl([]);
          setCaption('');
          setTags([]);
          Alert.alert('Success', 'Post Successfully Done');
        } else {
          Alert.alert('Error', res?.results?.error?.message);
        }
      } else {
        Alert.alert('Error', 'Please Complete Your Profile First Before Post');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CreateTags = async () => {
    try {
      const response = await mutation(`tags`, {
        method: 'POST',
        body: {
          title: createTag,
        },
      });
      console.log({response});
      if (response?.status === 201) {
        mutate();
        setShowTagModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let basePath =
    'file:///data/user/0/com.feveal/cache/react-native-image-crop-picker/';
  // let extractedText = filePath.substring(basePath.length);
  const handleChooseMedia = async () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    }).then(media => {
      console.log({media});
      setMultipleMedia(media);
      // setVideoUrl((prev: any) => [...prev, video]);
    });
  };

  // console.log({videoUrl});

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
      <LinearComponent>
        <ScrollView contentContainerStyle={{paddingBottom: 60}}>
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
            {/* <Box mt={'$2'}>
              <RadioGroup value={file} onChange={setFile}>
                <HStack gap={'$10'}>
                  <Radio
                    value="Photo"
                    size="md"
                    isInvalid={false}
                    isDisabled={false}>
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Photo</RadioLabel>
                  </Radio>
                  <Radio
                    value="Video"
                    size="md"
                    isInvalid={false}
                    isDisabled={false}>
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Video</RadioLabel>
                  </Radio>
                </HStack>
              </RadioGroup>
            </Box> */}
            <HStack mb={'$2'} mt={'$2'} justifyContent={'space-between'}>
              <Pressable
                bgColor={'white'}
                // onPress={
                //   file === 'Photo'
                //     ? () => setImagesPicker(true)
                //     : () => handleChooseVideo()
                // }
                onPress={() => handleChooseMedia()}
                w={'$full'}
                // alignItems={'center'}
                // justifyContent={'center'}
                // borderWidth={1}
                borderRadius={7}
                borderColor={'$coolGray300'}>
                <HStack
                  alignItems="center"
                  justifyContent="center"
                  gap={'$4'}
                  py={'$1'}>
                  {/* {file === 'Photo' ? (
                    <Image
                      source={{
                        uri:
                          images?.length > 0
                            ? images?.[0]?.path
                            : 'https://cdn-icons-png.flaticon.com/256/892/892311.png',
                      }}
                      alt="Default Image"
                      size={'xs'}
                    />
                  ) : (
                    <Box>
                      {videoUrl?.length > 0 ? (
                        <Box py={'$7'}>
                          <Text
                            fontFamily="Montserrat-SemiBold"
                            color={COLORS.secondary}>
                            {`${videoUrl?.length} Video Uploaded`}
                          </Text>
                        </Box>
                      ) : (
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/256/892/892311.png',
                          }}
                          alt="Default Image"
                          size={'md'}
                        />
                      )}
                    </Box>
                  )} */}
                  <Box>
                    <Image
                      source={{
                        uri:
                          images?.length > 0
                            ? images?.[0]?.path
                            : 'https://cdn-icons-png.flaticon.com/256/892/892311.png',
                      }}
                      alt="Default Image"
                      size={'xs'}
                    />
                  </Box>
                  <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                    Upload Photos / Videos
                  </Text>
                </HStack>
              </Pressable>
            </HStack>

            {multipleMedia?.length > 0 && (
              <Box>
                <Text my={'$2'} fontFamily="Montserrat-Bold" fontSize={13}>
                  Selected File
                </Text>
                {multipleMedia?.map((media: any) => (
                  <Box
                    key={media?.path}
                    my={'$1'}
                    softShadow="1"
                    bg={'$white'}
                    py={'$2'}
                    px={'$4'}
                    borderRadius={20}>
                    <Text
                      fontFamily="Montserrat-SemiBold"
                      fontSize={13}
                      color={COLORS.secondary}>
                      {media?.path.substring(basePath.length)}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}

            <HStack
              justifyContent="space-between"
              alignItems={'center'}
              mt={'$2'}
              mb={'$1'}>
              <Text my={'$2'} fontFamily="Montserrat-Bold" fontSize={13}>
                Select Tags
              </Text>
              <Pressable onPress={() => setShowTagModal(true)}>
                <HStack gap={'$2'} alignItems={'center'}>
                  <AppIcon
                    AntDesignName="plus"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text
                    fontFamily="Montserrat-Bold"
                    fontSize={13}
                    color={COLORS.primary}>
                    Add Tag
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
            <Pressable
              onPress={() => setShowModal(true)}
              bgColor={'white'}
              justifyContent={'center'}
              borderWidth={1}
              borderRadius={7}
              borderColor={'$coolGray300'}>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                p={'$3'}>
                <Text fontFamily="Montserrat-Medium">Select Tags</Text>
                <AppIcon AntDesignName="caretdown" size={20} />
              </HStack>
            </Pressable>
            <HStack gap={'$1.5'} mt={'$1'} flexWrap="wrap">
              {tags?.map((tag: any) => (
                <Box
                  my={'$0.5'}
                  px={'$2'}
                  bg={'$pink50'}
                  borderRadius={15}
                  key={tag?._id}>
                  <Text fontFamily="Montserrat-Medium" py={'$1'} fontSize={13}>
                    # {tag?.title}
                  </Text>
                </Box>
              ))}
            </HStack>
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
      </LinearComponent>
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
            <ScrollView>
              {data?.data?.data?.map((item: any) => (
                <Pressable
                  mt={'$3'}
                  key={item?._id}
                  onPress={() => handelTags(item)}
                  borderWidth={1}
                  borderColor="$coolGray400"
                  bgColor={
                    tags?.find((i: any) => i?._id === item?._id)
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
            </ScrollView>
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
      {/* Create Tags */}
      <Modal
        isOpen={showTagModal}
        onClose={() => {
          setShowTagModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Create Tags</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody h={'$56'}>
            <Box borderBottomWidth={1} borderStyle="dashed"></Box>
            <VStack mt={'$7'} gap={'$3'}>
              <Text fontFamily="Montserrat-Bold" fontSize={13}>
                Enter Tag Name
              </Text>
              <Input borderRadius={'$lg'}>
                <InputField
                  type="text"
                  placeholder="Enter Tags"
                  value={createTag}
                  onChangeText={txt => setCreateTag(txt)}
                />
              </Input>
            </VStack>
            <Pressable
              mt={'$10'}
              onPress={() => CreateTags()}
              borderRadius={7}
              bgColor={COLORS.primary}
              alignItems="center">
              {isLoading ? (
                <Spinner size={'large'} color={'white'} />
              ) : (
                <Text
                  fontFamily="Montserrat-SemiBold"
                  py={'$2'}
                  color={'white'}>
                  Create
                </Text>
              )}
            </Pressable>
          </ModalBody>
        </ModalContent>
      </Modal>
      <PhotoPicker
        visible={imagesPicker}
        onDismiss={() => setImagesPicker(false)}
        setImageUrl={(img: any) => handelImages(img)}
        cropperCircleOverlay={true}
        postImages={false}
      />
    </PrivateContainer>
  );
};

export default Post;
