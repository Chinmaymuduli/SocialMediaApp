import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
    Box,
    FormControl,
    HStack,
    Image,
    Input,
    InputField,
    InputIcon,
    Pressable,
    ScrollView,
    Text,
    SearchIcon,
} from '@gluestack-ui/themed';
import { PrivateContainer } from '~/Components/container';
import { VideoModal } from '~/Components/screens';
import AppIcon from '~/Components/core/AppIcon';
import { COLORS } from '~/Styles';

const data = [
    {
        id: '0',
    },
    {
        id: '1',
    },
    {
        id: '2',
    },
    {
        id: '3',
    },
    {
        id: '4',
    },
    {
        id: '6',
    },
]
const PopularReels = () => {
    const [searchPosts, setSearchPosts] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <PrivateContainer title={'Popular Reels'} bg={'purple.50'} hasBackIcon={true}>
            {/* Header with and Search  */}
            <HStack
                px={'$3'}
                pt={'$5'}
                pb={'$1'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text bold fontSize={16}>
                    All Reels
                </Text>

                <Pressable
                    softShadow={'1'}
                    bgColor='white'
                    p={'$2'}
                    rounded={'$lg'}
                    opacity={2}
                    w={'$10'}
                    h={'$10'}
                    alignItems='center'
                    justifyContent='center'
                    onPress={() => setSearchPosts(!searchPosts)}
                >
                    <AppIcon
                        FeatherName="search"
                        size={20}
                        color={COLORS.secondary}
                    />
                </Pressable>
            </HStack>

            {
                searchPosts &&
                <Box
                    mx={'$3'}
                >
                    <FormControl isRequired mt={1}>
                        <Input alignItems="center">
                            <InputIcon as={SearchIcon} color="$coolGray500" pl="$8" size="lg" />

                            <InputField
                                type="text"

                            />
                        </Input>
                    </FormControl>
                </Box>
            }

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}>
                {data?.map((item: any) => (
                    <Box
                        mx={'$3'}
                        key={item?._id}
                        my={'$2'}
                        borderRadius={5}
                        overflow='hidden'
                        softShadow={'1'}
                        bgColor={'white'}
                    >
                        <HStack
                            alignItems='center'
                            borderBottomWidth={'$1'}
                            borderBottomColor='$blueGray300'
                        >
                            <Image
                                source={{ uri: 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1715909941~exp=1715913541~hmac=7e2eaee22a881585fabffe14f7d191399754e054b9528450162bc053744c8c69&w=740' }}
                                w={'$12'}
                                h={'$12'}
                                alt='Image'
                            />
                            <Box>
                                <Text fontFamily="Montserrat-Bold" fontSize={12}  >
                                    Mr. Biswopaban Nayak
                                </Text>
                            </Box>
                        </HStack>
                        <Pressable
                            onPress={() => setVisible(!visible)}
                            p={'$4'}
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                            bg={'$coolGray100'}
                        >
                            <Text fontFamily="Montserrat-SemiBold" color={'$coolGray600'} fontSize={12}  >
                                Click Here to watch Video
                            </Text>
                            <LottieView
                                source={{ uri: 'https://lottie.host/4a95f6e8-d988-41ea-a032-93b073b0b148/ox4TIsXGn3.json' }}
                                style={{
                                    width: 40,
                                    height: 20,
                                    marginRight: 30
                                }}
                                loop={true}
                                autoPlay
                            />
                        </Pressable>
                        <VideoModal visible={visible} setVisible={setVisible} />

                    </Box>
                ))}
            </ScrollView>
        </PrivateContainer>
    )
}

export default PopularReels

const styles = StyleSheet.create({})