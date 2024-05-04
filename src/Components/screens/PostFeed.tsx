import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {IMAGES} from '~/Assets';
import {
  Box,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import AppIcon from '../core/AppIcon';
import {SearchIcon} from '@gluestack-ui/themed';
import {useSwrApi} from '~/Hooks';

const PostFeed = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {data, isValidating} = useSwrApi(
    `posts/read-all?per_page=100&page_no=0&require_all=true`,
  );
  const postInfo = [
    {
      postTitle: 'mr shermon',
      postPersonImage: IMAGES.USER,
      postImage: IMAGES.POST1,
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'chillhouse',
      postPersonImage: IMAGES.USER,
      postImage: IMAGES.POST2,
      likes: 345,
      isLiked: false,
    },
    {
      postTitle: 'Tom',
      postPersonImage: IMAGES.USER,
      postImage: IMAGES.POST3,
      likes: 734,
      isLiked: false,
    },
    {
      postTitle: 'The_Groot',
      postPersonImage: IMAGES.USER,
      postImage: IMAGES.POST4,
      likes: 875,
      isLiked: false,
    },
  ];

  const hashtag = [
    {
      id: '1',
      tag: 'Singer',
    },
    {
      id: '2',
      tag: 'Dancer',
    },
  ];

  return (
    <View>
      <Box px={'$3'} mb={'$3'} mt={'$6'}>
        <Input borderRadius={'$lg'}>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField type="text" placeholder="Search for results" />
        </Input>
      </Box>
      {data?.data?.data?.map((item: any, index: any) => (
        <View
          key={index}
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
                  {item?.user_id?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                  }}>
                  {`${item?.user_id?.gender}, ${'13'}`}
                </Text>
              </View>
            </View>
            <Pressable onPress={() => navigate('UserProfile')}>
              <Feather name="more-vertical" style={{fontSize: 20}} />
            </Pressable>
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
            <TouchableOpacity
            // onPress={() => setLike(!like)}
            >
              <AntDesign
                // name={like ? 'heart' : 'hearto'}
                name={'heart'}
                style={{
                  paddingRight: 10,
                  fontSize: 20,
                  color: 'black',
                  // color: like ? 'red' : 'black',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionic
                name="chatbubble-outline"
                style={{fontSize: 20, paddingRight: 10}}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="navigation" style={{fontSize: 20}} />
            </TouchableOpacity>
          </HStack>

          <View style={{paddingHorizontal: 15}}>
            {/* <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 13}}>
              Liked by {like ? 'you and' : ''}{' '}
              {like ? data.likes + 1 : data.likes} others
            </Text> */}
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
                    <Text>#{tag}</Text>
                  </Box>
                ))}
              </HStack>
            )}
            <Text style={{opacity: 0.4, paddingVertical: 2}}>
              View all comments
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={IMAGES.USER}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    backgroundColor: 'orange',
                    marginRight: 10,
                  }}
                />
                <TextInput
                  placeholder="Add a comment "
                  style={{opacity: 0.5}}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo
                  name="emoji-happy"
                  style={{fontSize: 15, color: 'lightgreen', marginRight: 10}}
                />
                <Entypo
                  name="emoji-neutral"
                  style={{fontSize: 15, color: 'pink', marginRight: 10}}
                />
                <Entypo name="emoji-sad" style={{fontSize: 15, color: 'red'}} />
              </View>
            </View>
          </View>
        </View>
      ))}
      {/* {data?.data?.data?.map((data: any, index: any) => {
        const [like, setLike] = useState(false);
        return (
          <View
            key={index}
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
                  source={data.postPersonImage}
                  style={{width: 40, height: 40, borderRadius: 100}}
                />
                <View style={{paddingLeft: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                    }}>
                    {data?.user_id?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Montserrat-Medium',
                      color: 'black',
                    }}>
                    {'Male, 25'}
                  </Text>
                </View>
              </View>
              <Pressable onPress={() => navigate('UserProfile')}>
                <Feather name="more-vertical" style={{fontSize: 20}} />
              </Pressable>
            </View>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={data.postImage}
                style={{width: '100%', height: 400}}
              />
            </View>

            <HStack
              style={{
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 12,
              }}
              gap={'$2'}>
              <TouchableOpacity onPress={() => setLike(!like)}>
                <AntDesign
                  name={like ? 'heart' : 'hearto'}
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: like ? 'red' : 'black',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionic
                  name="chatbubble-outline"
                  style={{fontSize: 20, paddingRight: 10}}
                  color={'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="navigation" style={{fontSize: 20}} />
              </TouchableOpacity>
            </HStack>

            <View style={{paddingHorizontal: 15}}>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 13}}>
                Liked by {like ? 'you and' : ''}{' '}
                {like ? data.likes + 1 : data.likes} others
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingVertical: 2,
                  fontFamily: 'Montserrat-Medium',
                }}>
                If enjoy the video ! Please like and Subscribe :)
              </Text>
              <HStack>
                {hashtag?.map(item => (
                  <Box key={item?.id}>
                    <Text>#{item?.tag}</Text>
                  </Box>
                ))}
              </HStack>
              <Text style={{opacity: 0.4, paddingVertical: 2}}>
                View all comments
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={data.postPersonImage}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      backgroundColor: 'orange',
                      marginRight: 10,
                    }}
                  />
                  <TextInput
                    placeholder="Add a comment "
                    style={{opacity: 0.5}}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Entypo
                    name="emoji-happy"
                    style={{fontSize: 15, color: 'lightgreen', marginRight: 10}}
                  />
                  <Entypo
                    name="emoji-neutral"
                    style={{fontSize: 15, color: 'pink', marginRight: 10}}
                  />
                  <Entypo
                    name="emoji-sad"
                    style={{fontSize: 15, color: 'red'}}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      })} */}
    </View>
  );
};

export default PostFeed;
