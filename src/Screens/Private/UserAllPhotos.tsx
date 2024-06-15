import React, {useRef, useState} from 'react';
import {Box, FlatList} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesTypes} from '~/Routes/Private/types';
import {WIDTH} from '~/Utils';
import {COLORS} from '~/Styles';
import {Text} from '@gluestack-ui/themed';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'UserAllPhotos'>;
const UserAllPhotos = ({route: {params}}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems?.length > 0) {
      setCurrentIndex(viewableItems[0]?.index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <Box flex={1}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={params?.photos}
        renderItem={({item}: any) => (
          <Image
            source={{uri: item?.avatar}}
            alt="image"
            style={{height: '100%', width: WIDTH}}
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {params?.photos?.length > 1 && (
        <Box position="absolute" right={9} top={'3%'}>
          <Box bg={COLORS.gradientLow} softShadow="1" borderRadius={8}>
            <Text fontFamily="Montserrat-SemiBold" fontSize={13} px={'$1'}>
              {`${currentIndex + 1} / ${params?.photos?.length}`}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserAllPhotos;
