import { StyleSheet } from 'react-native'
import React from 'react'
import { PrivateContainer } from '~/Components/container'
import { Box, Divider, FlatList, HStack, Image, Pressable, ScrollView, VStack } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { WIDTH } from '~/Utils'
import AppIcon from '~/Components/core/AppIcon'
import { COLORS } from '~/Styles'
import { useNavigation } from '@react-navigation/native'
import { PrivateScreenProps } from '~/Routes/Private/types'

const RevenueMetrics = () => {
    const data = [
        {
            id: '0',
            title: 'Total Revenue',
            value: '1000'
        },
        {
            id: '1',
            title: 'Booking sum ',
            value: '500'
        },
        {
            id: '2',
            title: 'Delivered sum ',
            value: '500'
        },
        {
            id: '3',
            title: 'Total Bill',
            value: '55250'
        },
        {
            id: '4',
            title: 'Total Bill',
            value: '55250'
        },
        {
            id: '5',
            title: 'Sum of sent details',
            value: '55250'
        },
        {
            id: '6',
            title: 'Sum of acceptance details',
            value: '5550'
        },


    ]
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
    const { navigate } = useNavigation<PrivateScreenProps>();
    return (
        <PrivateContainer title={'Revenue Metrics'} bg={'purple.50'} hasBackIcon={true}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
            >
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/employee-working-office-interior-workplace-flat-vector-illustration_1150-37459.jpg?t=st=1715976369~exp=1715979969~hmac=3d092371c043defacfc51670e71907c77e7f49e8ff7cc826551ab3b2203a1bca&w=740' }}
                    style={{
                        width: WIDTH,
                        height: 250,
                        resizeMode: 'contain'
                    }}
                    alt="Commision_img"
                />
                <Box
                    mx={'$4'}
                    borderWidth={'$1'}
                    borderRadius={10}
                    overflow='hidden'
                    borderColor='$coolGray400'
                    borderStyle='dashed'
                >
                    {
                        data?.map(i => (
                            <Box
                                borderBottomWidth={i?.id === '6' ? '$0' : '$1'}
                                overflow='hidden'
                                softShadow={'1'}
                                bgColor={'white'} p={'$3'}
                                borderBottomColor='$coolGray400'
                                borderStyle='dashed'
                            >
                                <HStack alignItems='center' >
                                    <Text fontFamily="Montserrat-SemiBold" fontSize={14} w={'50%'} color={'$black'}>{i?.title}</Text>
                                    <Text w={'5%'} >:</Text>
                                    <HStack alignItems='center' w={'55%'} >
                                        <Text fontFamily="Montserrat-SemiBold" fontSize={16} mx={'$2'} color={COLORS.secondary}>{i?.value}</Text>
                                        <AppIcon
                                            FoundationName="dollar"
                                            size={20}
                                            color="black"
                                        />
                                    </HStack>
                                </HStack>
                            </Box>
                        ))
                    }

                </Box>
                <HStack
                    px={'$5'}
                    py={'$3'}
                    mt={'$5'}
                    borderBottomColor="$coolGray200"
                    justifyContent={'space-between'}
                    borderBottomWidth={'$1'}
                    alignItems={'center'}>
                    <Text bold fontSize={16}>
                        User Details
                    </Text>

                    <Pressable
                        onPress={() => navigate('RevenueMetricsAllUsers')}
                    >
                        <HStack gap={'$2'} alignItems={'center'}>
                            <Text fontWeight={'semibold'} color='$blue600' >View All</Text>
                        </HStack>
                    </Pressable>
                </HStack>
                <Box
                    bgColor={'$coolGray200'}
                    py={'$3'}
                    px={'$2'}
                >
                    <FlatList
                        data={Data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }: any) => (
                            <Box
                                mx={'$2'}
                                key={item?.id}
                                my={'$2'}
                                w={WIDTH / 1.2}
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
                </Box>
            </ScrollView>
        </PrivateContainer >
    )
}

export default RevenueMetrics

const styles = StyleSheet.create({})