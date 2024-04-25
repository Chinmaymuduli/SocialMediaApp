import {StyleSheet} from 'react-native';
import React from 'react';
import {IMAGES} from '~/Assets';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {PrivateContainer} from '~/Components/container';
import {PostFeed} from '~/Components/screens';
import {ScrollView} from '@gluestack-ui/themed';
import {useSwrApi} from '~/Hooks';

const Feeds = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {data, isValidating} = useSwrApi(
    `posts/read-all?per_page=20&page_no=0&require_all=true`,
  );
  // console.log(data);
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Notifications'),
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => navigate('Settings'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <PostFeed />
      </ScrollView>
    </PrivateContainer>
  );
};

export default Feeds;

const styles = StyleSheet.create({});
