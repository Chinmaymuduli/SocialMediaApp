import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomToast = ({title, message, onClose}: any) => {
  return (
    <TouchableOpacity onPress={onClose} style={styles.toast}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'blue', // Adjust as per your design
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    fontSize: 16,
    color: 'white',
  },
});

export default CustomToast;
