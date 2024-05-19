import { StyleSheet } from 'react-native'
import React from 'react'
import { PrivateContainer } from '~/Components/container'
import { Box, Divider, HStack, Image, VStack } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { WIDTH } from '~/Utils'
import AppIcon from '~/Components/core/AppIcon'
import { COLORS } from '~/Styles'

const UserEngagement = () => {
    return (
        <PrivateContainer title={'All User Engagement'} bg={'purple.50'} hasBackIcon={true}>
            <Image
                source={{ uri: 'https://img.freepik.com/free-vector/remote-business-management-concept-with-businessman-holding-tablet-showing-analytics-graphs-connected_1284-44658.jpg?t=st=1715971072~exp=1715974672~hmac=482df3c83ea323da4068f2f893a14f6d2163f390f9a2d9cdbd8ce1d46b5064fd&w=740' }}
                style={{
                    width: WIDTH,
                    height: 330,
                    resizeMode: 'contain',
                    marginBottom: 20
                }}
                alt="Commision_img"
            />
            <Box
                mt={'$5'}
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
                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Number of active users :</Text>
                        <HStack alignItems='center'>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} ml={'$2'} color={COLORS.secondary}>40</Text>
                            <AppIcon
                                MaterialIconsName="percent"
                                size={20}
                                color="black"
                            />
                        </HStack>
                    </HStack>
                    <Divider mt={'$2'} />
                    <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- How many users are actively using the platform</Text>
                </Box>
                <Box
                    mx={'$3'}
                    my={'$4'}
                    borderRadius={5}
                    overflow='hidden'
                    softShadow={'1'}
                    bgColor={'white'} p={'$2'}
                >
                    <HStack>
                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Time spent per session : </Text>
                        <HStack alignItems='center'>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={COLORS.secondary}>10</Text>
                            <AppIcon
                                MaterialIconsName="percent"
                                size={20}
                                color="black"
                            />
                        </HStack>
                    </HStack>
                    <Divider mt={'$2'} />
                    <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Average duration users spend on the platform in one session </Text>
                </Box>
                <Box
                    mx={'$3'}
                    my={'$4'}
                    borderRadius={5}
                    overflow='hidden'
                    softShadow={'1'}
                    bgColor={'white'} p={'$2'}
                >
                    <HStack>
                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Frequency of visits : </Text>
                        <HStack alignItems='center'>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={COLORS.secondary}>10</Text>
                            <AppIcon
                                MaterialIconsName="percent"
                                size={20}
                                color="black"
                            />
                        </HStack>
                    </HStack>
                    <Divider mt={'$2'} />
                    <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- How often users return to the platform </Text>
                </Box>
            </Box>
        </PrivateContainer>
    )
}

export default UserEngagement

const styles = StyleSheet.create({})