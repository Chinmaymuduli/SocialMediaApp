import React, {useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Input,
  InputField,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateRoutesTypes, PrivateScreenProps} from '~/routes/private/types';
import AppIcon from '~/Components/core/AppIcon';
import {PrivateContainer} from '~/Components/container';
import {StyleSheet} from 'react-native';
import {useMutation, useSwrApi} from '~/Hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'ChatDetails'>;
const ChatDetails = ({route: {params}}: Props) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {data, mutate} = useSwrApi(
    `chats/read-all?connection_id=${params?.connection_id}`,
  );
  const [message, setMessage] = useState('');
  const {mutation, isLoading} = useMutation();

  const handelChat = async () => {
    try {
      const res = await mutation(`chats/send-message`, {
        method: 'POST',
        body: {
          message_type: 'text',
          connection_id: params?.connection_id,
          text: message,
        },
      });
      console.log({res});
      if (res?.status === 201) {
        mutate();
        setMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateContainer
      hasBackIcon={true}
      title={params?.name || params?.userNickName}
      icons={[
        {
          icon: {MaterialIconsName: 'add-call'},
          onPress: () => {},
          side: 'RIGHT',
        },
        {
          icon: {MaterialIconsName: 'payment'},
          onPress: () => {},
          side: 'RIGHT',
        },
      ]}>
      <Box flex={1} mt={'$3'}>
        <FlatList
          data={data?.data?.data}
          renderItem={({item}: any) => (
            <Box my={'$2'}>
              <Box alignItems="center">
                <Text fontSize={13} fontFamily="Montserrat-Medium">
                  {item?.date}
                </Text>
              </Box>
              {item?.messages?.map((msg: any, key: any) => (
                <Box key={key} my={'$1'}>
                  <Text ml={'$2'}>{msg?.text}</Text>
                  {/* <Box alignSelf="flex-end" pr={'$4'}>
                <Text>{item?.message}</Text>
              </Box> */}
                </Box>
              ))}
            </Box>
          )}
        />
        <Box mb="$3" px={'$3'}>
          <HStack gap={'$2'}>
            <Input
              flex={1}
              variant="outline"
              size="md"
              isDisabled={false}
              borderRadius={20}
              alignItems="center"
              borderColor="$coolGray300"
              isInvalid={false}
              isReadOnly={false}>
              <InputField
                placeholder="Enter Text here"
                fontSize={12}
                value={message}
                onChangeText={text => setMessage(text)}
              />
            </Input>
            <Pressable
              borderRadius={20}
              onPress={isLoading ? () => {} : () => handelChat()}
              h={'$10'}
              w={'$10'}
              bg={isLoading ? '$coolGray300' : '$blue200'}
              alignItems={'center'}
              justifyContent={'center'}>
              <AppIcon
                IoniconsName="send"
                size={22}
                color={isLoading ? 'gray' : 'blue'}
              />
            </Pressable>
          </HStack>
        </Box>
      </Box>
    </PrivateContainer>
  );
};

export default ChatDetails;
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
