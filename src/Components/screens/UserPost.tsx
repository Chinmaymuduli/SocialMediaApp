import React, {useCallback, useRef, useState} from 'react';
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
import {useMutation} from '~/Hooks';
import {Alert} from 'react-native';
import {WIDTH} from '~/Utils';
import VideoCompo from './VideoCompo';
import {StyleSheet} from 'react-native';

type Props = {
  postData: any;
  isFormUser?: boolean;
  mutate?: any;
};

const UserPost = ({postData, isFormUser, mutate}: Props) => {
  const {mutation, isLoading} = useMutation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const DeletePost = async (id: string) => {
    try {
      const response = await mutation(`posts/remove/${id}`, {
        method: 'DELETE',
      });

      if (response?.status === 202) {
        Alert.alert('Success', 'Post Successfully Deleted', [
          {
            text: 'OK',
            onPress: () => {
              mutate();
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Image source={{uri: item?.url}} style={styles.media} alt="img" />
        </Box>
      );
    } else if (item?.fileType === 'video') {
      return <VideoCompo url={item?.url} />;
    }
    return null;
  }, []);
  const keyExtractor = useCallback(
    (item: any, index: any) => item._id || index.toString(),
    [],
  );

  return (
    <Box style={{marginTop: 10}}>
      {postData?.map((item: any, index: any) => (
        <Pressable
          key={index}
          style={{margin: 5}}
          onPress={() => {}}
          overflow="hidden">
          <Box>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={item?.media}
              renderItem={renderItem}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              snapToInterval={WIDTH}
              decelerationRate="fast"
              pagingEnabled
              keyExtractor={keyExtractor}
            />
          </Box>
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
          <Divider my={'$2'} py={'$1'} />

          {isFormUser && (
            <Box position="absolute" top={0} right={0}>
              <Pressable
                onPress={() => DeletePost(item?._id)}
                bgColor={COLORS.secondary}
                p={'$2.5'}
                borderBottomLeftRadius={5}
                borderTopRightRadius={5}>
                <AppIcon AntDesignName="delete" size={20} color={'white'} />
              </Pressable>
            </Box>
          )}
        </Pressable>
      ))}
    </Box>
  );
};

export default UserPost;
const styles = StyleSheet.create({
  media: {
    width: WIDTH,
    height: 200, // Adjust the height as needed
  },
});
