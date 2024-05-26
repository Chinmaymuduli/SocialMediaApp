import { StyleSheet } from 'react-native';
import React from 'react';
import { PrivateContainer } from '~/Components/container';
import {
    Box,
    HStack,
    Image,
    VStack,
} from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { COLORS } from '~/Styles';
import { FlatList } from '@gluestack-ui/themed';
const TechnicalMetrics = () => {
    const data = [
        {
            id: '0',
            title: 'App Performance',
            value: '40',
        },
        {
            id: '1',
            title: 'Error rates',
            value: '10',
        },
        {
            id: '2',
            title: 'Queries',
            value: '40',
        },
    ];

    const Data = [
        {
            id: '0',
            name: 'Biswopaban Nayak',
            email: 'hy@gmail.com',
            message: 'App is very slow to run'
        },
        {
            id: '1',
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            message: 'Unable to log in to the app'
        },
        {
            id: '2',
            name: 'John Smith',
            email: 'john.smith@example.com',
            message: 'Payment gateway is not working'
        },
        {
            id: '3',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            message: 'Received multiple error messages'
        },
        {
            id: '4',
            name: 'Michael Lee',
            email: 'michael.lee@example.com',
            message: 'App crashes frequently on startup'
        },
        {
            id: '5',
            name: 'Emily Brown',
            email: 'emily.brown@example.com',
            message: 'Profile update feature is not working'
        },

    ];

    return (
        <PrivateContainer title={'Technical Metrics'} bg={'purple.50'} hasBackIcon={true}>

            <VStack
                borderBottomWidth={'$1'}
                borderBottomColor="$coolGray200"
                backgroundColor="$coolGray100"
                py={'$1'}>
                {data?.map(i => (
                    <Box
                        mx={'$5'}
                        my={'$2'}
                        borderRadius={5}
                        borderColor='$blueGray300'
                        overflow="hidden"
                        bgColor={'white'}
                        borderWidth={'$1'}
                        p={'$2'}>
                        <HStack>
                            <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={14}
                                w={'50%'}
                                color={'$black'}>
                                {i?.title}
                            </Text>
                            <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={16}
                                color={'$black'}
                                w={'5%'}
                            >
                                :
                            </Text>
                            <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={16}
                                w={'40%'}
                                color={COLORS.secondary}>
                                {i?.value} %
                            </Text>
                        </HStack>
                    </Box>
                ))}
            </VStack>
            <HStack
                px={'$5'}
                py={'$3'}
                borderBottomColor="$coolGray200"
                justifyContent={'space-between'}
                borderBottomWidth={'$1'}
                alignItems={'center'}>
                <Text bold fontSize={16}>
                    All Queries
                </Text>
            </HStack>
            <FlatList
                data={Data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: any) => (
                    <Box
                        mx={'$4'}
                        key={item?.id}
                        my={'$2'}
                        borderRadius={5}
                        overflow="hidden"
                        softShadow={'1'}
                        bgColor={'white'}>
                        <HStack
                            alignItems="center"
                            borderBottomWidth={'$1'}
                            borderBottomColor="$blueGray200">
                            <Image
                                source={{
                                    uri: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-857.jpg?t=st=1715972562~exp=1715976162~hmac=231bf303c9715b56fca91ef7f25b27f73585aa3117876a950c7aa09edb7e9c96&w=740',
                                }}
                                w={'$16'}
                                h={'$16'}
                                alt="Image"
                            />
                            <Box>
                                <Text fontFamily="Montserrat-Bold" fontSize={12}>
                                    {item?.name}
                                </Text>
                                <Text
                                    fontFamily="Montserrat-Bold"
                                    fontSize={12}
                                    pt={'$1'}
                                    color={'$coolGray500'}>
                                    {item?.email}
                                </Text>
                            </Box>
                        </HStack>
                        <VStack p={'$4'}   >

                            <Text fontFamily="Montserrat-Bold" fontSize={12}
                                color='$coolGray500'
                            >
                                {item?.message}
                            </Text>
                        </VStack>
                    </Box>
                )}
            />
        </PrivateContainer>
    )
}

export default TechnicalMetrics

const styles = StyleSheet.create({})