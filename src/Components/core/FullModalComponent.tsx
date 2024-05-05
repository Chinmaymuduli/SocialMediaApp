import {StyleSheet, View, Modal} from 'react-native';
import React from 'react';
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Input,
  Pressable,
  Text,
} from '@gluestack-ui/themed';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '~/styles';
import {HEIGHT} from '~/Utils';

type ModalType = {
  fullModalVisible?: boolean;
  setFullModalVisible: (prev: boolean) => void;
  data: any[];
  OnSelect: (item: any) => void;
};

const ModalComponent = ({
  fullModalVisible,
  setFullModalVisible,
  data,
  OnSelect,
}: ModalType) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredData = searchQuery
    ? data?.filter(item =>
        item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
      )
    : data;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={fullModalVisible}
      onRequestClose={() => {
        setFullModalVisible(!fullModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <HStack
            bg={{
              linearGradient: {
                colors: ['green.400', 'teal.400'],
                start: [1, 0],
                end: [0, 1],
              },
            }}
            justifyContent={'center'}
            alignItems={'center'}
            pt={5}
            pb={3}
            space={1}>
            <Input
              py={1}
              shadow={7}
              backgroundColor={'#fff'}
              borderRadius={20}
              placeholder="search for result"
              bgColor={'white'}
              w={'86%'}
              fontWeight={'semibold'}
              focusOutlineColor={'#fff'}
              onChangeText={(txt: any) => setSearchQuery(txt)}
              value={searchQuery}
              InputLeftElement={
                <Box ml={2}>
                  <AppIcon
                    FeatherName="search"
                    size={22}
                    // onPress={() => setShowPassword(!showPassword)}
                  />
                </Box>
              }
            />
            <Pressable onPress={() => setFullModalVisible(!fullModalVisible)}>
              <Ionicons name={'close'} size={35} color={'white'} />
            </Pressable>
          </HStack>
          <Divider />

          <FlatList
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{pb: 40}}
            data={filteredData}
            renderItem={({item}: any) => (
              <>
                <Pressable
                  bg={'#fff'}
                  rounded={8}
                  shadow={2}
                  p={3}
                  m={2}
                  onPress={() => OnSelect(item)}>
                  <Text fontWeight={'medium'}>{item?.title}</Text>
                </Pressable>
                {/* <Divider /> */}
              </>
            )}
            keyExtractor={(item, _) => _?.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#fff',
    minHeight: HEIGHT,
  },
  modalView: {
    borderRadius: 25,
  },
});
