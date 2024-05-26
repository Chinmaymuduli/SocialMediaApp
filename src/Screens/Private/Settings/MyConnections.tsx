import React, {useState} from 'react';
import {PrivateContainer} from '~/Components/container';
import {
  Box,
  ButtonText,
  Divider,
  FlatList,
  HStack,
  Image,
  Pressable,
  Spinner,
  VStack,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {Button} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {useSwrApi} from '~/Hooks';
import FetchLoader from '~/Components/core/FetchLoader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {LinearComponent} from '~/Components/core';
import {COLORS} from '~/Styles';
import MyConnectionCompo from './MyConnectionCompo';
import RequestCompo from './RequestCompo';

const MyConnections = () => {
  const [selectTab, setSelectTab] = useState('1');
  const {data, isValidating, mutate} = useSwrApi(
    `connections/read-all?type=all&is_accepted=true&require_all=true`,
  );
  const {
    data: requestData,
    isValidating: requestLoading,
    mutate: requestMutate,
  } = useSwrApi(
    `connections/read-all?type=receive&is_accepted=false&require_all=true`,
  );

  const {data: recommendationData} = useSwrApi(
    `connections/read-all-recommendation?require_all=true`,
  );

  const btnArray = [
    {
      id: '1',
      title: 'My Connections',
    },
    {
      id: '2',
      title: 'Request Connections',
    },
  ];
  if (isValidating) <FetchLoader />;

  useFocusEffect(
    React.useCallback(() => {
      mutate();
      requestMutate();
    }, []),
  );

  return (
    <PrivateContainer title={'My Connections'} hasBackIcon={true}>
      <LinearComponent>
        <Box px={'$3'} mt={'$4'}>
          <Box bg="$white" softShadow="1" borderRadius={10}>
            <HStack justifyContent="space-between">
              {btnArray?.map(btn => (
                <Pressable
                  onPress={() => setSelectTab(btn?.id)}
                  py={'$3'}
                  bg={selectTab === btn.id ? COLORS.primary : '$white'}
                  w={'50%'}
                  alignItems="center"
                  borderRadius={10}>
                  <Text
                    fontFamily="Montserrat-SemiBold"
                    fontSize={13}
                    color={selectTab === btn.id ? '$white' : COLORS.primary}>
                    {btn?.title}
                  </Text>
                </Pressable>
              ))}
            </HStack>
          </Box>
        </Box>
        <Box mt={'$4'}>
          {/* <FlatList
            data={data?.data?.data}
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
                      borderRadius={20}
                    />
                    <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                      {item?.sender_id?.nick_name ||
                        item?.sender_id?.name ||
                        item?.sender_id?.phone}
                    </Text>
                  </HStack>
                  <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
                    <Button
                      onPress={() =>
                        navigate('UserProfile', {user_id: item?.sender_id?._id})
                      }
                      size="sm"
                      h={20}
                      variant="outline"
                      action="primary"
                      borderColor={'$green400'}
                      isDisabled={false}
                      isFocusVisible={false}>
                      <ButtonText fontSize={12} color={'$green600'}>
                        Visit Profile{' '}
                      </ButtonText>
                    </Button>
                    <Button
                      onPress={() =>
                        navigate('ChatDetails', {
                          connection_id: item?._id,
                          userNickName: item?.sender_id?.nick_name,
                          isReceived: true,
                          name: item?.sender_id?.name || 'Demo',
                        })
                      }
                      size="md"
                      h={20}
                      w={'$24'}
                      variant="outline"
                      action="primary"
                      borderColor={'$pink400'}
                      isDisabled={false}
                      isFocusVisible={false}>
                      <ButtonText fontSize={12} color={'$pink600'}>
                        Message{' '}
                      </ButtonText>
                    </Button>
                  </HStack>
                </VStack>
                <Divider mt={'$4'} />
              </Box>
            )}
          /> */}
          {selectTab === '1' && <MyConnectionCompo data={data?.data?.data} />}
          {selectTab === '2' && (
            <RequestCompo
              data={requestData?.data?.data}
              requestMutate={requestMutate}
              mutate={mutate}
              recommendationData={recommendationData?.data?.data}
            />
          )}
        </Box>
      </LinearComponent>
    </PrivateContainer>
  );
};

export default MyConnections;
