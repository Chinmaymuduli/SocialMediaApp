import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box} from '@gluestack-ui/themed';
import MyConnectionCompo from './MyConnectionCompo';
import {useSwrApi} from '~/Hooks';
import {PrivateContainer} from '~/Components/container';

const AllMyConnect = () => {
  const {data, isValidating, mutate} = useSwrApi(
    `connections/read-all?type=all&is_accepted=true&require_all=true`,
  );

  console.log(data?.data?.data);
  return (
    <PrivateContainer title={'My Connections'} hasBackIcon={true}>
      <MyConnectionCompo data={data?.data?.data} />
    </PrivateContainer>
  );
};

export default AllMyConnect;

const styles = StyleSheet.create({});
