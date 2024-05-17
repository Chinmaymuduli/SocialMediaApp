import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';

const VideoModal = ({ setVisible, visible }: any) => {
    const [clicked, setClicked] = useState(false);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState<any>(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [muted, setMuted] = useState(false);
    const ref = useRef<any>();
    const formatTime = (seconds: number): string => {
        // Ensure seconds is a whole number
        const totalSeconds = Math.floor(seconds);

        // Calculate minutes and seconds
        const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const secs = (totalSeconds % 60).toString().padStart(2, '0');

        return `${mins}:${secs}`;
    };

    const toggleMute = () => {
        setMuted(!muted);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}>
            <Pressable
                style={{ width: '100%' }}
                onPress={() => {
                    setClicked(true);
                    setFullScreen(true);
                }}>
                <View
                    style={{
                        height: Dimensions.get('window').height,
                        width: '100%',
                        overflow: 'hidden',
                    }}>
                    <Video
                        source={{
                            uri: 'https://videocdn.cdnpk.net/joy/content/video/free/video0457/large_preview/_import_60bb058c0c5812.83135201.mp4?filename=1104481_1080p_4k_2k_3840x2160.mp4',
                        }}
                        // source={require('../../assets/splash.mp4')}
                        style={{ flex: 1, backgroundColor: '#fff', aspectRatio: 16 / 9 }}
                        rate={1}
                        muted
                        resizeMode="contain"
                        repeat
                        paused={paused}
                        ref={ref}
                        onProgress={(x: any) => {
                            setProgress(x);
                        }}
                        onEnd={() => {
                            setProgress({ currentTime: 0, seekableDuration: 0 });
                            setPaused(true);
                        }}
                    />
                </View>
                {clicked && (
                    <Pressable
                        onPress={() => setClicked(false)}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            // backgroundColor: 'rgba(0,0,0,.1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            style={{
                                right: 14,
                                position: 'absolute',
                                backgroundColor: '#ffff',
                                top: 14,
                                borderRadius: 100,
                                padding: 3,
                            }}
                            onPress={() => setVisible(false)}>
                            <Entypo name="cross" size={32} color={'#000'} />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '100%',
                            }}>
                            <Pressable
                                onPress={() => {
                                    const newTime = parseInt(progress.currentTime) - 10;
                                    ref.current.seek(newTime);
                                    setProgress((prevProgress: any) => ({
                                        ...prevProgress,
                                        currentTime: newTime,
                                    }));
                                }}>
                                <AntDesign name={'banckward'} size={25} color={'#FFF'} />
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setPaused(!paused);
                                }}>
                                {paused ? (
                                    <AntDesign name={'play'} size={25} color={'#FFF'} />
                                ) : (
                                    <AntDesign name={'pausecircle'} size={25} color={'#FFF'} />
                                )}
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    if (progress && progress.currentTime !== null) {
                                        const newTime = parseInt(progress.currentTime) + 10;
                                        ref.current.seek(newTime);
                                        setProgress((prevProgress: any) => ({
                                            ...prevProgress,
                                            currentTime: newTime,
                                        }));
                                    }
                                }}
                            >
                                <AntDesign name={'forward'} size={25} color={'#FFF'} />
                            </Pressable>

                        </View>
                        <View
                            style={{
                                width: '100%',
                                position: 'absolute',
                                bottom: 80,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}>
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    marginTop: -50,
                                    flexDirection: 'row',
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {progress && progress.currentTime !== null && (
                                        <Text style={{ color: '#ffff', fontSize: 13 }}>
                                            {formatTime(progress.currentTime)}
                                        </Text>
                                    )}
                                    <Text style={{ color: '#ffff', fontSize: 13 }}>/</Text>
                                    {progress && progress.seekableDuration !== null && (
                                        <Text style={{ color: '#ffff', fontSize: 13 }}>
                                            {formatTime(progress.seekableDuration)}
                                        </Text>
                                    )}
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Pressable onPress={toggleMute}>
                                        {muted ? (
                                            <FontAwesome5
                                                name={'volume-mute'}
                                                size={20}
                                                color={'#FFF'}
                                            />
                                        ) : (
                                            <FontAwesome5
                                                name={'volume-up'}
                                                size={20}
                                                color={'#FFF'}
                                            />
                                        )}
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                )}
            </Pressable>
        </Modal>
    );
};

export default VideoModal;

const styles = StyleSheet.create({});
