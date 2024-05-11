import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearComponent = ({children}: any) => {
  return (
    <LinearGradient
      colors={['#F6F6F6', '#F5E3E6']}
      // start={{x: 0, y: 0}}
      // end={{x: 0, y: 10}}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

export default LinearComponent;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
