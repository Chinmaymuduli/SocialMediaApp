import React, {useState} from 'react';
import {
  Box,
  ButtonText,
  Divider,
  HStack,
  Image,
  Input,
  Pressable,
  VStack,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {Button} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {useMutation, useSwrApi} from '~/Hooks';
import {InputField} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import AppIcon from '~/Components/core/AppIcon';
import {useAppContext} from '~/Contexts';
const CommonCompo = ({item, mutate}: any) => {
  const [isReplay, setIsReplay] = useState(false);
  const [replayComment, setReplayComments] = useState('');
  const {mutation, isLoading} = useMutation();
  const {userData} = useAppContext();
  const {
    data,
    isValidating,
    mutate: replayMutate,
  } = useSwrApi(`posts/read-all-replies?comment_id=${item?._id}`);

  const handelDelete = async (id: any) => {
    try {
      const res = await mutation(`posts/comments/remove/${id}`, {
        method: 'DELETE',
      });
      console.log(res);
      if (res?.status === 202) {
        mutate();
        replayMutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelReplay = async (id: string) => {
    try {
      const res = await mutation(`posts/comments/reply`, {
        method: 'POST',
        body: {
          message: replayComment,
          post_id: item?.post_id,
          comment_id: item?._id,
        },
      });
      console.log({res});
      if (res?.status === 201) {
        replayMutate();
        setIsReplay(false);
        setReplayComments('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data?.data?.data);

  return (
    <Box py={'$1'}>
      <VStack px={'$4'}>
        <HStack justifyContent="space-between">
          <HStack gap={'$2'} alignItems="center">
            <Image
              source={
                item?.user_id?.avatar
                  ? {uri: item?.user_id?.avatar}
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
              {item?.user_id?.nick_name}
            </Text>
          </HStack>
          {item?.user_id?._id === userData?._id && (
            <Pressable p={'$2'} onPress={() => handelDelete(item?._id)}>
              <AppIcon AntDesignName="delete" size={20} color={'red'} />
            </Pressable>
          )}
        </HStack>
        <Text fontFamily="Montserrat-Medium" fontSize={14} mt={'$1'}>
          {item?.message}
        </Text>
        {/* Replay Comments */}
        <Box px={'$4'} mt={'$5'}>
          {data?.data?.data?.map((item: any) => (
            <Box my={'$2'} key={item?._id}>
              <HStack justifyContent="space-between">
                <HStack gap={'$2'} alignItems="center">
                  <Image
                    source={
                      item?.user_id?.avatar
                        ? {uri: item?.user_id?.avatar}
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
                    {item?.user_id?.nick_name}
                  </Text>
                </HStack>
                {userData?._id === item?.user_id?._id && (
                  <Pressable p={'$2'} onPress={() => handelDelete(item?._id)}>
                    <AppIcon AntDesignName="delete" size={20} color={'red'} />
                  </Pressable>
                )}
              </HStack>
              <Text fontFamily="Montserrat-Medium" fontSize={14}>
                {item?.message}
              </Text>
            </Box>
          ))}
        </Box>

        <Pressable mt={'$1'} onPress={() => setIsReplay(true)}>
          <Text fontFamily="Montserrat-SemiBold" color={COLORS.secondary}>
            Replay
          </Text>
        </Pressable>
        {isReplay && (
          <HStack px={'$3'} gap={'$2'} py={'$2'}>
            <Input borderRadius={'$lg'} flex={1}>
              <InputField
                type="text"
                placeholder="Write a comment"
                value={replayComment}
                onChangeText={txt => setReplayComments(txt)}
              />
            </Input>
            <Button
              bgColor={isLoading ? '$coolGray500' : COLORS.secondary}
              borderRadius={8}
              gap={'$1'}
              isDisabled={isLoading}>
              <ButtonText
                color="$white"
                fontFamily={'Montserrat-Bold'}
                onPress={() => handelReplay(item?._id)}>
                Send
              </ButtonText>
            </Button>
          </HStack>
        )}
      </VStack>
      <Divider mt={'$4'} />
    </Box>
  );
};

export default CommonCompo;
