import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Image, TouchableOpacity, Alert, Share} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMAGES} from '~/Assets';
import {
  Box,
  HStack,
  Heading,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Pressable,
  ModalCloseButton,
  Icon,
  CloseIcon,
  Text,
  FlatList,
  ScrollView,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {useMutation, useSwrApi} from '~/Hooks';
import {useAppContext} from '~/Contexts';
import {Modal} from '@gluestack-ui/themed';
import {ModalBody} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {Divider} from '@gluestack-ui/themed';
import VideoCompo from './VideoCompo';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {COLORS} from '~/Styles';
import moment from 'moment';
import {StyleSheet} from 'react-native';
import {WIDTH} from '~/Utils';

const PostCompo = ({item, mutate}: any) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      console.log(response?.results?.error);
      if (response?.status === 202) {
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

  const buildLink = async (id: any) => {
    const link = await dynamicLinks().buildLink({
      link: `https://invertase.io?id=${id}`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://fevealapp.page.link',
    });

    return link;
  };

  const onShare = async (id: any) => {
    try {
      const getLink = await buildLink(id);
      console.log({getLink});
      const result = await Share.share({
        message: getLink,
        url: getLink,
        // title: 'React Native',
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

  const EMOJI_ARRAY = [
    {
      id: '1',
      img: IMAGES.HEART_EMOJI,
      value: 52,
    },
    {
      id: '2',
      img: IMAGES.MONEY_EMOJI,
      value: 12,
    },
    {
      id: '3',
      img: IMAGES.SAD_EMOJI,
      value: 32,
    },
    {
      id: '4',
      img: IMAGES.YELLOW_EMOJI,
      value: 42,
    },
    {
      id: '5',
      img: IMAGES.THUMB_EMOJI,
      value: 88,
    },
  ];

  const onViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems?.length > 0) {
      setCurrentIndex(viewableItems[0]?.index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = useCallback(({item}: any) => {
    if (item?.fileType === 'image') {
      return (
        <Box alignItems="center" justifyContent="center" position="relative">
          <Image source={{uri: item?.url}} style={styles.media} />
        </Box>
      );
    }
    // else if (item?.fileType === 'video') {
    //   return <VideoCompo url={item?.url} />;
    // }
    return null;
  }, []);
  const keyExtractor = useCallback(
    (item: any, index: any) => item._id || index.toString(),
    [],
  );

  return (
    <Box softShadow="1" bg={'$white'} mb={'$4'} borderRadius={6} flex={1}>
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
        <Box>
          {/* {item?.media?.length > 0 &&
            (item?.media_type === 'image' ? (
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item?.media[0]}}
                  style={{width: '100%', height: 200}}
                  // resizeMode="contain"
                />
              </View>
            ) : (
              <VideoCompo url={item?.media?.[0]} />
            ))} */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item?.media}
            renderItem={renderItem}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={keyExtractor}
          />

          {item?.media?.length > 1 && (
            <Box position="absolute" right={9} top={'3%'}>
              <Box bg={COLORS.gradientLow} softShadow="1" borderRadius={8}>
                <Text fontFamily="Montserrat-SemiBold" fontSize={13} px={'$1'}>
                  {`${currentIndex + 1} / ${item?.media?.length}`}
                </Text>
              </Box>
            </Box>
          )}
        </Box>

        <HStack
          style={{
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 12,
          }}
          // gap={'$2'}
          justifyContent="space-between">
          {/* <TouchableOpacity onPress={() => giveLikeDislike(item?._id)}>
            <AntDesign
              name={item?.is_liked ? 'like1' : 'like2'}
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
          <TouchableOpacity onPress={() => onShare(item?._id)}>
            <Feather name="repeat" style={{fontSize: 20}} />
          </TouchableOpacity> */}
          {EMOJI_ARRAY?.map(emoji => (
            <HStack alignItems="center" gap={'$1'} key={emoji?.id}>
              <TouchableOpacity>
                <Image
                  source={emoji.img}
                  alt="img"
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
              <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                {emoji.value}
              </Text>
            </HStack>
          ))}
        </HStack>

        <View style={{paddingHorizontal: 15}}>
          {/* <Pressable
            onPress={() => {
              setPostId(item?._id), setShowModal(true);
            }}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 13}}>
              Liked by {item?.total_likes} others
            </Text>
          </Pressable> */}
          <Text
            style={{
              fontSize: 13,
              paddingVertical: 2,
              fontFamily: 'Montserrat-Medium',
            }}>
            {item?.caption}
          </Text>
          {item?.tags?.length > 0 && (
            <HStack flexWrap="wrap" gap={'$1'}>
              {item?.tags?.map((tag: any, index: any) => (
                <Box key={index}>
                  <Text fontSize={13} fontFamily="Montserrat-SemiBold">
                    #{tag?.title}
                  </Text>
                </Box>
              ))}
            </HStack>
          )}
          {/* <Pressable
            onPress={() => navigate('AllComments', {post_id: item?._id})}>
            <Text
              style={{opacity: 0.4, paddingVertical: 2}}
              fontFamily="Montserrat-Medium"
              fontSize={13}>
              View all Query
            </Text>
          </Pressable> */}
          <Box mt={'$2'}>
            <Text
              fontFamily="Montserrat-SemiBold"
              fontSize={12}
              color="$coolGray400">
              {moment(item?.created_at).fromNow()}
            </Text>
          </Box>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginHorizontal: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image
              source={userData?.avatar ? {uri: userData?.avatar} : IMAGES.USER}
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
              borderWidth={1}>
              <Text
                px={'$16'}
                fontSize={13}
                py={'$0.5'}
                fontFamily="Montserrat-Medium">
                Query / Comments
              </Text>
            </Pressable>

            <Pressable onPress={() => onShare(item?._id)} px={'$2'}>
              <FontAwesome name="share" size={20} />
            </Pressable>
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
    </Box>
  );
};

export default PostCompo;
const styles = StyleSheet.create({
  media: {
    width: WIDTH,
    height: 200, // Adjust the height as needed
  },
});
