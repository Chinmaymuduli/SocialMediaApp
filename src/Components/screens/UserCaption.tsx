import React from 'react';
import {Box, Divider, FlatList, Pressable, Text} from '@gluestack-ui/themed';

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
    <Box mt={'$3'}>
      {CAPTION_DATA.map((item: any) => (
        <Box key={item?.id}>
          <Pressable px={'$3'} py={'$2'}>
            <Text fontFamily="Montserrat-Medium" fontSize={13}>
              {item?.caption}
            </Text>
          </Pressable>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default UserCaption;
