import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  Image,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  VStack,
} from '@gluestack-ui/themed';
import AppIcon from './AppIcon';
import State from '~/Constants/State';

type Props = {
  visible: boolean;
  onSelect: (state: any) => void;
  onClose: () => void;
  selectedState?: any;
};

export default ({onClose, onSelect, visible}: Props) => {
  const [searchTxt, setSearchTxt] = useState<any>('');
  const [searchRes, setSearchRes] = useState(() => State);
  useEffect(() => {
    if (searchTxt) {
      const resArr = State?.filter((item: any) =>
        item?.name?.toLowerCase().includes(searchTxt?.toLowerCase()),
      );
      setSearchRes(resArr);
    } else {
      setSearchRes(State);
    }
  }, [searchTxt]);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => onClose()}>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <SafeAreaView style={styles.container}>
            <VStack w="100%" gap={'$5'} alignSelf="center">
              <HStack mt={2} gap={'$8'}>
                <Pressable onPress={() => onClose()}>
                  <MaterialIcons name="arrow-back" size={25} color="#000" />
                </Pressable>
                <Heading alignSelf={'center'} fontSize="$lg">
                  Select Your State
                </Heading>
              </HStack>

              <Input borderRadius={'$lg'}>
                <InputSlot pl="$3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField
                  type="text"
                  placeholder="Search for results"
                  value={searchTxt}
                  onChangeText={(txt: any) => setSearchTxt(txt)}
                />
              </Input>
            </VStack>
            <FlatList
              keyboardShouldPersistTaps="always"
              data={searchRes}
              renderItem={({item}: any) => (
                <TouchableOpacity
                  style={styles.flagWrapper}
                  onPress={() => onSelect(item)}>
                  {/* <Image
                    source={{
                      uri: `https://flagcdn.com/w20/${item?.code?.toLowerCase()}.png`,
                    }}
                    style={styles.flag}
                  /> */}
                  <Text>{item?.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item: any) => item?.title}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  flagWrapper: {padding: 10, flexDirection: 'row'},
  container: {
    flex: 1,
    padding: 10,
  },
});
