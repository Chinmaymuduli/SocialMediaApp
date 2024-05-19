import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
    Box,
    FormControl,
    HStack,
    Image,
    Input,
    InputField,
    InputIcon,
    Pressable,
    ScrollView,
    Text,
    SearchIcon,
} from '@gluestack-ui/themed';
import { PrivateContainer } from '~/Components/container';
import AppIcon from '~/Components/core/AppIcon';
import { COLORS } from '~/Styles';

const Data = [
    {
        "id": "0",
        "name": "Biswopaban Nayak",
        "rate": "4.2",
        "review": "Progress has been made on our compliance checklist, with some points completed and others to be finished within 1-2 months."
    },
    {
        "id": "1",
        "name": "Jane Doe",
        "rate": "3.8",
        "review": "We're steadily working through our compliance checklist, with certain tasks completed and others slated for completion within the next 1-2 months."
    },
    {
        "id": "2",
        "name": "John Smith",
        "rate": "4.5",
        "review": "We've made good progress on our compliance checklist, wrapping up some items and aiming to complete the rest within the coming 1-2 months."
    },
    {
        "id": "3",
        "name": "Alice Johnson",
        "rate": "4.0",
        "review": "Our compliance efforts are on track, with several tasks ticked off and the remainder scheduled for completion over the next 1-2 months."
    },
    {
        "id": "4",
        "name": "Michael Lee",
        "rate": "4.1",
        "review": "We're moving forward with our compliance checklist, having completed certain items and planning to finalize the rest within 1-2 months."
    },
    {
        "id": "5",
        "name": "Emily Brown",
        "rate": "4.3",
        "review": "Progress continues on our compliance checklist, with some tasks wrapped up and others set to be addressed within the next 1-2 months."
    },
    {
        "id": "6",
        "name": "David Wilson",
        "rate": "3.9",
        "review": "We're steadily advancing through our compliance checklist, having addressed several items and aiming to complete the remaining tasks within 1-2 months."
    },
    {
        "id": "7",
        "name": "Sophia Garcia",
        "rate": "4.4",
        "review": "Our efforts towards compliance are ongoing, with certain tasks completed and plans in place to finalize the remaining items over the next 1-2 months."
    },
    {
        "id": "8",
        "name": "Daniel Martinez",
        "rate": "4.6",
        "review": "We're making solid progress on our compliance checklist, with some tasks already completed and others scheduled for completion within the coming 1-2 months."
    },
    {
        "id": "9",
        "name": "Olivia Rodriguez",
        "rate": "4.2",
        "review": "Progress is underway on our compliance checklist, with certain tasks checked off and the remaining items slated for completion over the next 1-2 months."
    }
]


const UserFeedback = () => {
    const [searchPosts, setSearchPosts] = useState<boolean>(false)
    const StarIcon = ({ times }: any) => {
        const renderIcons = () => {
            const icons = [];
            for (let i = 0; i < times; i++) {
                icons.push(
                    <AppIcon key={i} EntypoName="star" size={16} color="#eab308" />
                );
            }
            return icons;
        };

        return <>{renderIcons()}</>;
    };
    return (
        <PrivateContainer title={'All Feedbacks'} bg={'purple.50'} hasBackIcon={true}>
            {/* Header with and Search  */}
            <HStack
                px={'$3'}
                pt={'$5'}
                pb={'$1'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Text bold fontSize={16}>
                    All Reviews
                </Text>

                <Pressable
                    softShadow={'1'}
                    bgColor='white'
                    p={'$2'}
                    rounded={'$lg'}
                    opacity={2}
                    w={'$10'}
                    h={'$10'}
                    alignItems='center'
                    justifyContent='center'
                    onPress={() => setSearchPosts(!searchPosts)}
                >
                    <AppIcon
                        FeatherName="search"
                        size={20}
                        color={COLORS.secondary}
                    />
                </Pressable>
            </HStack>

            {
                searchPosts &&
                <Box
                    mx={'$3'}
                >
                    <FormControl isRequired mt={1}>
                        <Input alignItems="center">
                            <InputIcon as={SearchIcon} color="$coolGray500" pl="$8" size="lg" />

                            <InputField
                                type="text"

                            />
                        </Input>
                    </FormControl>
                </Box>
            }

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}>
                {Data?.map((item: any) => (
                    <Box
                        mx={'$3'}
                        key={item?.id}
                        my={'$2'}
                        borderRadius={5}
                        overflow='hidden'
                        softShadow={'1'}
                        bgColor={'white'}
                    >
                        <HStack
                            alignItems='center'
                            borderBottomWidth={'$1'}
                            borderBottomColor='$blueGray200'
                        >
                            <Image
                                source={{ uri: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-857.jpg?t=st=1715972562~exp=1715976162~hmac=231bf303c9715b56fca91ef7f25b27f73585aa3117876a950c7aa09edb7e9c96&w=740' }}
                                w={'$16'}
                                h={'$16'}
                                alt='Image'
                            />
                            <Box>
                                <Text fontFamily="Montserrat-Bold" fontSize={12}  >
                                    {item?.name}
                                </Text>
                                <HStack mt={'$1'} alignItems='center' >
                                    <StarIcon times={5} />
                                    <Text fontFamily="Montserrat-Bold" fontSize={12} ml={'$2'} color={COLORS.fadePrime}  >
                                        {item?.rate}
                                    </Text>
                                </HStack>
                            </Box>
                        </HStack>
                        <Box
                            p={'$2.5'}
                        >
                            <Text fontFamily="Montserrat-SemiBold" fontSize={12} color={'$coolGray500'}
                                lineHeight={20}
                            >
                                {item?.review}
                            </Text>
                        </Box>
                    </Box>
                ))}
            </ScrollView>
        </PrivateContainer>
    )
}

export default UserFeedback

const styles = StyleSheet.create({})