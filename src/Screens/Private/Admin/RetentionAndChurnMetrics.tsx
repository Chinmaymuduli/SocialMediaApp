import { StyleSheet } from 'react-native'
import React from 'react'
import { PrivateContainer } from '~/Components/container'
import { Box, Divider, HStack, Image, VStack } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { IMAGES } from '~/Assets'
import { WIDTH } from '~/Utils'
import AppIcon from '~/Components/core/AppIcon'
import { COLORS } from '~/Styles'

const RetentionAndChurnMetrics = () => {
    return (
        <PrivateContainer title={'Retention & Churn Metrics'} bg={'purple.50'} hasBackIcon={true}>

            <Image
                source={IMAGES.COMMISSION}
                mt={'$10'}
                style={{
                    width: WIDTH,
                    height: 330,
                    resizeMode: 'contain',
                }}
                alt="Commision_img"
            />
            <VStack
                m={'$4'}
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
                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>User retention rate : </Text>
                        <HStack alignItems='center'>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={COLORS.secondary}>40</Text>
                            <AppIcon
                                MaterialIconsName="percent"
                                size={20}
                                color="black"
                            />
                        </HStack>
                    </HStack>
                    <Divider mt={'$2'} />
                    <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Percentage of users who continue using the platform over time </Text>
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
                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Churn rate : </Text>
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
                    <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Percentage of users who stop using the platform </Text>
                </Box>
            </VStack>
        </PrivateContainer>
    )
}

export default RetentionAndChurnMetrics

const styles = StyleSheet.create({})