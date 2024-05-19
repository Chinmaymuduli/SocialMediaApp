import { StyleSheet } from 'react-native'
import React from 'react'
import { PrivateContainer } from '~/Components/container'
import { Box, Divider, HStack, Image, VStack } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { WIDTH } from '~/Utils'
import AppIcon from '~/Components/core/AppIcon'
import { COLORS } from '~/Styles'

const TechnicalMetrics = () => {
    return (
        <PrivateContainer title={'Technical Metrics'} bg={'purple.50'} hasBackIcon={true}>
            <Image
                source={{ uri: 'https://img.freepik.com/free-vector/software-requirement-description-abstract-concept-illustration_335657-3813.jpg?t=st=1715977822~exp=1715981422~hmac=2aa29780344c61735edc718acec7c67e43f75cb56f28e7a5f287a7b726a783fe&w=740' }}
                style={{
                    width: WIDTH,
                    height: 330,
                    resizeMode: 'contain',
                }}
                alt="Commision_img"
            />
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
                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>App performance :</Text>
                        <HStack alignItems='center'>
                            <Text fontFamily="Montserrat-SemiBold" fontSize={16} ml={'$2'} color={COLORS.secondary}>80</Text>
                            <AppIcon
                                MaterialIconsName="percent"
                                size={20}
                                color="black"
                            />
                        </HStack>
                    </HStack>
                    <Divider mt={'$2'} />
                    <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Metrics related to app responsiveness, speed, and reliability</Text>
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
                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} color={'$black'}>Error rates : </Text>
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
                    <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'} >N:B- Frequency and types of errors encountered by users </Text>
                </Box>

            </Box>
        </PrivateContainer>
    )
}

export default TechnicalMetrics

const styles = StyleSheet.create({})