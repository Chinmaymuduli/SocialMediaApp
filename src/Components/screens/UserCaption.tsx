import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Divider, FlatList, Pressable} from '@gluestack-ui/themed';

const UserCaption = () => {
  const CAPTION_DATA = [
    {
      id: '1',
      caption:
        "Amidst chaos, simplicity shines. Lost in the vibrant hues of sunset, embracing the unknown. Each step, a dance with destiny. Dreams beckon, whispering of adventures yet to unfold. In the quiet, finding solace. Life's tapestry woven with tiny moments of magic. Sun-kissed souls, chasing the fleeting beauty of existence.",
    },
    {
      id: '2',
      caption:
        "Amidst chaos, simplicity shines. Lost in the vibrant hues of sunset, embracing the unknown. Each step, a dance with destiny. Dreams beckon, whispering of adventures yet to unfold. In the quiet, finding solace. Life's tapestry woven with tiny moments of magic. Sun-kissed souls, chasing the fleeting beauty of existence.",
    },
    {
      id: '3',
      caption:
        "Amidst chaos, simplicity shines. Lost in the vibrant hues of sunset, embracing the unknown. Each step, a dance with destiny. Dreams beckon, whispering of adventures yet to unfold. In the quiet, finding solace. Life's tapestry woven with tiny moments of magic. Sun-kissed souls, chasing the fleeting beauty of existence.",
    },
    {
      id: '4',
      caption:
        "Amidst chaos, simplicity shines. Lost in the vibrant hues of sunset, embracing the unknown. Each step, a dance with destiny. Dreams beckon, whispering of adventures yet to unfold. In the quiet, finding solace. Life's tapestry woven with tiny moments of magic. Sun-kissed souls, chasing the fleeting beauty of existence.",
    },
  ];
  return (
    <Box mt={'$3'} px={'$2'}>
      {CAPTION_DATA.map((item: any) => (
        <React.Fragment key={item?.id}>
          <Pressable m={'$0.5'}>
            <Text>{item?.caption}</Text>
          </Pressable>
          <Divider />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default UserCaption;

const styles = StyleSheet.create({});
