import React from 'react';
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Pressable,
  VStack,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {Text} from '@gluestack-ui/themed';
import AppIcon from '../core/AppIcon';
import {COLORS} from '~/Styles';

const UserPost = ({postData}: any) => {
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
    {
      postTitle: 'The_Groot',
      postPersonImage: IMAGES.USER,
      postImage: IMAGES.POST4,
      likes: 875,
      isLiked: false,
    },
    {
      postTitle: 'The_Groot',
      postPersonImage: IMAGES.USER,
      postImage: IMAGES.POST4,
      likes: 875,
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
  return (
    <Box style={{marginTop: 10}}>
      {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}> */}
      {postData?.map((item: any, index: any) => (
        <Pressable key={index} style={{margin: 5}} onPress={() => {}}>
          <Image
            source={{uri: item?.media?.[0]}}
            alt="image"
            style={{
              // height: 110,
              height: 110,
              width: '100%',
              // width: 110,
              borderRadius: 5,
            }}
          />
          <VStack px={'$2'}>
            <Box mt={'$4'}>
              <Text fontFamily="Montserrat-SemiBold" fontSize={13}>
                {item?.caption}
              </Text>
            </Box>
            <HStack gap={'$8'} mt={'$3'}>
              <HStack alignItems="center" gap={'$2'}>
                <AppIcon AntDesignName="like1" size={18} color={'#800080'} />
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={12}>{`Likes: ${item?.total_likes}`}</Text>
              </HStack>
              <HStack alignItems="center" gap={'$2'}>
                <AppIcon
                  FontistoName="comments"
                  size={18}
                  color={COLORS.secondary}
                />
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={12}>{`Comments: ${item?.total_comment}`}</Text>
              </HStack>
              <HStack alignItems="center" gap={'$2'}>
                <AppIcon
                  FontAwesome5Name="share-square"
                  size={18}
                  color={'#1e40af'}
                />
                <Text
                  fontFamily="Montserrat-SemiBold"
                  fontSize={12}>{`Share: ${item?.total_shares}`}</Text>
              </HStack>
            </HStack>
          </VStack>
          <Divider my={'$2'} />
        </Pressable>
      ))}
    </Box>
  );
};

export default UserPost;
