import React, {useState} from 'react';
import {
  Pressable,
  FlatList,
  HStack,
  VStack,
  Text,
  Box,
} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import AppIcon from '~/Components/core/AppIcon';
import {PrivateContainer} from '~/Components/container';
import {useSwrApi} from '~/Hooks';
import {useAppContext} from '~/Contexts';

const Notifications = () => {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDesc, setNotificationDesc] = useState('');
  const {userData} = useAppContext();
  const {data, isValidating} = useSwrApi(`notifications`);
  // console.log(data?.data?.data);

  const NOTIFICATION_DATA: {
    id: string;
    title: string;
    description: string;
    type: string;
    isReceived: boolean;
  }[] = [
    {
      id: '1',
      title: 'Tax Deadline Approaching',
      description:
        'The deadline for tax filing is approaching. Ensure timely submission.',
      type: 'tax',
      isReceived: true,
    },
    {
      id: '2',
      title: 'Audit Report Ready',
      description:
        'Your audit report for this quarter is ready for review and download.',
      type: 'report',
      isReceived: true,
    },
    {
      id: '3',
      title: 'Accounting Consultation Request',
      description:
        'You have received a request for an accounting consultation from a client.',
      type: 'request',
      isReceived: false,
    },
    {
      id: '4',
      title: 'Financial Statement Analysis',
      description:
        'New insights on financial statement analysis have been published.',
      type: 'analysis',
      isReceived: true,
    },
    {
      id: '5',
      title: 'Payment Received',
      description:
        'You have received a payment from a client for accounting services rendered.',
      type: 'payment',
      isReceived: true,
    },
    {
      id: '6',
      title: 'Tax Law Update',
      description:
        'Recent changes in tax laws may impact your clients. Stay informed.',
      type: 'update',
      isReceived: true,
    },
    {
      id: '7',
      title: 'Client Meeting Reminder',
      description:
        'Reminder: You have a scheduled client meeting tomorrow at 10 AM.',
      type: 'reminder',
      isReceived: false,
    },
    {
      id: '8',
      title: 'Task Complete',
      description:
        'The financial reconciliation task has been successfully completed.',
      type: 'task',
      isReceived: true,
    },
    {
      id: '9',
      title: 'System Error Notification',
      description:
        'An error has occurred in the accounting software. Please address it immediately.',
      type: 'error',
      isReceived: false,
    },
    {
      id: '10',
      title: 'Regulatory Compliance Alert',
      description:
        'New regulatory requirements have been introduced. Ensure compliance for clients.',
      type: 'alert',
      isReceived: true,
    },
  ];

  return (
    <PrivateContainer title={'Notifications'} hasBackIcon={true}>
      <Box mx={'$3'} flex={1}>
        {/* SEARCH BAR & FILTER  */}
        <HStack
          mx={'$2'}
          my={'$3'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Pressable bg={'white'} softShadow={'1'} rounded={'$lg'} p={'$2'}>
            <HStack gap={'$2'} alignItems={'center'}>
              <AppIcon
                MaterialCommunityIconsName={'playlist-check'}
                size={22}
                color={'blue'}
              />
              <Text fontWeight={'semibold'} fontSize={'$sm'} color={'$blue500'}>
                Mark All Read
              </Text>
            </HStack>
          </Pressable>
          <Pressable bg={'white'} softShadow={'1'} rounded={'$lg'} p={'$2'}>
            <HStack gap={'$2'} alignItems={'center'}>
              <AppIcon
                MaterialCommunityIconsName={'delete'}
                size={20}
                color={'red'}
              />
              <Text fontWeight={'semibold'} fontSize={'$sm'} color={'$red500'}>
                Delete All
              </Text>
            </HStack>
          </Pressable>
        </HStack>

        {/* content  */}
        <FlatList
          data={NOTIFICATION_DATA}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}: any) => (
            <Pressable>
              <HStack
                w={'$full'}
                key={index}
                p={'$3'}
                my={'$1.5'}
                softShadow={'1'}
                borderLeftWidth={4}
                rounded={'$lg'}
                bg={'white'}
                overflow={'hidden'}
                alignItems={'center'}
                borderColor={'$red500'}>
                <AppIcon
                  MaterialCommunityIconsName={'mail'}
                  size={32}
                  color={COLORS.primary}
                />
                <VStack ml={'$3'} w={'$full'}>
                  <Box w={'80%'}>
                    <Text fontWeight={'semibold'} fontSize={'$sm'}>
                      {item?.title}
                    </Text>
                  </Box>
                  <Box w={'70%'}>
                    <Text fontWeight={'normal'} fontSize={'$xs'}>
                      {item?.description}
                    </Text>
                  </Box>
                </VStack>
              </HStack>
            </Pressable>
          )}
        />

        {/* Notification details bottomSheet  */}
        {/* <BottomSheet
                    visible={isOpen}
                    onDismiss={() => {
                        onClose();
                    }}>
                    <Box bg={'white'}>
                        <HStack
                            justifyContent={'space-between'}
                            width={WIDTH}
                            alignItems={'center'}
                            borderBottomWidth={1}
                            borderBottomRadius={'10'}
                            borderBottomColor={'gray.400'}
                            pb={2}>
                            <Text
                                fontWeight={'bold'}
                                fontSize={'md'}
                                color={COLORS.primary}
                                m={2}>
                                Details :
                            </Text>
                            <AppIcon
                                AntDesignName="close"
                                size={25}
                                color={'#e11d48'}
                                style={{
                                    paddingRight: 20,
                                }}
                                onPress={onClose}
                            />
                        </HStack>

                        <Box m={2}>
                            <Text
                                my={1}
                                fontWeight={'semibold'}
                                fontSize={'md'}
                                color={'coolGray.700'}>
                                {notificationTitle}
                            </Text>
                            <Text
                                my={2}
                                fontWeight={'medium'}
                                fontSize={'sm'}
                                color={'coolGray.600'}>
                                {notificationDesc}
                            </Text>
                        </Box>

                        <Row m={2} justifyContent={'space-between'} alignItems={'center'}>
                            <Pressable _pressed={{ opacity: 0.6 }} onPress={onClose}>
                                <Box
                                    w={WIDTH / 2.5}
                                    alignItems={'center'}
                                    p={2}
                                    my={1}
                                    rounded={'2xl'}
                                    bg={'coolGray.200'}>
                                    <Text fontWeight={'semibold'} color={'#000'}>
                                        Cancel
                                    </Text>
                                </Box>
                            </Pressable>

                            <Pressable _pressed={{ opacity: 0.6 }} onPress={onClose}>
                                <Box
                                    w={WIDTH / 2.5}
                                    alignItems={'center'}
                                    p={2}
                                    my={1}
                                    rounded={'2xl'}
                                    bg={{
                                        linearGradient: {
                                            colors: ['red.400', 'rose.400'],
                                            start: [0, 1],
                                            end: [1, 1],
                                        },
                                    }}>
                                    <Text fontWeight={'semibold'} color={'#fff'}>
                                        Delete
                                    </Text>
                                </Box>
                            </Pressable>
                        </Row>
                    </Box>
                </BottomSheet> */}
      </Box>
    </PrivateContainer>
  );
};

export default Notifications;
