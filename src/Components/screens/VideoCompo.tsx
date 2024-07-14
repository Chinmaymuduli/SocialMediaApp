import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {WIDTH} from '~/Utils';

const VideoCompo = ({url}: any) => {
  const [paused, setPaused] = useState(true);
  const ref = useRef<any>();
  useEffect(() => {
    // Ensure the video is paused when the component is unmounted
    return () => {
      ref.current?.pause();
    };
  }, []);
  return (
    <Pressable
      // style={{width: '100%'}}
      onPress={() => {
        setPaused(!paused);
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
          repeat
          paused={paused}
          ref={ref}
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
