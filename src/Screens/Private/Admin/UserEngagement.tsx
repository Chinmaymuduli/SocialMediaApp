import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { PrivateContainer } from '~/Components/container';
import { Box, Divider, FlatList, HStack, Image, Pressable, VStack } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { WIDTH } from '~/Utils';
import AppIcon from '~/Components/core/AppIcon';
import { COLORS } from '~/Styles';

const UserEngagement = () => {
    const [open, setOpen] = useState(true);
    const data = [
        {
            id: '0',
            title: 'Number of active users -',
            value: '40',
            nb: 'N:B- How many users are actively using the platform',
        },
        {
            id: '1',
            title: 'Time spent per session -',
            value: '40',
            nb: 'N:B- Average duration users spend on the platform in one session ',
        },
        {
            id: '2',
            title: 'Frequency of visits -',
            value: '40',
            nb: 'N:B- How often users return to the platform ',
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
    ];
    return (
        <PrivateContainer
            title={'All User Engagement'}
            bg={'purple.50'}
            hasBackIcon={true}>
            <HStack
                px={'$5'}
                py={'$2'}
                borderBottomColor="$coolGray200"
                justifyContent={'space-between'}
                borderBottomWidth={'$1'}
                alignItems={'center'}>
                <Text bold fontSize={16}>
                    User Metrics
                </Text>
                <Pressable
                    onPress={() => setOpen(!open)}
                >
                    <HStack gap={'$2'} alignItems={'center'}>
                        {
                            open ?
                                <AppIcon AntDesignName="caretup" size={25} color={COLORS.secondary} />
                                :
                                <AppIcon AntDesignName="caretdown" size={25} color={COLORS.secondary} />
                        }
                    </HStack>
                </Pressable>
            </HStack>
            {
                open &&
                <Box mx={'$2'} bgColor={'$coolGray100'}>
                    {data?.map(i => (
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
                                    {i?.title}
                                </Text>
                                <HStack alignItems="center">
                                    <Text
                                        fontFamily="Montserrat-SemiBold"
                                        fontSize={16}
                                        ml={'$2'}
                                        color={COLORS.secondary}>
                                        {i?.value}
                                    </Text>
                                    <AppIcon MaterialIconsName="percent" size={20} color="black" />
                                </HStack>
                            </HStack>
                            <Divider mt={'$2'} />
                            <Text fontSize={'$sm'} color={'$blueGray600'} mt={'$2'}>
                                {i?.nb}
                            </Text>
                        </Box>
                    ))}
                </Box>
            }
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
                <Pressable>
                    <HStack gap={'$2'} alignItems={'center'}>
                        <AppIcon IoniconsName="filter" size={25} color={COLORS.secondary} />
                        <Text fontWeight={'semibold'}>Filter</Text>
                    </HStack>
                </Pressable>
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

export default UserEngagement;

const styles = StyleSheet.create({});
