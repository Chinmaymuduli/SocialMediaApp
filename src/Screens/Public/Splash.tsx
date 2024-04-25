import {Box, Center, Image} from '@gluestack-ui/themed';
import React from 'react';
import {IMAGES} from '~/Assets';

export default function Splash() {
  return (
    <>
      <Box bg="$white" h="$full">
        <Center w="$full" h="$full">
          <Image
            source={IMAGES.LOGO}
            w="$32"
            h="$32"
            resizeMode="contain"
            alt="LOGO"
          />
        </Center>
      </Box>
    </>
  );
}
