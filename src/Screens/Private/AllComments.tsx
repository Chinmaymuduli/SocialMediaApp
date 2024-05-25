import React, {useState} from 'react';
import {PrivateContainer} from '~/Components/container';
import {
  Box,
  ButtonText,
  Divider,
  FlatList,
  HStack,
  Image,
  Input,
  InputSlot,
  Pressable,
  Spinner,
  VStack,
} from '@gluestack-ui/themed';
import {IMAGES} from '~/Assets';
import {Button} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {useMutation, useSwrApi} from '~/Hooks';
import FetchLoader from '~/Components/core/FetchLoader';
import {useNavigation} from '@react-navigation/native';
import {PrivateRoutesTypes, PrivateScreenProps} from '~/Routes/Private/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InputIcon} from '@gluestack-ui/themed';
import {InputField} from '@gluestack-ui/themed';
import {COLORS} from '~/Styles';
import AppIcon from '~/Components/core/AppIcon';
import CommonCompo from './CommentCompo';
type Props = NativeStackScreenProps<PrivateRoutesTypes, 'AllComments'>;
const AllComments = ({route: {params}}: Props) => {
  const [comment, setComments] = useState('');
  const {data, isValidating, mutate} = useSwrApi(
    `posts/read-all-comments?post_id=${params?.post_id}&require_all=true`,
  );
  const {mutation, isLoading} = useMutation();
  const addComment = async () => {
    try {
      const res = await mutation(`posts/comments/add`, {
        method: 'POST',
        body: {
          post_id: params?.post_id,
          message: comment,
        },
      });
      if (res?.status === 202) {
        setComments('');
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateContainer title="All Comments" bg={'purple.50'} hasBackIcon={true}>
      <Box flex={1} mt={'$3'}>
        <FlatList
          data={data?.data?.data}
          contentContainerStyle={{paddingBottom: 50}}
          renderItem={({item}: any) => (
            <CommonCompo item={item} mutate={mutate} />
          )}
          ListEmptyComponent={
            <Box alignItems="center" mt={'$10'}>
              <VStack alignItems="center" gap={10}>
                <Image
                  source={IMAGES.CONNECT_BG_REMOVE}
                  alt="img"
                  style={{width: 200, height: 200}}
                />
                <Text fontFamily="Montserrat-SemiBold">No Message found</Text>
              </VStack>
            </Box>
          }
        />
      </Box>
      <HStack px={'$3'} gap={'$2'} py={'$2'}>
        <Input borderRadius={'$lg'} flex={1}>
          <InputField
            type="text"
            placeholder="Write a comments..."
            value={comment}
            onChangeText={txt => setComments(txt)}
          />
        </Input>
        <Button
          bgColor={isLoading ? '$coolGray500' : COLORS.secondary}
          borderRadius={8}
          gap={'$1'}
          isDisabled={isLoading}>
          <ButtonText
            color="$white"
            fontFamily={'Montserrat-Bold'}
            onPress={addComment}>
            Send
          </ButtonText>
        </Button>
      </HStack>
    </PrivateContainer>
  );
};

export default AllComments;
