import React, {useEffect, useState} from 'react';
import {PrivateContainer} from '~/Components/container';
import {useNavigation} from '@react-navigation/native';
import {
  PrivateNavigationProp,
  PrivateScreenProps,
} from '~/Routes/Private/types';
import {IMAGES} from '~/Assets';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  FlatList,
  HStack,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {useMutation, useSwrApi} from '~/Hooks';
import {Text} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import moment from 'moment';
import AppIcon from '~/Components/core/AppIcon';
import {PhotoPicker} from '~/Components/core';
import {Alert, Pressable} from 'react-native';

const Profile = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [imagesPicker, setImagesPicker] = useState(false);
  const [isImagePick, setIsImagePick] = useState(false);
  const [images, setImages] = useState<any>([]);
  const {data, isValidating, mutate} = useSwrApi(`users/self`);
  const handelImages = (img: any) => {
    console.log({img});
    setImages((prev: any) => [...prev, img]);
  };
  const {mutation, isLoading} = useMutation();
  const handelMultipleImage = async () => {
    try {
      const formData = new FormData();
      images.forEach((img: any) => {
        formData.append('avatar', {
          uri: img?.path,
          name: `file.jpg`,
          type: 'image/jpeg',
        });
      });
      const res = await mutation(`users/add-avatars`, {
        method: 'POST',
        isFormData: true,
        body: formData,
      });
      if (res?.status === 201) {
        mutate();
        Alert.alert('Success', 'Images Added Successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setImages(data?.data?.data?.avatars);
  });

  console.log(data?.data?.data);
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Notifications'),
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => navigate('Settings'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <Box mt={'$5'}>
          <Center>
            <VStack gap={'$2'} alignItems="center">
              <Image
                source={
                  data?.data?.data?.avatar
                    ? {uri: data?.data?.data?.avatar}
                    : IMAGES.USER
                }
                alt="image"
                style={{height: 100, width: 100}}
                borderRadius={7}
              />
              <Text fontFamily={'Montserrat-SemiBold'}>
                {data?.data?.data?.nick_name}
              </Text>
            </VStack>
          </Center>
          <Box mt={'$2'}>
            <Box py={'$2'} px={'$3'} bg={'$pink50'} mt={'$3'}>
              <HStack justifyContent="space-between">
                <Text
                  fontFamily="Montserrat-Bold"
                  fontSize={13}
                  color={COLORS.secondary}>
                  Add More Images
                </Text>
                <Pressable
                  onPress={() => {
                    setIsImagePick(true), setImagesPicker(true);
                  }}>
                  <HStack alignItems="center" gap={'$2'}>
                    <AppIcon
                      AntDesignName="plussquare"
                      size={20}
                      color={COLORS.secondary}
                    />
                    <Text
                      fontFamily="Montserrat-Bold"
                      fontSize={13}
                      color={COLORS.secondary}>
                      Add Images
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
            </Box>
            {images?.length > 0 ? (
              <Box px={'$3'} mt={'$4'}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={images}
                  renderItem={({item}: any) => (
                    <Box mr={'$2'}>
                      <Image
                        source={{uri: item?.path ? item?.path : item?.avatar}}
                        alt="user"
                        style={{height: 100, width: 100}}
                        borderRadius={6}
                      />
                    </Box>
                  )}
                />

                {isImagePick && (
                  <Button
                    onPress={() => handelMultipleImage()}
                    mt={'$2'}
                    size="md"
                    variant="solid"
                    action="primary"
                    bgColor={COLORS.primary}
                    isDisabled={isLoading ? true : false}
                    isFocusVisible={false}>
                    <ButtonIcon as={AddIcon} />
                    <ButtonText ml={'$1'}>Save Images</ButtonText>
                  </Button>
                )}
              </Box>
            ) : (
              <Box alignItems={'center'} justifyContent="center" mt={'$2'}>
                <Text fontFamily="Montserrat-Bold" fontSize={13}>
                  No Images Found
                </Text>
              </Box>
            )}
          </Box>

          {/* Details */}
          <Box mt={'$2'}>
            {/* Primary Details */}
            <Box py={'$2'} px={'$3'} bg={'$pink50'} mt={'$3'}>
              <Text
                fontFamily="Montserrat-Bold"
                fontSize={13}
                color={COLORS.secondary}>
                Primary Details
              </Text>
            </Box>
            <VStack gap={'$2'} px={'$3'} mt={'$2'}>
              <VStack gap={'$2'}>
                <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                  Employee Name
                </Text>
                <Text>{data?.data?.data?.name}</Text>
              </VStack>

              <VStack gap={'$2'}>
                <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                  Nick Name
                </Text>
                <Text>{data?.data?.data?.nick_name}</Text>
              </VStack>

              {/* Select Gender and date of birth */}
              <HStack justifyContent={'space-between'} mt={2}>
                <VStack gap={'$2'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                    Gender
                  </Text>
                  <Text>{data?.data?.data?.gender}</Text>
                </VStack>
                <VStack w={'48%'} gap={'$2'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                    Date of Birth
                  </Text>
                  <Text>
                    {data?.data?.data?.dob
                      ? moment(data?.data?.data?.dob).format(`DD-MM-YYYY`)
                      : 'Not Provided'}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
          {/* Personal Details */}
          <Box mt={'$2'}>
            <Box py={'$2'} px={'$3'} bg={'$pink50'} mt={'$3'}>
              <Text
                fontFamily="Montserrat-Bold"
                fontSize={13}
                color={COLORS.secondary}>
                Personal Details
              </Text>
            </Box>
            <VStack gap={'$2'} px={'$3'} mt={'$2'}>
              <VStack gap={'$2'}>
                <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                  Phone Number
                </Text>
                <HStack gap={'$3'} alignItems="center">
                  <Text>{data?.data?.data?.phone}</Text>
                  {data?.data?.data?.phone_verify?.is_verified && (
                    <AppIcon
                      MaterialIconsName="verified"
                      size={20}
                      color={COLORS.secondary}
                    />
                  )}
                </HStack>
              </VStack>

              <VStack gap={'$2'}>
                <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                  Email
                </Text>
                <HStack>
                  <Text>{data?.data?.data?.email}</Text>
                  {data?.data?.data?.email_verify?.is_verified && (
                    <AppIcon
                      MaterialIconsName="verified"
                      size={20}
                      color={COLORS.secondary}
                    />
                  )}
                </HStack>
              </VStack>
              {/* State */}
              <VStack gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  State
                </Text>
                <Text>{data?.data?.data?.location_details?.state}</Text>
              </VStack>

              {/* Select Gender and date of birth */}
              <Box justifyContent={'space-between'} mt={2}>
                <VStack gap={'$2'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                    City
                  </Text>
                  <Text>{data?.data?.data?.location_details?.city}</Text>
                </VStack>
              </Box>
              <VStack gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  Address
                </Text>
                <Text>{data?.data?.data?.location_details?.address}</Text>
              </VStack>
            </VStack>
          </Box>
          {/* Unique Details */}
          <Box mt={'$2'}>
            <Box py={'$2'} px={'$3'} bg={'$pink50'} mt={'$3'}>
              <Text
                fontFamily="Montserrat-Bold"
                fontSize={13}
                color={COLORS.secondary}>
                Unique Details
              </Text>
            </Box>
            <Box px={'$3'} mt={'$2'}>
              <VStack gap={'$2'} mt={'$2'}>
                <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                  Interested/Skills
                </Text>
                <VStack mt={2}>
                  <VStack gap={'$2'} w={'45%'}>
                    <Text
                      fontFamily="Montserrat-Medium"
                      fontSize={13}
                      mt={'$1'}>
                      Personal
                    </Text>
                    <Text>
                      {
                        data?.data?.data?.interests?.find(
                          (i: any) => i?.type === 'professional',
                        )?.category
                      }
                    </Text>
                  </VStack>
                  <VStack w={'45%'} gap={'$2'} mt={'$2'}>
                    <Text
                      fontFamily="Montserrat-Medium"
                      fontSize={13}
                      mt={'$1'}>
                      Professional
                    </Text>
                    <HStack gap={'$1'}>
                      {data?.data?.data?.interests?.map((item: any) => (
                        <Box key={item?._id}>
                          <Text>{item?.label},</Text>
                        </Box>
                      ))}
                    </HStack>
                  </VStack>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </Box>
      </ScrollView>
      {/* Photo Picker */}
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

export default Profile;
