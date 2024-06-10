import React from 'react';
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  VStack,
} from '@gluestack-ui/themed';
import { PrivateScreenProps } from '~/Routes/Private/types';
import { PrivateContainer } from '~/Components/container';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@gluestack-ui/themed';
import { useAppContext } from '~/Contexts';
import { useSwrApi } from '~/Hooks';
import { IMAGES } from '~/Assets';

const AllUsers = () => {
  const { navigate } = useNavigation<PrivateScreenProps>();
  const { data, isValidating } = useSwrApi(`users/read-all`);
  // console.log(data?.data?.data[0]);
  // if (isValidating) <FetchLoader />;
  const { userData } = useAppContext();
  return (
    <PrivateContainer
      icons={[
        {
          icon: { IoniconsName: 'notifications' },
          onPress: () => navigate('Notifications'),
          side: 'RIGHT',
        },
        {
          icon: { EntypoName: 'dots-three-vertical' },
          onPress: userData?.role === 'admin' ? () => navigate('MoreOptions') : () => navigate('Settings'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <Box mt={'$4'} flex={1}>
        <FlatList
          data={data?.data?.data}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }: any) => (
            <Box py={'$1'}>
              <VStack px={'$4'}>
                <HStack gap={'$2'} alignItems="center">
                  <Image
                    source={
                      item?.sender_id?.image
                        ? { uri: item?.sender_id?.image }
                        : IMAGES.USER
                    }
                    alt="img"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    borderRadius={20}
                  />
                  <VStack gap={'$1'}>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                      {item?.email}
                    </Text>
                    <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                      {item?.role}
                    </Text>
                  </VStack>
                </HStack>

                {/* <HStack gap={'$10'} mt={'$1'} px={'$10'} alignItems="center">
                  <Button
                    onPress={() => navigate('UserProfile')}
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
                    onPress={() => navigate('ChatDetails')}
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
                </HStack> */}
              </VStack>
              <Divider mt={'$4'} />
            </Box>
          )}
        />
      </Box>
    </PrivateContainer>
  );
};

export default AllUsers;
