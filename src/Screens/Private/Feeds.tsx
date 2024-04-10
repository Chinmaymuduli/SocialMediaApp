import {StyleSheet} from 'react-native';
import React from 'react';
import {IMAGES} from '~/Assets';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {PrivateContainer} from '~/Components/container';
import {PostFeed} from '~/Components/screens';
import {ScrollView} from '@gluestack-ui/themed';

const Feeds = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
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
          onPress: () => navigate('Profile'),
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <PostFeed />
      </ScrollView>
    </PrivateContainer>
  );
};

export default Feeds;

const styles = StyleSheet.create({});
