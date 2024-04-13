import React, {useEffect, useRef, useState} from 'react';
import {InteractionManager} from 'react-native';
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/routes/private/types';
import AppIcon from '~/Components/core/AppIcon';
import {Button} from '~/Components/core';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';

const Post = () => {
  const {navigate, goBack} = useNavigation<PrivateScreenProps>();
  const handelPost = async () => {
    try {
      console.log('handel Post');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Profile'),
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => navigate('Settings'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <ScrollView>
        <Box mt={'$2'} mx={'$4'}>
          <Text my={'$2'} fontFamily="Montserrat-Bold" fontSize={13}>
            Description
          </Text>

          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            w="$full">
            <TextareaInput
              placeholder="Your text goes here..."
              fontSize={13}
              fontFamily="Montserrat-Medium"
            />
          </Textarea>
        </Box>
        <Box mt={'$2'} mx={'$4'}>
          <HStack alignItems={'center'}>
            <Text my={'$2'} fontFamily="Montserrat-Bold" fontSize={13}>
              Choose File
            </Text>
          </HStack>
          <Box mb={'$2'}>
            <Pressable
              bgColor={'white'}
              w={'$full'}
              alignItems={'center'}
              h={180}
              justifyContent={'center'}
              borderWidth={1}
              borderRadius={7}
              borderColor={'$coolGray300'}>
              <VStack>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/256/892/892311.png',
                  }}
                  alt="Default Image"
                  // style={{
                  //   height: 50,
                  //   width: 50,
                  // }}
                  size={'md'}
                />
              </VStack>
            </Pressable>
          </Box>
        </Box>

        <Box mt={'$7'}>
          <Button
            borderRadius={5}
            btnWidth={'full'}
            mx={'$4'}
            py={'$2'}
            onPress={() => handelPost()}>
            <Text color="$white" fontFamily="Montserrat-Bold" fontSize={13}>
              Post
            </Text>
          </Button>
        </Box>
      </ScrollView>
    </PrivateContainer>
  );
};

export default Post;
