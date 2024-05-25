import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {IMAGES} from '~/Assets';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenProps} from '~/Routes/Private/types';
import {PrivateContainer} from '~/Components/container';
import {PostFeed} from '~/Components/screens';
import {ScrollView} from '@gluestack-ui/themed';
import {useFCMToken, useSwrApi} from '~/Hooks';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Feeds = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  useFCMToken();
  const handleDynamicLink = (link: any) => {
    if (!!link?.url) {
      let getId = link.url?.split('=').pop();
      console.log('post id', getId);
      setTimeout(() => {
        navigate('ShareScreenDetails');
      }, 1000);
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link: any) => {
        handleDynamicLink(link);
      });
  }, []);

  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => navigate('Notifications'),
          side: 'RIGHT',
        },
        {
          icon: {AntDesignName: 'search1'},
          onPress: () => navigate('SearchScreen'),
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
