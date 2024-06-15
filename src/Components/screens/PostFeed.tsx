import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {IMAGES} from '~/Assets';
import {
  Box,
  HStack,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Pressable,
  ModalCloseButton,
  Icon,
  CloseIcon,
  Text,
} from '@gluestack-ui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import AppIcon from '../core/AppIcon';
import {SearchIcon} from '@gluestack-ui/themed';
import {useMutation, useSwrApi} from '~/Hooks';
import {useAppContext} from '~/Contexts';
import {Modal} from '@gluestack-ui/themed';
import {ModalBody} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {Divider} from '@gluestack-ui/themed';
import PostCompo from './PostCompo';
import {FlatList} from '@gluestack-ui/themed';

const PostFeed = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState<string>('');
  const {userData} = useAppContext();
  const {data, isValidating, mutate} = useSwrApi(
    `posts/read-all?per_page=100&page_no=0&require_all=true&user_id=${userData?._id}`,
  );
  const {data: allLikeData} = useSwrApi(
    `posts/read-all-likes?per_page=100&page_no=0&require_all=true&post_id=${postId}`,
  );

  useFocusEffect(
    React.useCallback(() => {
      mutate();
    }, []),
  );
  // console.log(data?.data?.data?.[0]);
  return (
    <>
      <Box mt={'$3'} mx={'$2'}>
        {/* {data?.data?.data?.map((item: any, index: any) => (
          <PostCompo item={item} mutate={mutate} key={index} />
        ))} */}
        <FlatList
          data={data?.data?.data}
          renderItem={({item, index}) => (
            <PostCompo item={item} mutate={mutate} key={index} />
          )}
          ListEmptyComponent={
            <Box alignItems="center" mt={'$20'}>
              <VStack alignItems="center" gap={10}>
                <Image
                  source={IMAGES.CONNECT_BG_REMOVE}
                  alt="img"
                  style={{width: 200, height: 200}}
                />
                <Text fontFamily="Montserrat-SemiBold">No Posts found</Text>
              </VStack>
            </Box>
          }
        />
      </Box>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">All Likes</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {allLikeData?.data?.data?.map((likeData: any) => (
              <Box py={'$1'} key={likeData?._id}>
                <VStack px={'$4'}>
                  <HStack gap={'$2'} alignItems="center">
                    <Image
                      source={
                        likeData?.user_id?.avatar
                          ? {uri: likeData?.user_id?.avatar}
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
                        {likeData?.user_id?.nick_name}
                      </Text>
                      <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                        {likeData?.user_id?.email}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
                <Divider mt={'$4'} />
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostFeed;
