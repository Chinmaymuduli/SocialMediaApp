import { StyleSheet } from 'react-native';
import React from 'react';
import { PrivateContainer } from '~/Components/container';
import {
    Box,
    HStack,
    Image,
    VStack,
    Pressable,
} from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import AppIcon from '~/Components/core/AppIcon';
import { COLORS } from '~/Styles';
import { FlatList } from '@gluestack-ui/themed';

const RetentionAndChurnMetrics = () => {
    const data = [
        {
            id: '0',
            title: 'User retention rate :',
            value: '40',
        },
        {
            id: '0',
            title: 'Churn rate :',
            value: '40',
        },
    ];

    const Data = [
        {
            id: '0',
            name: 'Biswopaban Nayak',
            email: 'hy@gmail.com',
            number: '986572818',
            location: 'India',
            status: 'Active',
        },
        {
            id: '1',
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            number: '123456789',
            location: 'USA',
            status: 'Inactive',
        },
        {
            id: '2',
            name: 'John Smith',
            email: 'john.smith@example.com',
            number: '987654321',
            location: 'Canada',
            status: 'Active',
        },
        {
            id: '3',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            number: '123123123',
            location: 'UK',
            status: 'Inactive',
        },
        {
            id: '4',
            name: 'Michael Lee',
            email: 'michael.lee@example.com',
            number: '456456456',
            location: 'Australia',
            status: 'Active',
        },
        {
            id: '5',
            name: 'Emily Brown',
            email: 'emily.brown@example.com',
            number: '789789789',
            location: 'Germany',
            status: 'Inactive',
        },
        {
            id: '6',
            name: 'David Wilson',
            email: 'david.wilson@example.com',
            number: '321321321',
            location: 'France',
            status: 'Active',
        },
        {
            id: '7',
            name: 'Sophia Garcia',
            email: 'sophia.garcia@example.com',
            number: '654654654',
            location: 'Spain',
            status: 'Inactive',
        },
        {
            id: '8',
            name: 'Daniel Martinez',
            email: 'daniel.martinez@example.com',
            number: '987987987',
            location: 'Mexico',
            status: 'Active',
        },
        {
            id: '9',
            name: 'Olivia Rodriguez',
            email: 'olivia.rodriguez@example.com',
            number: '123987123',
            location: 'Brazil',
            status: 'Inactive',
        },
    ];

    return (
        <PrivateContainer
            title={'Retention & Churn Metrics'}
            bg={'purple.50'}
            hasBackIcon={true}>
            <VStack
                borderBottomWidth={'$1'}
                borderBottomColor="$coolGray200"
                backgroundColor="$coolGray100"
                py={'$1'}>
                {data?.map(i => (
                    <Box
                        mx={'$5'}
                        my={'$3'}
                        borderRadius={5}
                        overflow="hidden"
                        // softShadow={'1'}
                        bgColor={'white'}
                        p={'$2'}>
                        <HStack>
                            <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={16}
                                color={'$black'}>
                                {i?.title}{' '}
                            </Text>
                            <Text
                                fontFamily="Montserrat-SemiBold"
                                fontSize={16}
                                color={COLORS.secondary}>
                                40 %
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
                    All Payments
                </Text>

                <Pressable>
                    <HStack gap={'$2'} alignItems={'center'}>
                        <AppIcon IoniconsName="filter" size={25} color={COLORS.secondary} />
                        <Text fontWeight={'semibold'}>Filter</Text>
                    </HStack>
                </Pressable>
            </HStack>
            <FlatList
                data={Data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: any) => (
                    <Box
                        mx={'$3'}
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
                                    fontSize={10}
                                    mt={'$2'}
                                    color={item?.status === 'Active' ? '$green600' : '$rose600'}>
                                    {item?.status === 'Active' ? 'ACTIVE' : 'BLOCKED'}
                                </Text>
                            </Box>
                        </HStack>
                        <VStack p={'$4'}   >
                            <HStack alignItems="center" py={'$2'} >
                                <Text fontFamily="Montserrat-Bold" fontSize={12}
                                    w={'20%'}
                                >
                                    Email
                                </Text>
                                <Text fontFamily="Montserrat-Bold" fontSize={12}
                                    w={'5%'}
                                >
                                    :
                                </Text>
                                <Text
                                    fontFamily="Montserrat-Bold"
                                    fontSize={12}
                                    color={'$coolGray500'}>
                                    {item?.email}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" py={'$2'}  >
                                <Text fontFamily="Montserrat-Bold" fontSize={12}
                                    w={'20%'}
                                >
                                    Phone
                                </Text>
                                <Text fontFamily="Montserrat-Bold" fontSize={12}
                                    w={'5%'}
                                >
                                    :
                                </Text>
                                <Text
                                    fontFamily="Montserrat-Bold"
                                    fontSize={12}
                                    color={'$coolGray500'}>
                                    {item?.number}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" py={'$2'}  >
                                <Text fontFamily="Montserrat-Bold" fontSize={12}
                                    w={'20%'}
                                >
                                    Location
                                </Text>
                                <Text fontFamily="Montserrat-Bold" fontSize={12}
                                    w={'5%'}
                                >
                                    :
                                </Text>
                                <Text
                                    fontFamily="Montserrat-Bold"
                                    fontSize={12}
                                    color={'$coolGray500'}>
                                    {item?.location}
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                )}
            />
        </PrivateContainer>
    );
};

export default RetentionAndChurnMetrics;

const styles = StyleSheet.create({});
