import { StyleSheet } from 'react-native';
import React from 'react';
import {
    Box,
    HStack,
    Image,
    Pressable,
    ScrollView,
    Text,
    VStack,
} from '@gluestack-ui/themed';
import { COLORS } from '~/Styles';
import { PrivateContainer } from '~/Components/container';
import AppIcon from '~/Components/core/AppIcon';
import moment from 'moment';

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

const SocialInteractions = () => {
    return (
        <PrivateContainer title={'Meetings'} bg={'purple.50'} hasBackIcon={true}>
            {/* Header with filter and Search  */}
            <HStack
                px={'$3'}
                pt={'$5'}
                pb={'$1'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text bold fontSize={16}>
                    All Posts
                </Text>
                <HStack
                    px={'$3'}

                >
                    <Pressable
                        mx={'$4'}
                        softShadow={'1'}
                        bgColor='white'
                        p={'$2'}
                        rounded={'$lg'}
                        opacity={2}
                        w={'$10'}
                        h={'$10'}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <AppIcon
                            FeatherName="search"
                            size={20}
                            color={COLORS.secondary}
                        />
                    </Pressable>
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
                    >
                        <AppIcon
                            MaterialCommunityIconsName="sort-variant"
                            size={22}
                            color={COLORS.secondary}
                        />
                    </Pressable>

                </HStack>
            </HStack>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}>
                {data?.map((item: any) => (
                    <Box
                        mx={'$3'}
                        key={item?._id}
                        my={'$4'}
                        borderRadius={5}
                        overflow='hidden'
                        softShadow={'1'}
                        bgColor={'white'}
                    >
                        <HStack >
                            <Image
                                source={{ uri: 'https://img.freepik.com/free-psd/living-edge-square-flyer-template_23-2148516108.jpg?t=st=1715715740~exp=1715719340~hmac=33139cede55d56b03bd68b19478a6a4f62cd43c51bd46c062ae37eda472a5155&w=740' }}
                                w={'$40'}
                                h={'$40'}
                                alt='Image'
                            />
                            <Box pr={'$5'}>
                                <HStack gap={'$2'} px={'$2'} py={'$1'} alignItems='center' >
                                    <Box
                                        bgColor='white'
                                        p={'$1'}
                                        rounded={'$md'}
                                        opacity={2}
                                        w={'$8'}
                                        h={'$8'}
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <AppIcon
                                            FontistoName="comments"
                                            size={20}
                                            color={COLORS.secondary}
                                        />
                                    </Box>
                                    <Text fontFamily="Montserrat-Bold" fontSize={12}  >
                                        Total Comments
                                    </Text>
                                    <Text>:</Text>
                                    <Text fontFamily="Montserrat-SemiBold" fontSize={13} color={COLORS.secondary}>
                                        100k
                                    </Text>
                                </HStack>

                                <HStack gap={'$2'} px={'$2'} py={'$1'} alignItems='center'>
                                    <Box
                                        bgColor='white'
                                        p={'$1'}
                                        rounded={'$md'}
                                        opacity={2}
                                        w={'$8'}
                                        h={'$8'}
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <AppIcon
                                            AntDesignName="like1"
                                            size={20}
                                            color={'#800080'}
                                        />
                                    </Box>
                                    <Text fontFamily="Montserrat-Bold" fontSize={12}>
                                        Total Likes
                                    </Text>
                                    <Text>:</Text>
                                    <Text fontFamily="Montserrat-SemiBold" fontSize={13} color={'#800080'}>
                                        100k
                                    </Text>
                                </HStack>
                                <HStack gap={'$2'} px={'$2'} py={'$1'} alignItems='center'>
                                    <Box
                                        bgColor='white'
                                        p={'$1'}
                                        rounded={'$md'}
                                        opacity={2}
                                        w={'$8'}
                                        h={'$8'}
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <AppIcon
                                            FontAwesome5Name="share-square"
                                            size={20}
                                            color={'#1e40af'}
                                        />
                                    </Box>
                                    <Text fontFamily="Montserrat-Bold" fontSize={12}>
                                        Total Shares
                                    </Text>
                                    <Text>:</Text>
                                    <Text fontFamily="Montserrat-SemiBold" fontSize={13} color={'#1e40af'}>
                                        100k
                                    </Text>
                                </HStack>
                                <HStack gap={'$2'} px={'$2'} py={'$1'} alignItems='center'>
                                    <Box
                                        bgColor='white'
                                        p={'$1'}
                                        rounded={'$md'}
                                        opacity={2}
                                        w={'$8'}
                                        h={'$8'}
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <AppIcon
                                            EntypoName="circular-graph"
                                            size={20}
                                            color={'#8b4513'}
                                        />
                                    </Box>
                                    <Text fontFamily="Montserrat-Bold" fontSize={12}>
                                        Other
                                    </Text>
                                    <Text>:</Text>
                                    <Text fontFamily="Montserrat-SemiBold" fontSize={13} color={'#8b4513'}>
                                        100k
                                    </Text>
                                </HStack>
                            </Box>
                        </HStack>
                    </Box>
                ))}
            </ScrollView>

            {/* <BottomSheet
          visible={isOpen}
          onDismiss={() => {
            onClose();
          }}>
          <VStack space={2} mt={3}>
            <Text bold fontSize={16} px={2}>
              Status :{' '}
            </Text>
            <VStack space={3}>
              {Sort_Array?.map((item, _) => (
                <Pressable
                  key={item?.id}
                  m={1}
                  onPress={() => {
                    setOrder(item?.title), onClose();
                  }}
                  borderWidth={1}
                  borderRadius={20}
                  borderColor={COLORS.primary}
                  bgColor={order === item?.title ? COLORS.primary : 'white'}>
                  <HStack alignItems={'center'} mx={'4'} py={2}>
                    <AppIcon
                      AntDesignName="codepen-circle"
                      size={20}
                      color={order === item?.title ? 'white' : 'blue'}
                      style={{
                        width: '8%',
                      }}
                    />
                    <Text
                      bold
                      fontSize={'sm'}
                      color={order === item?.title ? 'white' : COLORS.primary}
                      mx={4}
                      width={'70%'}>
                      {item?.title}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </BottomSheet>
  
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={() => setDatePickerVisibility(false)}
          onCancel={() => setDatePickerVisibility(false)}
        /> */}
        </PrivateContainer>
    )
}

export default SocialInteractions

const styles = StyleSheet.create({})