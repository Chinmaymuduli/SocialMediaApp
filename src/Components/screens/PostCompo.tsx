import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const PostCompo = ({item, mutate}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const {userData} = useAppContext();
  const {
    data: allLikeData,
    isValidating: likeValidating,
    mutate: likeMutate,
  } = useSwrApi(
    `posts/read-all-likes?per_page=100&page_no=0&require_all=true&post_id=${postId}`,
  );

  const {mutation, isLoading} = useMutation();

  const giveLikeDislike = async (id: string) => {
    try {
      const response = await mutation(`posts/like-or-dislike/${id}`, {
        method: 'POST',
      });
      console.log(response?.status);
      if (response?.status === 200) {
        likeMutate();
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeletePost = async (id: string) => {
    try {
      setLoading(true);
      const response = await mutation(`posts/remove/${id}`, {
        method: 'DELETE',
      });

      if (response?.status === 200) {
        Alert.alert('Success', 'Post Successfully Deleted', [
          {
            text: 'OK',
            onPress: () => {
              setLoading(false), mutate();
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share the post',
        url: 'https://reactnative.dev/',
        title: 'React Native',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                item?.user_id?.avatar
                  ? {uri: item?.user_id?.avatar}
                  : IMAGES.USER
              }
              style={{width: 40, height: 40, borderRadius: 100}}
            />
            <View style={{paddingLeft: 5}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Bold',
                  color: 'black',
                }}>
                {item?.user_id?.nick_name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  color: 'black',
                }}>
                {`${item?.user_id?.gender}`}
              </Text>
            </View>
          </View>
          {item?.user_id?._id === userData?._id ? (
            <Pressable
              onPress={loading ? () => {} : () => DeletePost(item?._id)}>
              <MaterialCommunityIcons
                name="delete-empty"
                style={{fontSize: 20}}
                color={loading ? 'gray' : 'red'}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                navigate('UserProfile', {user_id: item?.user_id?._id})
              }>
              <Feather name="more-vertical" style={{fontSize: 20}} />
            </Pressable>
          )}
        </View>
        {item?.media?.length > 0 && (
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.media[0]}}
              style={{width: '100%', height: 400}}
            />
          </View>
        )}

        <HStack
          style={{
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 12,
          }}
          gap={'$2'}>
          <TouchableOpacity onPress={() => giveLikeDislike(item?._id)}>
            <AntDesign
              name={item?.is_liked ? 'heart' : 'hearto'}
              style={{
                paddingRight: 10,
                fontSize: 20,
                color: item?.is_liked ? 'red' : 'black',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('AllComments', {post_id: item?._id})}>
            <MaterialCommunityIcons
              name="comment-outline"
              style={{fontSize: 20, paddingRight: 10}}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onShare()}>
            <Feather name="repeat" style={{fontSize: 20}} />
          </TouchableOpacity>
        </HStack>

        <View style={{paddingHorizontal: 15}}>
          <Pressable
            onPress={() => {
              setPostId(item?._id), setShowModal(true);
            }}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 13}}>
              Liked by {item?.total_likes} others
            </Text>
          </Pressable>
          <Text
            style={{
              fontSize: 13,
              paddingVertical: 2,
              fontFamily: 'Montserrat-Medium',
            }}>
            {item?.caption}
          </Text>
          {item?.tags?.length > 0 && (
            <HStack>
              {item?.tags?.map((tag: any, index: any) => (
                <Box key={index}>
                  <Text>#{tag?.title}</Text>
                </Box>
              ))}
            </HStack>
          )}
          <Pressable
            onPress={() => navigate('AllComments', {post_id: item?._id})}>
            <Text style={{opacity: 0.4, paddingVertical: 2}}>
              View all questions
            </Text>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  userData?.avatar ? {uri: userData?.avatar} : IMAGES.USER
                }
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  backgroundColor: 'orange',
                  marginRight: 10,
                }}
              />

              <Pressable
                onPress={() => navigate('AllComments', {post_id: item?._id})}
                borderRadius={'$full'}
                // w={'$80'}
                borderWidth={1}>
                <Text
                  px={'$24'}
                  fontSize={13}
                  py={'$0.5'}
                  fontFamily="Montserrat-Medium">
                  Ask a questions
                </Text>
              </Pressable>
            </View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo
                name="emoji-happy"
                style={{fontSize: 15, color: 'lightgreen', marginRight: 10}}
              />
              <Entypo
                name="emoji-neutral"
                style={{fontSize: 15, color: 'pink', marginRight: 10}}
              />
              <Entypo name="emoji-sad" style={{fontSize: 15, color: 'red'}} />
            </View> */}
          </View>
        </View>
      </View>

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
                      {likeData?.user_id?.email !== 'undefined' ? (
                        <Text fontFamily="Montserrat-SemiBold" fontSize={12}>
                          {likeData?.user_id?.email}
                        </Text>
                      ) : null}
                    </VStack>
                  </HStack>
                </VStack>
                <Divider mt={'$4'} />
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default PostCompo;
