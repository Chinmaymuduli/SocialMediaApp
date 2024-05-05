import {Box, HStack, Pressable, Text, VStack} from '@gluestack-ui/themed';
import ImgCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import BottomSheet from './BottomSheet';
import AppIcon from './AppIcon';

interface Props {
  visible?: boolean;
  onDismiss?: any;
  setImageUrl?: any;
  cropperCircleOverlay?: boolean;
  postImages?: any;
  onImageSelect?: (img: ImageOrVideo) => void;
}
const PhotoPicker = ({
  visible,
  onDismiss,
  setImageUrl,
  cropperCircleOverlay,
  onImageSelect,
}: Props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
      quality: 0.25,
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: 'photo',
    };
    ImgCropPicker?.openPicker({
      options,
      cropping: true,
      cropperCircleOverlay,
    }).then(res => {
      onImageSelect?.(res);
      setImageUrl?.(res);
      setShowSuccessModal(true);
      onDismiss();
    });
  };
  const handleTakePhoto = () => {
    const options = {
      noData: true,
      quality: 0.25,
      maxWidth: 5000,
      maxHeight: 1000,
      mediaType: 'photo',
    };
    ImgCropPicker.openCamera({
      options,
      cropping: true,
      cropperCircleOverlay,
    })
      .then(res => {
        onImageSelect?.(res);
        setImageUrl?.(res);
        setShowSuccessModal(true);
        onDismiss?.();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <BottomSheet visible={visible} onDismiss={onDismiss}>
        <Text bold style={styles.uploadText}>
          Upload Photo
        </Text>
        <HStack alignItems={'center'} gap={'$1'} my={5}>
          <Pressable onPress={handleTakePhoto}>
            <VStack alignItems={'center'} gap={'$1'}>
              <Box bg={'rose.500'} borderRadius={30}>
                <AppIcon
                  MaterialIconsName="camera"
                  size={20}
                  color={'white'}
                  style={{
                    padding: 10,
                  }}
                />
              </Box>
              <Text fontWeight={'medium'}>Camera</Text>
            </VStack>
          </Pressable>

          <Pressable onPress={handleChoosePhoto}>
            <VStack alignItems={'center'} gap={'$1'}>
              <Box bg={'pink.500'} borderRadius={30}>
                <AppIcon
                  MaterialCommunityIconsName="folder-multiple-image"
                  size={20}
                  color={'white'}
                  style={{
                    padding: 10,
                  }}
                />
              </Box>
              <Text fontWeight={'medium'}>Gallery</Text>
            </VStack>
          </Pressable>
        </HStack>
      </BottomSheet>
    </>
  );
};
export default PhotoPicker;

const styles = StyleSheet.create({
  uploadText: {
    // textAlign: 'center',
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
});
