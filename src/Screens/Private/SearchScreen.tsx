import {
  Button,
  ButtonText,
  Divider,
  FlatList,
  Pressable,
  SearchIcon,
  Text,
} from '@gluestack-ui/themed';
import {InputField} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {Box, Input, InputIcon, InputSlot} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {IMAGES} from '~/Assets';
import {useSwrApi} from '~/Hooks';
import {COLORS} from '~/Styles';
import MyConnectionCompo from './Settings/MyConnectionCompo';
import {VStack} from '@gluestack-ui/themed';
import {HStack} from '@gluestack-ui/themed';
import FetchLoader from '~/Components/core/FetchLoader';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';

const SearchScreen = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const inputRef = useRef<any>(null);
  const [search, setSearch] = useState('');

  const {data, isValidating} = useSwrApi(`users/search?search=${search}`);
  // console.log(data?.data?.data);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <Box flex={1} bg={'$white'}>
      <Box px={'$4'} py={'$3'}>
        <Input borderRadius={'$lg'} borderBlockColor="$coolGray300">
          <InputSlot ml={'$2'}>
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            type="text"
            placeholder="Search by interest or name"
            ref={inputRef}
            onChangeText={(txt: any) => setSearch(txt)}
            value={search}
          />
        </Input>
      </Box>
      {!search ? (
        <Box h={'$full'} mt={150} bg={COLORS.textWhite} alignItems="center">
          <Image
            source={IMAGES.SEARCH}
            style={{
              height: 200,
              width: 200,
            }}
            alt={'search_img'}
          />
          <Text fontFamily="Montserrat-SemiBold" mt={'$5'}>
            Please search for results
          </Text>
        </Box>
      ) : (
        <FlatList
          data={data?.data?.data}
          renderItem={({item}: any) => (
            <Pressable
              onPress={() => navigate('UserProfile', {user_id: item?._id})}
              py={'$1'}>
              <VStack px={'$4'}>
                <HStack gap={'$2'} alignItems="center">
                  <Image
                    source={item?.avatar ? {uri: item?.avatar} : IMAGES.USER}
                    alt="img"
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    borderRadius={20}
                  />
                  <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                    {item?.nick_name}
                  </Text>
                </HStack>
              </VStack>
              <Divider mt={'$4'} />
            </Pressable>
          )}
          ListEmptyComponent={
            <Box alignItems="center" mt={'$20'}>
              <VStack alignItems="center" gap={10}>
                <Image
                  source={IMAGES.CONNECT_BG_REMOVE}
                  alt="img"
                  style={{width: 200, height: 200}}
                />
                <Text fontFamily="Montserrat-SemiBold">No User found</Text>
              </VStack>
            </Box>
          }
        />
      )}
    </Box>
  );
};

export default SearchScreen;
