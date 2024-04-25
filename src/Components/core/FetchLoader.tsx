import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Image} from '@gluestack-ui/themed';

import LottieView from 'lottie-react-native';
import {ANIMATIONS} from '~/Assets';
const FetchLoader = () => {
  return (
    <>
      <Box
        bg={'$white'}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}>
        <LottieView source={ANIMATIONS.FETCH_LOADER} loop={true} autoPlay />
      </Box>
    </>
  );
};

export default FetchLoader;

const styles = StyleSheet.create({});
