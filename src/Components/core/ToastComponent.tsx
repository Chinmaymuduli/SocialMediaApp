import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  useToast,
  Toast,
  VStack,
  ToastDescription,
  ToastTitle,
  Box,
} from '@gluestack-ui/themed';

const ToastComponent = () => {
  const toast = useToast();
  return (
    <Box>
      {toast.show({
        placement: 'top',
        render: ({id}) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} action="attention" variant="solid">
              <VStack space="xs">
                <ToastTitle>New Message</ToastTitle>
                <ToastDescription>
                  Hey, just wanted to touch base and see how you're doing. Let's
                  catch up soon!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      })}
    </Box>
  );
};

export default ToastComponent;

const styles = StyleSheet.create({});
