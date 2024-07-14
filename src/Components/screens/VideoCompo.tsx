import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {WIDTH} from '~/Utils';

const VideoCompo = ({url, isVisible}: any) => {
  const [paused, setPaused] = useState(true);
  const videoRef = useRef<any>(null);
  const handleVideoPress = () => {
    setPaused(!paused);
  };

  useEffect(() => {
    if (!isVisible) {
      setPaused(true);
    }
  }, [isVisible]);
  return (
    <Pressable
      // style={{width: '100%'}}
      onPress={() => {
        handleVideoPress();
      }}>
      <View
        style={{
          width: '100%',
          overflow: 'hidden',
        }}>
        <Video
          source={{
            uri: url,
          }}
          // style={{flex: 1, backgroundColor: '#fff', aspectRatio: 16 / 9}}
          style={styles.media}
          rate={1}
          resizeMode="cover"
          paused={paused}
          ref={videoRef}
          onEnd={() => {
            setPaused(true);
          }}
        />
      </View>
    </Pressable>
  );
};

export default VideoCompo;

const styles = StyleSheet.create({
  media: {
    // width: 300,
    width: WIDTH,
    height: 200, // Adjust the height as needed
    // marginRight: 10,
  },
});
