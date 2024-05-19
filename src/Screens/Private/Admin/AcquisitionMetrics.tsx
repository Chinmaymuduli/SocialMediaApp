import { StyleSheet } from 'react-native';
import React from 'react';
import { PrivateContainer } from '~/Components/container';
import {
    Box,
    Divider,
    HStack,
    Image,
    ScrollView,
    VStack,
} from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { WIDTH } from '~/Utils';
import AppIcon from '~/Components/core/AppIcon';
import { COLORS } from '~/Styles';

const AcquisitionMetrics = () => {
    return (
        <PrivateContainer
            title={'Acquisition Metrics'}
            bg={'purple.50'}
            hasBackIcon={true}>
            <Image
                source={{
                    uri: 'https://img.freepik.com/free-vector/coworkers-cartoon-characters-effective-collaboration-coworkers-cooperation-teamwork-colleagues-discussing-solution-successful-interaction-vector-isolated-concept-metaphor-illustration_335657-2730.jpg?t=st=1715978697~exp=1715982297~hmac=8a47a29c870991378363a68c54fe4e5b64c80ce36f72c5482c9b56dbff285deb&w=740',
                }}
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
                    paddingBottom: 20,
                }}>
                <Box mx={'$2'}>
                    <Box
                        mx={'$3'}
                        my={'$4'}
                        borderRadius={5}
                        overflow="hidden"
                        softShadow={'1'}
                        bgColor={'white'}
                        p={'$2'}>
                        <HStack>
                            <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={16}
                                color={'$black'}>
                                User acquisition channels :
                            </Text>
                            <HStack alignItems="center">
                                <Text
                                    fontFamily="Montserrat-SemiBold"
                                    fontSize={16}
                                    mx={'$2'}
                                    color={COLORS.secondary}>
                                    400
                                </Text>
                                <AppIcon FoundationName="dollar" size={20} color="black" />
                            </HStack>
                        </HStack>
                        <Divider mt={'$2'} />
                        <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'}>
                            N:B- Sources from which users are acquired (e.g., organic search, social media, referrals).
                        </Text>
                    </Box>
                    <Box
                        mx={'$3'}
                        mt={'$4'}
                        borderRadius={5}
                        overflow="hidden"
                        softShadow={'1'}
                        bgColor={'white'}
                        p={'$2'}>
                        <HStack>
                            <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={16}
                                color={'$black'}>
                                Cost per acquisition (CPA) :
                            </Text>
                            <HStack alignItems="center">
                                <Text
                                    fontFamily="Montserrat-SemiBold"
                                    fontSize={16}
                                    mx={'$2'}
                                    color={COLORS.secondary}>
                                    4000
                                </Text>
                                <AppIcon FoundationName="dollar" size={20} color="black" />
                            </HStack>
                        </HStack>
                        <Divider mt={'$2'} />
                        <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'}>
                            N:B- Cost incurred to acquire a new user from different channels
                        </Text>
                    </Box>
                </Box>
            </ScrollView>
        </PrivateContainer>
    );
};

export default AcquisitionMetrics;

const styles = StyleSheet.create({});
