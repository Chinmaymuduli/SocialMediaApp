import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {
  AddIcon,
  Box,
  Button,
  ButtonText,
  Divider,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {ANIMATIONS, IMAGES} from '~/Assets';
import {ButtonIcon} from '@gluestack-ui/themed';
import {CloseIcon} from '@gluestack-ui/themed';

import {useMutation, useSwrApi} from '~/Hooks';
import FetchLoader from '~/Components/core/FetchLoader';
import Empty from '~/Components/core/Empty';

const RequestConnections = () => {
  const {mutation, isLoading} = useMutation();
  const {data, isValidating, mutate} = useSwrApi(
    `connections/read-all?type=receive&is_accepted=false&require_all=true`,
  );
  // console.log(data?.data?.data);
  const handelConfirmReject = async (id: any, isAccepted: boolean) => {
    try {
      const res = await mutation(`connections/accept-or-reject/${id}`, {
        method: 'PUT',
        body: {
          is_accepted: isAccepted,
        },
      });
      if (res?.results?.success === true) {
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isValidating) <FetchLoader />;
  return (
    <PrivateContainer title={'Request Connections'} hasBackIcon={true}>
      <Box mt={'$4'}>
        <FlatList
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
                    rounded={'$full'}
                  />
                  <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                    {item?.sender_id?.name} wants to connect with you.
                  </Text>
                </HStack>
                <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
                  <Button
                    onPress={() => handelConfirmReject(item?._id, true)}
                    size="sm"
                    h={20}
                    w={'$24'}
                    variant="outline"
                    action="primary"
                    borderColor={'$green400'}
                    isDisabled={false}
                    isFocusVisible={false}>
                    <ButtonText fontSize={12} color={'$green600'}>
                      Add{' '}
                    </ButtonText>
                    <ButtonIcon as={AddIcon} color={'$green600'} mt={'$0.5'} />
                  </Button>
                  <Button
                    onPress={() => handelConfirmReject(item?._id, false)}
                    size="md"
                    h={20}
                    w={'$24'}
                    variant="outline"
                    action="primary"
                    borderColor={'$pink400'}
                    isDisabled={false}
                    isFocusVisible={false}>
                    <ButtonText fontSize={12} color={'$pink600'}>
                      Cancel{' '}
                    </ButtonText>
                    <ButtonIcon as={CloseIcon} color={'$pink600'} />
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

export default RequestConnections;
