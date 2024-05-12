import React from 'react';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  HStack,
  VStack,
} from '@gluestack-ui/themed';
import {FlatList} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {ButtonText} from '@gluestack-ui/themed';
import {Divider} from '@gluestack-ui/themed';
import {ANIMATIONS, IMAGES} from '~/Assets';
import Empty from '~/Components/core/Empty';
import {CloseIcon} from '@gluestack-ui/themed';
import {useMutation} from '~/Hooks';

const RequestCompo = ({data, requestMutate, mutate}: any) => {
  const {mutation, isLoading} = useMutation();
  const handelConfirmReject = async (id: any, isAccepted: boolean) => {
    try {
      const res = await mutation(`connections/accept-or-reject/${id}`, {
        method: 'PUT',
        body: {
          is_accepted: isAccepted,
        },
      });
      if (res?.results?.success === true) {
        requestMutate();
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <FlatList
        data={data}
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
          />
        }
      />
    </Box>
  );
};

export default RequestCompo;
