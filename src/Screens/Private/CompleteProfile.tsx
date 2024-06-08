import React, {useEffect, useState} from 'react';
import {IMAGES} from '~/Assets';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {useNavigation} from '@react-navigation/native';
import {
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  Box,
  CircleIcon,
  FlatList,
  HStack,
  Image,
  InputField,
  Pressable,
  RadioIcon,
  RadioIndicator,
  SafeAreaView,
  Text,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';
import {ScrollView} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {VStack} from '@gluestack-ui/themed';
import {Input} from '@gluestack-ui/themed';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Button, PhotoPicker, StatePicker} from '~/Components/core';
import AppIcon from '~/Components/core/AppIcon';
import {useAppContext} from '~/Contexts';
import {useBasicFunctions, useMutation, useSwrApi} from '~/Hooks';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Radio} from '@gluestack-ui/themed';
import {RadioLabel} from '@gluestack-ui/themed';
import {RadioGroup} from '@gluestack-ui/themed';
import {Actionsheet} from '@gluestack-ui/themed';
import {ActionsheetItemText} from '@gluestack-ui/themed';
import {Alert} from 'react-native';
import State from '~/Constants/State';

const CompleteProfile = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {userData} = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nickName, setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [expertise, setExpertise] = useState<any>();
  const [expertiseFor, setExpertiseFor] = useState<any>();
  const [allState, setState] = useState<any>();
  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [profileImage, setProfileImage] = useState<any>();
  const [otp, setOtp] = useState<string>('');
  const [isPhoneVerify, setIsPhoneVerify] = useState<boolean>(false);
  const [isEmailVerify, setIsEmailVerify] = useState<boolean>(false);

  const [imagesPicker, setImagesPicker] = useState(false);
  const [isImagePick, setIsImagePick] = useState(false);
  const [images, setImages] = useState<any>([]);

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [showActionsheet2, setShowActionsheet2] = React.useState(false);
  const [citiesModal, setCitiesModal] = React.useState(false);

  const [allCities, setAllCities] = useState<any>([]);
  const [selectCity, setSelectCity] = useState<any>();

  const {mutation, isLoading} = useMutation();
  const {data} = useSwrApi(`interests?type=personal`);
  const {data: professionalData} = useSwrApi(
    `interests?type=professional&search=${expertise}`,
  );

  const {getUser} = useBasicFunctions();

  useEffect(() => {
    setEmail(userData?.email);
    setProfileImage({path: userData?.avatar});
    setPhone(userData?.phone);
    setName(userData?.name);
    setNickName(userData?.nick_name);
    setSelectCity(userData?.location_details?.city);
    setArea(userData?.location_details?.address);
    setGender(userData?.gender);
    setSelectedDate(userData?.dob);
    setState({
      title: userData?.location_details?.state,
      state: userData?.location_details?.state,
    });

    setExpertise(
      userData?.interests?.find((item: any) => item?.type === 'personal'),
    );
    setExpertiseFor(
      userData?.interests?.find((item: any) => item?.type === 'professional'),
    );
  }, [userData]);

  const handelUpdateProfile = async () => {
    try {
      const locationDetails = {
        pincode: '',
        address: area,
        city: selectCity,
        state: allState?.title,
        coordinates: [12.988, 77.6895],
      };
      const interests = [expertise?._id, expertiseFor?._id];
      const locationDetailsString = JSON.stringify(locationDetails);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('nick_name', nickName);
      formData.append('gender', gender);
      formData.append('dob', moment(selectedDate).toISOString());
      interests.forEach(interest => {
        formData.append('interests', interest);
      });
      formData.append('location_details', locationDetailsString);
      profileImage?.path &&
        formData.append('avatar', {
          uri: profileImage?.path,
          name: 'image.png',
          fileName: 'image',
          type: 'image/png',
        });

      !userData?.phone_verify?.is_verified && formData.append('phone', phone);
      !userData?.email_verify?.is_verified && formData.append('email', email);

      const updateData = await mutation(`users/self/update`, {
        method: 'PUT',
        body: formData,
        isFormData: true,
      });
      console.log(updateData);
      if (updateData?.status === 200) {
        Alert.alert('Success', 'Profile Updated Successfully');
        getUser();
        navigate('TabLayout');
      } else {
        Alert.alert('Error', 'Please fill all the fields');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log({expertise, expertiseFor});
  const handleStateSelect = (state: any) => {
    setShowStatePicker(false);
    setState(state);
  };
  const handleConfirm = (date: any) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  // console.log({allCities});
  useEffect(() => {
    const data = State?.find((item: any) => item?.title === allState?.title);
    setAllCities(data?.Cities);
  }, [allState]);

  const handleSelect = (data: any) => {
    setShowActionsheet(false);
    setExpertise(data);
  };
  const handleSelect2 = (data: any) => {
    setShowActionsheet2(false);
    setExpertiseFor(data);
  };

  const handelVerifyPhone = async () => {
    try {
      setIsPhoneVerify(!isPhoneVerify);
    } catch (error) {
      console.log(error);
    }
  };

  const handelImages = (img: any) => {
    console.log({img});
    setImages((prev: any) => [...prev, img]);
  };
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
        // mutate();
        setIsImagePick(false);
        Alert.alert('Success', 'Images Added Successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelCities = (city: any) => {
    setSelectCity(city);
    setCitiesModal(false);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Box bg={'$pink300'}>
          <Text
            textAlign={'center'}
            fontFamily={'Montserrat-SemiBold'}
            py={'$2'}>
            Update Your Profile Details to Continue
          </Text>
        </Box>
        {/* Profile Picture */}
        <Box mt={'$4'}>
          <Pressable
            bg={'$coolGray200'}
            // borderWidth={2}
            // borderColor={'$coolGray300'}
            rounded={'$lg'}
            alignSelf={'center'}
            alignItems={'center'}>
            {profileImage?.path ? (
              <Image
                source={profileImage?.path}
                style={{
                  height: 100,
                  width: 100,
                }}
                alt={'Choose Image'}
                rounded={'$lg'}
              />
            ) : (
              <Image
                source={
                  profileImage?.path ? {uri: profileImage?.path} : IMAGES.USER
                }
                style={{
                  height: 100,
                  width: 100,
                }}
                alt={'Choose Image'}
                rounded={'$lg'}
              />
            )}
          </Pressable>
          {/* <Box position="absolute" right={55} top={50}>
            <Pressable>
              <HStack alignItems="center" gap={'$1'}>
                <AppIcon AntDesignName={'plus'} size={15} color={'black'} />
                <Text fontFamily="Montserrat-Bold" fontSize={13}>
                  2 more
                </Text>
              </HStack>
            </Pressable>
          </Box> */}

          <Pressable
            alignItems="center"
            justifyContent="center"
            onPress={() => setVisiblePhoto(true)}>
            <HStack
              alignItems="center"
              gap={'$1'}
              borderWidth={1}
              borderRadius={7}
              borderColor={COLORS.secondary}
              px={'$2'}
              mt={'$2'}
              py={'$1'}>
              <AppIcon
                AntDesignName={'plus'}
                size={16}
                color={COLORS.secondary}
              />
              <Text
                fontFamily="Montserrat-Medium"
                fontSize={12}
                color={COLORS.secondary}>
                Add Photo
              </Text>
            </HStack>
          </Pressable>
        </Box>

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
                onPress={
                  images?.length >= 4
                    ? () => {
                        Alert.alert('Error', 'You can add maximum 4 images');
                      }
                    : () => {
                        setIsImagePick(true), setImagesPicker(true);
                      }
                }>
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
                  <Box mr={'$3'}>
                    <Image
                      source={{uri: item?.path ? item?.path : item?.avatar}}
                      alt="user"
                      style={{height: 70, width: 70}}
                      borderRadius={6}
                    />
                  </Box>
                )}
              />

              {isImagePick && (
                <Box mt={'$2'}>
                  <Button
                    borderRadius={5}
                    isLoading={isLoading}
                    btnWidth={'full'}
                    mx={'$4'}
                    py={'$2'}
                    onPress={() => handelMultipleImage()}>
                    <Text
                      color="$white"
                      fontFamily="Montserrat-Bold"
                      fontSize={13}>
                      Save Images
                    </Text>
                  </Button>
                </Box>
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
                User Name *
              </Text>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Name"
                  fontSize={12}
                  value={name}
                  onChangeText={txt => setName(txt)}
                />
              </Input>
            </VStack>

            <VStack gap={'$2'}>
              <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                Nick Name *
              </Text>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={userData?.nick_name ? true : false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter nick name here"
                  fontSize={12}
                  value={nickName}
                  onChangeText={txt => setNickName(txt)}
                />
              </Input>
            </VStack>

            {/* Select Gender and date of birth */}
            <HStack justifyContent={'space-between'} mt={2}>
              <VStack gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  Gender *
                </Text>
                {/* <Pressable
                
                  borderWidth={1}
                  borderRadius={5}
                  bg={'white'}
                  borderColor={'$coolGray300'}
                  minWidth={160}>
                  <Box py={'$2.5'} px={'$2'}>
                    <Text fontSize={12} color={'$coolGray500'}>
                      {'Select Gender'}
                    </Text>
                  </Box>
                </Pressable> */}
                <RadioGroup value={gender} onChange={setGender}>
                  <HStack gap={'$2'}>
                    <Radio
                      value="male"
                      size="md"
                      isInvalid={false}
                      isDisabled={false}>
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Male</RadioLabel>
                    </Radio>
                    <Radio
                      value="female"
                      size="md"
                      isInvalid={false}
                      isDisabled={false}>
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>Female</RadioLabel>
                    </Radio>
                  </HStack>
                </RadioGroup>
              </VStack>
              <VStack w={'48%'} gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  Date of Birth *
                </Text>
                <Pressable
                  onPress={() => setDatePickerVisibility(true)}
                  px={'$1'}
                  borderRadius={5}
                  borderWidth={1}
                  borderColor={'$coolGray300'}>
                  <HStack justifyContent={'space-between'} py={'$2.5'}>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={13}
                      color={'$coolGray500'}>
                      {selectedDate
                        ? moment(selectedDate).format('DD - MM - YYYY')
                        : 'DD - MM - YYYY'}
                    </Text>
                    <Fontisto name="date" size={18} color={'#0d9488'} />
                  </HStack>
                </Pressable>
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
                Phone Number *
              </Text>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={userData?.phone_verify?.is_verified ? true : false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Phone Number"
                  fontSize={12}
                  value={phone}
                  onChangeText={txt => setPhone(txt)}
                  keyboardType="phone-pad"
                />
              </Input>
              {!userData?.phone_verify?.is_verified && (
                <Pressable
                  onPress={() => handelVerifyPhone()}
                  alignSelf="flex-end">
                  <Text
                    fontFamily="Montserrat-Bold"
                    fontSize={13}
                    color={'$green500'}>
                    Verify Phone
                  </Text>
                </Pressable>
              )}
            </VStack>

            {!isPhoneVerify && (
              <VStack>
                <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                  Enter OTP
                </Text>
                <HStack alignItems="center" gap={15} pr={'$2'}>
                  <Input
                    alignItems="center"
                    borderRadius={'$xl'}
                    mt={'$1'}
                    flex={1}>
                    <InputField
                      type="text"
                      maxLength={6}
                      placeholder="Enter OTP"
                      value={otp}
                      onChangeText={text => setOtp(text)}
                    />
                  </Input>
                  <Pressable bg={COLORS.secondary} borderRadius={'$xl'}>
                    <Text
                      fontFamily="Montserrat-Bold"
                      color={'$white'}
                      p={'$2'}>
                      Verify
                    </Text>
                  </Pressable>
                </HStack>
              </VStack>
            )}

            <VStack gap={'$2'}>
              <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                Email *
              </Text>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={userData?.email_verify?.is_verified ? true : false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter email here"
                  fontSize={12}
                  value={email}
                  onChangeText={txt => setEmail(txt)}
                />
              </Input>
              {!userData?.email_verify?.is_verified && (
                <Pressable
                  onPress={() => setIsEmailVerify(true)}
                  alignSelf="flex-end">
                  <Text
                    fontFamily="Montserrat-Bold"
                    fontSize={13}
                    color={'$green500'}>
                    Verify Email
                  </Text>
                </Pressable>
              )}
            </VStack>

            {isEmailVerify && (
              <VStack>
                <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                  Enter OTP
                </Text>
                <HStack alignItems="center" gap={15} pr={'$2'}>
                  <Input
                    alignItems="center"
                    borderRadius={'$xl'}
                    mt={'$1'}
                    flex={1}>
                    <InputField
                      type="text"
                      maxLength={6}
                      placeholder="Enter OTP"
                      value={otp}
                      onChangeText={text => setOtp(text)}
                    />
                  </Input>
                  <Pressable bg={COLORS.secondary} borderRadius={'$xl'}>
                    <Text
                      fontFamily="Montserrat-Bold"
                      color={'$white'}
                      p={'$2'}>
                      Verify
                    </Text>
                  </Pressable>
                </HStack>
              </VStack>
            )}
            {/* State */}
            <VStack gap={'$2'}>
              <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                State *
              </Text>
              <Pressable
                onPress={() => setShowStatePicker(true)}
                borderWidth={1}
                borderRadius={5}
                style={{
                  height: 45,
                }}
                bg={'white'}
                borderColor={'$coolGray300'}>
                <Text
                  fontWeight={'semibold'}
                  fontSize={'$sm'}
                  color={'$coolGray500'}
                  p={'$3'}>
                  {allState?.title ? allState?.title : 'Select State'}
                </Text>
              </Pressable>
            </VStack>

            {/* Select Gender and date of birth */}
            <Box justifyContent={'space-between'} mt={2}>
              <VStack gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  City *
                </Text>
                <Pressable
                  onPress={() => setCitiesModal(true)}
                  borderWidth={1}
                  borderRadius={5}
                  borderColor={'$coolGray300'}
                  bg={'$coolGray100'}
                  minWidth={160}>
                  <Box py={'$2.5'} px={'$2'}>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={'$sm'}
                      color={'$coolGray500'}>
                      {selectCity ? selectCity : 'Select City'}
                    </Text>
                  </Box>
                </Pressable>
                {/* <Input
                  // flex={1}
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  alignItems="center"
                  borderColor="$coolGray300"
                  isInvalid={false}
                  isReadOnly={false}>
                  <InputField
                    placeholder="Enter City"
                    fontSize={12}
                    value={city}
                    onChangeText={txt => setCity(txt)}
                  />
                </Input> */}
              </VStack>
            </Box>
            <VStack gap={'$2'}>
              <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                Area *
              </Text>
              <Input
                // flex={1}
                variant="outline"
                size="md"
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Area"
                  fontSize={12}
                  value={area}
                  onChangeText={txt => setArea(txt)}
                />
              </Input>
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
            {/* <VStack gap={'$2'}>
              <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                Expertise *
              </Text>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField placeholder="Enter Name" fontSize={12} />
              </Input>
            </VStack> */}

            <VStack gap={'$2'} mt={'$2'}>
              <Text mt={4} fontFamily="Montserrat-Medium" fontSize={13}>
                Interested / Skills *
              </Text>
              <HStack justifyContent={'space-between'} mt={2}>
                <VStack gap={'$2'} w={'45%'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                    Personal
                  </Text>
                  <Pressable
                    onPress={() => setShowActionsheet(true)}
                    borderWidth={1}
                    borderRadius={5}
                    style={{
                      height: 45,
                    }}
                    bg={'white'}
                    borderColor={'$coolGray300'}>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={'$sm'}
                      color={'$coolGray500'}
                      p={'$3'}>
                      {expertise?.label ? expertise?.label : 'Select Personal'}
                    </Text>
                  </Pressable>
                </VStack>
                <VStack w={'45%'} gap={'$2'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                    Professional
                  </Text>
                  <Pressable
                    onPress={() => setShowActionsheet2(true)}
                    borderWidth={1}
                    borderRadius={5}
                    style={{
                      height: 45,
                    }}
                    bg={'white'}
                    borderColor={'$coolGray300'}>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={'$sm'}
                      color={'$coolGray500'}
                      p={'$3'}>
                      {expertiseFor?.label
                        ? expertiseFor?.label
                        : 'Select Personal'}
                    </Text>
                  </Pressable>
                </VStack>
              </HStack>
            </VStack>
            <VStack gap={'$2'} mt={'$2'}>
              <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                Description
              </Text>
              <Textarea
                // size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}>
                <TextareaInput placeholder="Write description..." />
              </Textarea>
            </VStack>
          </Box>
        </Box>

        <Box mt={'$7'} mb={'$4'}>
          <Button
            borderRadius={5}
            isLoading={isLoading}
            btnWidth={'full'}
            mx={'$4'}
            py={'$2'}
            onPress={() => handelUpdateProfile()}>
            <Text color="$white" fontFamily="Montserrat-Bold" fontSize={13}>
              Update
            </Text>
          </Button>
        </Box>
        <PhotoPicker
          visible={visiblePhoto}
          onDismiss={() => setVisiblePhoto(false)}
          setImageUrl={setProfileImage}
          cropperCircleOverlay={true}
          postImages={true}
        />

        <PhotoPicker
          visible={imagesPicker}
          onDismiss={() => setImagesPicker(false)}
          setImageUrl={(img: any) => handelImages(img)}
          cropperCircleOverlay={true}
          postImages={false}
        />
      </ScrollView>
      {/* state modal */}
      <StatePicker
        onClose={() => setShowStatePicker(false)}
        onSelect={(state: any) => {
          handleStateSelect(state);
        }}
        visible={showStatePicker}
      />
      {/* date picker */}
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => handleConfirm(date)}
        onCancel={() => setDatePickerVisibility(false)}
        maximumDate={new Date()}
      />
      {/* ActionSheet */}
      <Actionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}
        zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {data?.data?.data?.map((item: any) => (
            <ActionsheetItem onPress={() => handleSelect(item)} key={item?._id}>
              <ActionsheetItemText>{item?.label}</ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
      {/* 2nd */}
      <Actionsheet
        isOpen={showActionsheet2}
        onClose={() => setShowActionsheet2(false)}
        zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {professionalData?.data?.data?.map((item: any) => (
            <ActionsheetItem
              onPress={() => handleSelect2(item)}
              key={item?._id}>
              <ActionsheetItemText>{item?.label}</ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
      {/* Cities  */}
      <Actionsheet
        isOpen={citiesModal}
        onClose={() => setCitiesModal(false)}
        zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {allCities?.map((item: any) => (
            <ActionsheetItem onPress={() => handelCities(item)} key={item}>
              <ActionsheetItemText>{item}</ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
};

export default CompleteProfile;
