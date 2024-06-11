import {
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {IMAGES} from '~/Assets';
import {PrivateContainer} from '~/Components/container';
import {useSwrApi} from '~/Hooks';
import {PrivateRoutesTypes} from '~/Routes/Private/types';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'Reviews'>;
const Reviews = ({route: {params}, navigation}: Props) => {
  const {data, isValidating} = useSwrApi(
    `meetings/reviews?user_id=${params?.user_id}`,
  );
  if (isValidating)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size={'large'} />
      </Box>
    );
  return (
    <PrivateContainer title={'All Reviews'} hasBackIcon={true}>
      <Box mt={'$4'}>
        <FlatList
          data={data?.data?.data}
          renderItem={({item}: any) => (
            <Box mb={'$3'} px={'$3'}>
              <HStack gap={'$3'} mb={'$3'}>
                <Image
                  source={IMAGES.USER}
                  alt="image"
                  style={{height: 40, width: 40}}
                  borderRadius={40}
                />
                <VStack gap={'$1'}>
                  <HStack alignItems="center">
                    <Text fontFamily="Montserrat-Medium" fontSize={13}>
                      Rating :{' '}
                    </Text>
                    <Text fontFamily="Montserrat-Bold" fontSize={14}>
                      {item?.rating}
                    </Text>
                  </HStack>
                  <Text fontFamily="Montserrat-Medium" fontSize={13}>
                    {item?.comment}
                  </Text>
                </VStack>
              </HStack>
              <Divider />
            </Box>
          )}
          ListEmptyComponent={
            <Box alignItems="center" mt={'$10'}>
              <VStack alignItems="center" gap={10}>
                <Image
                  source={IMAGES.CONNECT_BG_REMOVE}
                  alt="img"
                  style={{width: 200, height: 200}}
                />
                <Text fontFamily="Montserrat-SemiBold">No Reviews found</Text>
              </VStack>
            </Box>
          }
        />
      </Box>
    </PrivateContainer>
  );
};

export default Reviews;
