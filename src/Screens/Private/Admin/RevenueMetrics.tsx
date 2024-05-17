import { StyleSheet } from 'react-native'
import React from 'react'
import { PrivateContainer } from '~/Components/container'
import { Box, Divider, HStack, Image, ScrollView, VStack } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { WIDTH } from '~/Utils'
import AppIcon from '~/Components/core/AppIcon'
import { COLORS } from '~/Styles'

const RevenueMetrics = () => {
    return (
        <PrivateContainer title={'Revenue Metrics'} bg={'purple.50'} hasBackIcon={true}>
            <Image
                source={{ uri: 'https://img.freepik.com/free-vector/employee-working-office-interior-workplace-flat-vector-illustration_1150-37459.jpg?t=st=1715976369~exp=1715979969~hmac=3d092371c043defacfc51670e71907c77e7f49e8ff7cc826551ab3b2203a1bca&w=740' }}
                style={{
                    width: WIDTH,
                    height: 330,
                    resizeMode: 'contain',
                }}
                alt="Commision_img"
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
            >
                <Box
                    mx={'$2'}
                >
                    <Box
                        mx={'$3'}
                        my={'$4'}
                        borderRadius={5}
                        overflow='hidden'
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Total Revenue:</Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" fontSize={16} mx={'$2'} color={COLORS.secondary}>4000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                        <Divider mt={'$2'} />
                        <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Total Revenue Collected</Text>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Booking sum : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>10</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        my={'$2'}
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Delivered sum : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>10</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        my={'$2'}
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Total Bill : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>1000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        my={'$2'}
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Sum of sent details : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>1000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        my={'$2'}
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Sum of acceptance details : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>1000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        my={'$2'}
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Subscriptions : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>1000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        my={'$2'}
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Purchases : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>1000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        borderRadius={5}
                        overflow='hidden'
                        my={'$2'}
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Others : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" mx={'$2'} fontSize={16} color={COLORS.secondary}>1000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                    </Box>
                    <Box
                        mx={'$3'}
                        mt={'$2'}
                        borderRadius={5}
                        overflow='hidden'
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Collection pot : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" fontSize={16} mx={'$2'} color={COLORS.secondary}>4000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                        <Divider mt={'$2'} />
                        <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Total Available Sum</Text>
                    </Box>
                    <Box
                        mx={'$3'}
                        mt={'$4'}
                        borderRadius={5}
                        overflow='hidden'
                        softShadow={'1'}
                        bgColor={'white'} p={'$2'}
                    >
                        <HStack>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Conversion rate : </Text>
                            <HStack alignItems='center'>
                                <Text fontFamily="Montserrat-SemiBold" fontSize={16} mx={'$2'} color={COLORS.secondary}>4000</Text>
                                <AppIcon
                                    FoundationName="dollar"
                                    size={20}
                                    color="black"
                                />
                            </HStack>
                        </HStack>
                        <Divider mt={'$2'} />
                        <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Percentage of users who convert from free to paid plans or make a purchase</Text>
                    </Box>
                </Box>
            </ScrollView>
        </PrivateContainer>
    )
}

export default RevenueMetrics

const styles = StyleSheet.create({})