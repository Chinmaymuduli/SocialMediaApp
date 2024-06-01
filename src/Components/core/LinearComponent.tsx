import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '~/Styles';

const LinearComponent = ({children}: any) => {
  return (
    <LinearGradient
      colors={[COLORS.gradientLow, COLORS.gradientLow]}
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
