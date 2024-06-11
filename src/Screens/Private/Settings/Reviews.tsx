import {Box, Text} from '@gluestack-ui/themed';
import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {useSwrApi} from '~/Hooks';

const Reviews = () => {
  // const{} = useSwrApi(``)
  return (
    <PrivateContainer title={'All Reviews'} hasBackIcon={true}>
      <Box justifyContent="center" alignItems="center" mt={'$20'}>
        <Text bold>No Reviews Found</Text>
      </Box>
    </PrivateContainer>
  );
};

export default Reviews;
