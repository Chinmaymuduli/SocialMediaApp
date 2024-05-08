import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Box,
  HStack,
  Input,
  InputField,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {PrivateContainer} from '~/Components/container';
import AppIcon from '~/Components/core/AppIcon';
import {useSwrApi} from '~/Hooks';
import {useAppContext} from '~/Contexts';
import moment from 'moment';

export const MeetingData = [
  {
    id: '1',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: '20 July,2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    meeting: 'Sales Representative',
    day: 'Friday',
    person: 'Jhone',
    type: 'Upcoming',
  },
  {
    id: '2',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'For Development',
    person: 'Jhone',
    type: 'Ongoing',
  },
  {
    id: '3',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'Sales Representative',
    person: 'Jhone',
    type: 'Closed',
  },
  {
    id: '4',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'About Salary',
    person: 'Jhone',
    type: 'Upcoming',
  },
  {
    id: '5',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    designation: 'App Developer',
    day: 'Friday',
    meeting: 'Client Visit',
    person: 'Jhone',
    type: 'Ongoing',
  },
  {
    id: '6',
    name: 'pratyush kumar',
    starttime: '10:20 Pm',
    endtime: '2:20 pm',
    area: 'Bbsr',
    location: 'india',
    clientname: 'searchingyard',
    date: 'Friday, 20-02-2023',
    designation: 'App Developer',
    img: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&uid=R87654678&ga=GA1.1.2105023192.1667473463&semt=robertav1_2_sidr',
    day: 'Friday',
    meeting: 'Sales Representative',
    person: 'Jhone',
    type: 'Closed',
  },
];

const Meetings = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [order, setOrder] = useState('');
  const {userData} = useAppContext();
  const {data, isValidating} = useSwrApi(
    `meetings?require_all=true&user_id=${userData?._id}`,
  );

  // console.log(data?.data?.data);

  return (
    <PrivateContainer title={'Meetings'} bg={'purple.50'} hasBackIcon={true}>
      <HStack
        px={'$3'}
        pt={'$5'}
        pb={'$1'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text bold fontSize={16}>
          All Meetings
        </Text>

        {/* <Pressable onPress={() => setDatePickerVisibility(true)}>
          <HStack gap={'$2'} alignItems={'center'}>
            <AppIcon IoniconsName="filter" size={25} color={COLORS.secondary} />
            <Text fontWeight={'semibold'}>FilterBy</Text>
          </HStack>
        </Pressable> */}
      </HStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        {data?.data?.data?.map((item: any) => (
          <Pressable
            mx={'$3'}
            key={item?._id}
            mt={'$4'}
            borderRadius={5}
            borderColor={COLORS.textSecondary}
            softShadow={'1'}
            bgColor={'white'}>
            <HStack
              justifyContent="space-between"
              bg={'$pink50'}
              alignItems={'center'}>
              <HStack alignItems={'center'} gap={'$2'} px={'$2'} py={'$1'}>
                <AppIcon
                  AntDesignName="calendar"
                  size={20}
                  color={COLORS.secondary}
                />
                <Text fontSize={12} fontFamily="Montserrat-Bold">
                  {'Amount' + ' : ' + item?.amount}
                </Text>
              </HStack>
              <Box px={'$4'}>
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={13}
                  color={item?.is_accepted ? '$green500' : COLORS.secondary}>
                  {item?.is_accepted ? 'Accepted' : 'Pending'}
                </Text>
              </Box>
            </HStack>

            <Box px={'$3'} mt={'$2'}>
              <HStack justifyContent={'space-between'}>
                <VStack gap={'$1'}>
                  <Text fontFamily="Montserrat-Bold" fontSize={13}>
                    Meeting Date
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {moment(item?.date).format('ll')}
                  </Text>
                </VStack>
                <VStack gap={'$1'}>
                  <Text bold fontSize={13}>
                    Meeting Time
                  </Text>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {moment(item?.date).format('LT')}
                  </Text>
                </VStack>
              </HStack>
              <HStack pt={'$3'}>
                <HStack mr={'$1'} alignItems={'center'}>
                  <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                    Meeting With :
                  </Text>
                  <Text
                    fontSize={13}
                    fontFamily="Montserrat-Bold"
                    px={'$2'}
                    color={COLORS.secondary}>
                    {item?.sender_id?.name || item?.sender_id?.phone}
                  </Text>
                </HStack>
              </HStack>
            </Box>
            <Box borderBottomWidth={1} borderStyle={'dashed'} py={'$2'}></Box>
            <HStack px={'$3'} py={'$3'}>
              <HStack mr={'$1'} w={'$80'}>
                <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                  Location :
                </Text>
                <Text
                  fontSize={12}
                  fontFamily="Montserrat-Medium"
                  px={'$2'}
                  color={COLORS.secondary}>
                  {item?.location_details?.address +
                    ' , ' +
                    item?.location_details?.city +
                    ' , ' +
                    item?.location_details?.state +
                    ' , ' +
                    item?.location_details?.pincode}
                </Text>
              </HStack>
            </HStack>
            {/* <Box position={'absolute'} bottom={0} right={0}>
              <Box
                bg={'blue.300'}
                p={2}
                borderTopLeftRadius={20}
                borderBottomRightRadius={5}>
                <AppIcon AntDesignName="arrowright" size={18} color={'black'} />
              </Box>
            </Box> */}
          </Pressable>
        ))}
      </ScrollView>

      {/* <BottomSheet
        visible={isOpen}
        onDismiss={() => {
          onClose();
        }}>
        <VStack space={2} mt={3}>
          <Text bold fontSize={16} px={2}>
            Status :{' '}
          </Text>
          <VStack space={3}>
            {Sort_Array?.map((item, _) => (
              <Pressable
                key={item?.id}
                m={1}
                onPress={() => {
                  setOrder(item?.title), onClose();
                }}
                borderWidth={1}
                borderRadius={20}
                borderColor={COLORS.primary}
                bgColor={order === item?.title ? COLORS.primary : 'white'}>
                <HStack alignItems={'center'} mx={'4'} py={2}>
                  <AppIcon
                    AntDesignName="codepen-circle"
                    size={20}
                    color={order === item?.title ? 'white' : 'blue'}
                    style={{
                      width: '8%',
                    }}
                  />
                  <Text
                    bold
                    fontSize={'sm'}
                    color={order === item?.title ? 'white' : COLORS.primary}
                    mx={4}
                    width={'70%'}>
                    {item?.title}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </BottomSheet>

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={() => setDatePickerVisibility(false)}
        onCancel={() => setDatePickerVisibility(false)}
      /> */}
    </PrivateContainer>
  );
};

export default Meetings;

const styles = StyleSheet.create({});
