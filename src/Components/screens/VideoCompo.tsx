import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

const VideoCompo = ({url}: any) => {
  const [paused, setPaused] = useState(false);
  const ref = useRef<any>();
  return (
    <Pressable
      style={{width: '100%'}}
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
          style={{flex: 1, backgroundColor: '#fff', aspectRatio: 16 / 9}}
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

const styles = StyleSheet.create({});
