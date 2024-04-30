import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {IMAGES} from '~/Assets';

const AllUsers = () => {
  return (
    <PrivateContainer
      icons={[
        {
          icon: {IoniconsName: 'notifications'},
          onPress: () => {},
          side: 'RIGHT',
        },
        {
          icon: {EntypoName: 'dots-three-vertical'},
          onPress: () => {},
          side: 'RIGHT',
        },
      ]}
      image={IMAGES.LOGO}>
      <Text>Hello</Text>
    </PrivateContainer>
  );
};

export default AllUsers;

const styles = StyleSheet.create({});
