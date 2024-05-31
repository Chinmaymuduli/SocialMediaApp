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
import {PrivateRoutesTypes, PrivateScreenProps} from '~/Routes/Private/types';

import {useMutation, useSwrApi} from '~/Hooks';
import {useAppContext} from '~/Contexts';
import {Modal} from '@gluestack-ui/themed';
import {ModalBody} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {Divider} from '@gluestack-ui/themed';
import VideoCompo from '~/Components/screens/VideoCompo';
import {PrivateContainer} from '~/Components/container';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'ShareScreenDetails'>;
const ShareScreenDetails = ({route: {params}}: Props) => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const {userData} = useAppContext();

  const {data} = useSwrApi(`posts/read/${params?.postId}`);

  const {mutation, isLoading} = useMutation();
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
              setLoading(false);
              navigate('Feeds');
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data?.data?.data);

  return (
    <PrivateContainer image={IMAGES.LOGO} hasBackIcon={true}>
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
              source={IMAGES.USER}
              style={{width: 40, height: 40, borderRadius: 100}}
            />
            <View style={{paddingLeft: 5}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Bold',
                  color: 'black',
                }}>
                {data?.data?.data?.user_id?.nick_name}
              </Text>
              {data?.data?.data?.user_id?.gender && (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                  }}>
                  {data?.data?.data?.user_id?.gender}
                </Text>
              )}
            </View>
          </View>
          {data?.data?.data?.user_id?._id === userData?._id ? (
            <Pressable
              onPress={
                loading ? () => {} : () => DeletePost(data?.data?.data?._id)
              }>
              <MaterialCommunityIcons
                name="delete-empty"
                style={{fontSize: 20}}
                color={loading ? 'gray' : 'red'}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                navigate('UserProfile', {
                  user_id: data?.data?.data?.user_id?._id,
                })
              }>
              <Feather name="more-vertical" style={{fontSize: 20}} />
            </Pressable>
          )}
        </View>
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: data?.data?.data?.media[1]}}
            style={{width: '100%', height: 400}}
          />
        </View>
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
                style={{width: '100%', height: 400}}
              />
            </View>
          ) : (
            <VideoCompo
              url={
                'https://d1kn7fxh6uqnk4.cloudfront.net/Posts/1716228287513.mp4'
              }
            />
          ))}

        <HStack
          style={{
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 12,
          }}
          gap={'$2'}>
          <TouchableOpacity onPress={() => giveLikeDislike(item?._id)}>
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
          <TouchableOpacity onPress={() => onShare()}>
            <Feather name="repeat" style={{fontSize: 20}} />
          </TouchableOpacity>
        </HStack> */}

        {/* <View style={{paddingHorizontal: 15}}>
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
         
          </View>
        </View> */}
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
          {/* <ModalBody>
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
          </ModalBody> */}
        </ModalContent>
      </Modal>
    </PrivateContainer>
  );
};

export default ShareScreenDetails;