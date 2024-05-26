import { StyleSheet } from 'react-native';
import React from 'react';
import { PrivateContainer } from '~/Components/container';
import { Box, FlatList, HStack, Image, VStack } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
const RevenueMetricsAllUsers = () => {
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
    ];
    return (
        <PrivateContainer
            title={'Revenue Metrics'}
            bg={'purple.50'}
            hasBackIcon={true}>
            <HStack
                px={'$5'}
                py={'$3'}
                borderBottomColor="$coolGray200"
                justifyContent={'space-between'}
                borderBottomWidth={'$1'}
                alignItems={'center'}>
                <Text bold fontSize={16}>
                    User Details
                </Text>
            </HStack>
            <FlatList
                data={Data}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: any) => (
                    <Box
                        mx={'$4'}
                        key={item?.id}
                        my={'$2'}
                        borderRadius={5}
                        overflow="hidden"
                        softShadow={'2'}
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
                        <VStack p={'$4'}>
                            <HStack alignItems="center" py={'$2'}>
                                <Text fontFamily="Montserrat-Bold" fontSize={12} w={'20%'}>
                                    Email
                                </Text>
                                <Text fontFamily="Montserrat-Bold" fontSize={12} w={'5%'}>
                                    :
                                </Text>
                                <Text
                                    fontFamily="Montserrat-Bold"
                                    fontSize={12}
                                    color={'$coolGray500'}>
                                    {item?.email}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" py={'$2'}>
                                <Text fontFamily="Montserrat-Bold" fontSize={12} w={'20%'}>
                                    Phone
                                </Text>
                                <Text fontFamily="Montserrat-Bold" fontSize={12} w={'5%'}>
                                    :
                                </Text>
                                <Text
                                    fontFamily="Montserrat-Bold"
                                    fontSize={12}
                                    color={'$coolGray500'}>
                                    {item?.number}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" py={'$2'}>
                                <Text fontFamily="Montserrat-Bold" fontSize={12} w={'20%'}>
                                    Location
                                </Text>
                                <Text fontFamily="Montserrat-Bold" fontSize={12} w={'5%'}>
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

export default RevenueMetricsAllUsers;

const styles = StyleSheet.create({});
