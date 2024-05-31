import React, {useState} from 'react';
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

  return (
    <Box softShadow="1" bg={'$white'} mb={'$4'} borderRadius={6}>
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
        {item?.media?.length > 0 &&
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
          ))}

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
          <HStack alignItems="center" gap={'$1'}>
            <TouchableOpacity>
              <FontAwesome6
                name="face-grin-hearts"
                size={25}
                color={COLORS.NewSecondary}
              />
            </TouchableOpacity>
            <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
              52
            </Text>
          </HStack>
          <HStack alignItems="center" gap={'$1'}>
            <TouchableOpacity>
              <FontAwesome6
                name="face-grin-tongue"
                size={25}
                color={COLORS.NewSecondary}
              />
            </TouchableOpacity>
            <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
              48
            </Text>
          </HStack>
          <HStack alignItems="center" gap={'$1'}>
            <TouchableOpacity>
              <FontAwesome6
                name="face-frown-open"
                size={25}
                color={COLORS.NewSecondary}
              />
            </TouchableOpacity>
            <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
              20
            </Text>
          </HStack>
          <HStack alignItems="center" gap={'$1'}>
            <TouchableOpacity>
              <FontAwesome6
                name="heart"
                size={25}
                color={COLORS.NewSecondary}
              />
            </TouchableOpacity>
            <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
              36
            </Text>
          </HStack>
          <HStack alignItems="center" gap={'$1'}>
            <TouchableOpacity>
              <FontAwesome6
                name="thumbs-down"
                size={25}
                color={COLORS.NewSecondary}
              />
            </TouchableOpacity>
            <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
              75
            </Text>
          </HStack>
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
          <Pressable
            onPress={() => navigate('AllComments', {post_id: item?._id})}>
            <Text style={{opacity: 0.4, paddingVertical: 2}}>
              View all Query
            </Text>
          </Pressable>
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
                px={'$20'}
                fontSize={13}
                py={'$0.5'}
                fontFamily="Montserrat-Medium">
                Ask a Query
              </Text>
            </Pressable>

            <Pressable onPress={() => onShare(item?._id)} px={'$4'}>
              <FontAwesome name="share" size={20} />
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

        <Box position="absolute" right={9} top={'20%'}>
          <Box bg={COLORS.gradientLow} softShadow="1" borderRadius={8}>
            <Text fontFamily="Montserrat-SemiBold" fontSize={13} px={'$1'}>
              1 / 2
            </Text>
          </Box>
        </Box>
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
