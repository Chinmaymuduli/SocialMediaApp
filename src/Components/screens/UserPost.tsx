import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, FlatList, Image, Pressable} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';

const UserPost = () => {
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
    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
      {postInfo.map((item, index) => (
        <Pressable key={index} style={{margin: 5}} onPress={() => {}}>
          <Image
            source={item?.postImage}
            alt="image"
            style={{
              height: 110,
              width: 110,
              borderRadius: 5,
            }}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({});
