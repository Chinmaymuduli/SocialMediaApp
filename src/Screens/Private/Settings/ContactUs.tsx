import {Alert, Linking} from 'react-native';
import React from 'react';
import {
  Box,
  Input,
  HStack,
  ScrollView,
  Text,
  VStack,
  Textarea,
  InputField,
} from '@gluestack-ui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from '~/Components/core';
import {TextareaInput} from '@gluestack-ui/themed';
import {PrivateContainer} from '~/Components/container';
import {useMutation} from '~/Hooks';

const ContactUs = () => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const {mutation, isLoading} = useMutation();
  const handleSubmit = async () => {
    try {
      const res = await mutation(`contacts`, {
        method: 'POST',
        body: {
          name,
          phone,
          message,
        },
      });
      if (res?.results?.success === true) {
        setName('');
        setPhone('');
        setMessage('');
        Alert.alert('Success', 'Your message has been sent successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateContainer title="Contact Us" bg={'purple.50'} hasBackIcon={true}>
      <ScrollView>
        <Box py={'$5'} px={'$3'}>
          <VStack mt={'$2'} gap={'$5'}>
            <VStack gap={'$2'}>
              <Text fontFamily="Montserrat-Medium" fontSize={13}>
                Name *
              </Text>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Name"
                  fontSize={12}
                  value={name}
                  onChangeText={txt => setName(txt)}
                />
              </Input>
            </VStack>
            <VStack gap={'$2'}>
              <Text fontFamily="Montserrat-Medium" fontSize={13}>
                Phone Number *
              </Text>
              <Input
                flex={1}
                variant="outline"
                size="md"
                isDisabled={false}
                alignItems="center"
                borderColor="$coolGray300"
                isInvalid={false}
                isReadOnly={false}>
                <InputField
                  placeholder="Enter Phone"
                  fontSize={12}
                  value={phone}
                  onChangeText={txt => setPhone(txt)}
                  keyboardType="phone-pad"
                />
              </Input>
            </VStack>
            <VStack gap={'$2'}>
              <Text fontFamily="Montserrat-Medium" fontSize={13}>
                Message *
              </Text>
              <Textarea
                w={'$full'}
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}>
                <TextareaInput
                  placeholder="Enter Message..."
                  fontSize={12}
                  value={message}
                  onChangeText={txt => setMessage(txt)}
                />
              </Textarea>
            </VStack>
          </VStack>
        </Box>
        <Box mt={'$4'} mb={'$4'}>
          <Button
            isLoading={isLoading}
            isDisabled={!name || !phone || !message}
            borderRadius={5}
            btnWidth={'full'}
            mx={'$4'}
            py={'$2'}
            onPress={() => handleSubmit()}>
            <Text color="$white" fontFamily="Montserrat-Bold" fontSize={13}>
              Contact Us
            </Text>
          </Button>
        </Box>

        {/* <VStack gap={'$2'} px={'$3'}>
          <Text bold fontSize={17}>
            Keep in touch
          </Text>
          <HStack gap={'$5'}>
            <Entypo
              name="facebook-with-circle"
              size={30}
              color={'blue'}
              onPress={() =>
                Linking.openURL('https://m.facebook.com/simatex.net')
              }
            />
            <Entypo
              name="twitter"
              size={30}
              color={'#1DA1F2'}
              onPress={() => Linking.openURL('https://facebook.com')}
            />
            <FontAwesome
              name="telegram"
              size={30}
              color={'#24A1DD'}
              onPress={() => Linking.openURL('https://t.me/simatex_Russia')}
            />
            <FontAwesome
              name="whatsapp"
              size={30}
              color={'#25D366'}
              onPress={() => Linking.openURL('https://facebook.com')}
            />
            <FontAwesome
              name="youtube-play"
              size={30}
              color={'red'}
              onPress={() =>
                Linking.openURL('https://youtube.com/@simatexstudyinrussia1229')
              }
            />
            <FontAwesome
              name="instagram"
              size={30}
              color={'#F76B3F'}
              onPress={() =>
                Linking.openURL('https://www.instagram.com/simatexrussia/')
              }
            />
          </HStack>
        </VStack> */}
      </ScrollView>
    </PrivateContainer>
  );
};

export default ContactUs;
