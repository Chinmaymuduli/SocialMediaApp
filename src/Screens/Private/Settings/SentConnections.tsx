import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {
  AddIcon,
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {ANIMATIONS, IMAGES} from '~/Assets';

import {useMutation, useSwrApi} from '~/Hooks';
import FetchLoader from '~/Components/core/FetchLoader';
import Empty from '~/Components/core/Empty';
import {useNavigation} from '@react-navigation/native';
import {
  PrivateNavigationProp,
  PrivateScreenProps,
} from '~/Routes/Private/types';
import {Button} from '~/Components/core';
import {Pressable} from 'react-native';

const SentConnections = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {mutation, isLoading} = useMutation();
  const {data, isValidating, mutate} = useSwrApi(
    `connections/read-all?type=send&require_all=true`,
  );
  console.log(data?.data?.data);
  if (isValidating) <FetchLoader />;
  return (
    <PrivateContainer title={'Sent Connections'} hasBackIcon={true}>
      <Box mt={'$4'}>
        <FlatList
          data={data?.data?.data}
          renderItem={({item}: any) => (
            <Box py={'$1'}>
              <VStack px={'$4'}>
                <HStack gap={'$2'} alignItems="center">
                  <Image
                    source={
                      item?.receiver_id?.avatar
                        ? {uri: item?.receiver_id?.avatar}
                        : IMAGES.USER
                    }
                    alt="img"
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    rounded={'$full'}
                  />
                  <Text fontFamily="Montserrat-SemiBold" fontSize={15}>
                    {item?.receiver_id?.nick_name}
                  </Text>
                </HStack>
                {/* button */}
                <HStack justifyContent="space-around" px={'$2'} mt={'$4'}>
                  <Button borderRadius={5} py={'$1'} btnWidth={'50%'}>
                    {data?.data?.data?.connection?.is_accepted ? (
                      <Pressable>
                        <Text
                          color="$white"
                          fontFamily="Montserrat-Medium"
                          fontSize={13}>
                          Accepted
                        </Text>
                      </Pressable>
                    ) : (
                      <Text
                        color="$white"
                        fontFamily="Montserrat-Medium"
                        fontSize={13}>
                        Pending
                      </Text>
                    )}
                  </Button>

                  <Button
                    borderRadius={5}
                    py={'$1'}
                    onPress={() =>
                      navigate('UserProfile', {user_id: item?.receiver_id?._id})
                    }
                    btnWidth={'50%'}>
                    <Text
                      color="$white"
                      fontFamily="Montserrat-Medium"
                      fontSize={13}>
                      Profile
                    </Text>
                  </Button>
                </HStack>
              </VStack>
              <Divider mt={'$4'} />
            </Box>
          )}
          ListEmptyComponent={
            <Empty
              title="No Request Found"
              subtitle=""
              animation={ANIMATIONS.NOT_FOUND}
              noLoop
            />
          }
        />
      </Box>
    </PrivateContainer>
  );
};

export default SentConnections;
