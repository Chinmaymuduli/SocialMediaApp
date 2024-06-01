import React from 'react';
import {PrivateContainer} from '~/Components/container';
import {
  AddIcon,
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {ANIMATIONS, IMAGES} from '~/Assets';

import {useMutation, useSwrApi} from '~/Hooks';
import FetchLoader from '~/Components/core/FetchLoader';
import Empty from '~/Components/core/Empty';
import {useNavigation} from '@react-navigation/native';
import {
  PrivateNavigationProp,
  PrivateScreenProps,
} from '~/Routes/Private/types';
import {Button} from '~/Components/core';
import {Pressable} from 'react-native';
import SentCompo from './SentCompo';

const SentConnections = () => {
  const {navigate} = useNavigation<PrivateScreenProps>();
  const {mutation, isLoading} = useMutation();
  const {data, isValidating, mutate} = useSwrApi(
    `connections/read-all?type=send&require_all=true`,
  );

  if (isValidating) <FetchLoader />;
  return (
    <PrivateContainer title={'Sent Connections'} hasBackIcon={true}>
      <SentCompo data={data?.data?.data} />
    </PrivateContainer>
  );
};

export default SentConnections;
