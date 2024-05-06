import React, {useEffect, useState} from 'react';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {useNavigation} from '@react-navigation/native';
import {
  AlertCircleIcon,
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
  Box,
  ChevronDownIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Icon,
  Image,
  InputField,
  Pressable,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
} from '@gluestack-ui/themed';
import {ScrollView} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {VStack} from '@gluestack-ui/themed';
import {Input} from '@gluestack-ui/themed';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Button, PhotoPicker} from '~/Components/core';
import AppIcon from '~/Components/core/AppIcon';
import {useAppContext} from '~/Contexts';
import {useMutation} from '~/Hooks';

const Profile = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {userData} = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nickName, setNickName] = useState('');
  const [gender, setGender] = useState('');
  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [profileImage, setProfileImage] = useState<any>();
  const {mutation, isLoading} = useMutation();

  useEffect(() => {
    setEmail(userData?.email);
  }, [userData]);

  const avatars = [
    {
      src: 'https://example.com.jpg',
      alt: 'Sandeep Srivastva',
      color: '$emerald600',
    },
    {src: 'https://example.com.jpg', alt: 'Arjun Kapoor', color: '$cyan600'},
    {
      src: 'https://example.com.jpg',
      alt: 'Ritik Sharma ',
      color: '$indigo600',
    },
    {src: 'https://example.com.jpg', alt: 'Akhil Sharma', color: '$gray600'},
    {src: 'https://example.com.jpg', alt: 'Rahul Sharma ', color: '$red400'},
  ];
  const extraAvatars = avatars.slice(1);
  const remainingCount = extraAvatars.length;
  const handelUpdateProfile = async () => {
    try {
      const updateData = await mutation(`users/self/update`, {
        method: 'PUT',
        body: {
          name,
          nickName,
          gender,
        },
      });
      console.log(updateData?.results?.error);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(profileImage?.path);

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
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        {/* Profile Picture */}
        <Box mt={'$4'}>
          <Pressable
            bg={'$coolGray200'}
            // borderWidth={2}
            // borderColor={'$coolGray300'}
            rounded={'$lg'}
            alignSelf={'center'}
            alignItems={'center'}>
            {profileImage ? (
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
                source={IMAGES.USER}
                style={{
                  height: 100,
                  width: 100,
                }}
                alt={'Choose Image'}
                rounded={'$lg'}
              />
            )}
          </Pressable>
          <Box position="absolute" right={55} top={50}>
            <Pressable>
              <HStack alignItems="center" gap={'$1'}>
                <AppIcon AntDesignName={'plus'} size={15} color={'black'} />
                <Text fontFamily="Montserrat-Bold" fontSize={13}>
                  2 more
                </Text>
              </HStack>
            </Pressable>
          </Box>

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
                Add Photos
              </Text>
            </HStack>
          </Pressable>
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
                Employee Name *
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
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Text here"
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
                <Pressable
                  // onPress={onOpen}
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
                </Pressable>
              </VStack>
              <VStack w={'48%'} gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  Date of Birth *
                </Text>
                <Pressable
                  // onPress={() => setBirthDatePickerVisibility(true)}
                  px={'$1'}
                  borderRadius={5}
                  borderWidth={1}
                  borderColor={'$coolGray300'}>
                  <HStack justifyContent={'space-between'} py={'$2.5'}>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={13}
                      color={'$coolGray500'}>
                      {'DD - MM - YYYY'}
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
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Name"
                  fontSize={12}
                  value={phone}
                  onChangeText={txt => setPhone(txt)}
                />
              </Input>
            </VStack>

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
                  placeholder="Enter Text here"
                  fontSize={12}
                  value={email}
                  onChangeText={txt => setEmail(txt)}
                />
              </Input>
            </VStack>
            {/* State */}
            <VStack gap={'$2'}>
              <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                State *
              </Text>
              <Pressable
                // onPress={onOpen}
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
                  {'Select State'}
                </Text>
              </Pressable>
            </VStack>

            {/* Select Gender and date of birth */}
            <HStack justifyContent={'space-between'} mt={2}>
              <VStack gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  City *
                </Text>
                <Pressable
                  // onPress={onOpen}
                  borderWidth={1}
                  borderRadius={5}
                  bg={'white'}
                  borderColor={'$coolGray300'}
                  minWidth={160}>
                  <Box py={'$2.5'}>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={'$sm'}
                      color={'$coolGray500'}>
                      {'Select City'}
                    </Text>
                  </Box>
                </Pressable>
              </VStack>
              <VStack w={'48%'} gap={'$2'}>
                <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                  Area *
                </Text>
                <Pressable
                  // onPress={() => setBirthDatePickerVisibility(true)}
                  px={'$1'}
                  borderRadius={5}
                  borderWidth={1}
                  borderColor={'$coolGray300'}>
                  <HStack justifyContent={'space-between'} py={'$2.5'}>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={13}
                      color={'$coolGray500'}>
                      {'Select Area'}
                    </Text>
                  </HStack>
                </Pressable>
              </VStack>
            </HStack>
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
                Interested In *
              </Text>
              {/* <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField placeholder="Enter Text here" fontSize={12} />
              </Input> */}

              {/* <FormControl isRequired isInvalid>
                <FormControlLabel>
                  <FormControlLabelText>Personal</FormControlLabelText>
                </FormControlLabel>
                <Select>
                  <SelectTrigger>
                    <SelectInput placeholder="Select option" />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Red" value="red" />
                      <SelectItem label="Blue" value="blue" />
                      <SelectItem label="Black" value="black" />
                      <SelectItem label="Pink" value="pink" isDisabled={true} />
                      <SelectItem label="Green" value="green" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <FormControlHelper>
                  <FormControlHelperText>
                    You can only select one option
                  </FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>Mandatory field</FormControlErrorText>
                </FormControlError>
              </FormControl> */}
              <HStack justifyContent={'space-between'} mt={2}>
                <VStack gap={'$2'} w={'45%'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                    Personal
                  </Text>
                  <Select>
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Select option" />
                      <SelectIcon>
                        <Icon as={ChevronDownIcon} />
                      </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Dancing" value="dance" />
                        <SelectItem label="Singing" value="sing" />
                        <SelectItem label="Drawing" value="draw" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </VStack>
                <VStack w={'45%'} gap={'$2'}>
                  <Text fontFamily="Montserrat-Medium" fontSize={13} mt={'$1'}>
                    Professional
                  </Text>
                  <Select>
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Select option" />
                      <SelectIcon>
                        <Icon as={ChevronDownIcon} />
                      </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="UX Research" value="ux" />
                        <SelectItem label="Web Development" value="web" />
                        <SelectItem
                          label="Cross Platform Development Process"
                          value="cross-platform"
                        />
                        <SelectItem label="UI Designing" value="ui" />
                        <SelectItem
                          label="Backend Development"
                          value="backend"
                        />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </VStack>
              </HStack>
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
              Post
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
      </ScrollView>
    </PrivateContainer>
  );
};

export default Profile;
