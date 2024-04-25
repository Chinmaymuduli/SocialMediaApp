import React, {useState} from 'react';
import {
  Box,
  FormControl,
  Input,
  InputField,
  InputSlot,
  Pressable,
  SearchIcon,
  Text,
} from '@gluestack-ui/themed';
import {VStack} from '@gluestack-ui/themed';
import {InputIcon} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import CountryPicker from '~/Components/core/CountryPicker';

type Props = {
  selectedCountry: any;
  setSelectedCountry: (selectedCountry: any) => void;
  phoneNumber: any;
  setPhoneNumber: (phone: string) => void;
};
const PhoneLogin = ({
  selectedCountry,
  setSelectedCountry,
  phoneNumber,
  setPhoneNumber,
}: Props) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  return (
    <Box mt={'$7'}>
      <VStack gap={'$2'}>
        <Text fontSize={15} fontFamily={'Montserrat-Medium'}>
          Phone Number
        </Text>
        <FormControl isRequired mt={1}>
          <Input>
            <InputSlot pl="$3">
              <Pressable
                // p="$1"
                flexDirection={'row'}
                onPress={() => setShowCountryPicker(true)}>
                <Image
                  source={{
                    uri: `https://flagcdn.com/w40/${selectedCountry.code.toLocaleLowerCase()}.png`,
                  }}
                  alt="India"
                  w={'$6'}
                  h={'$5'}
                  mx="$1"
                  key="$1"
                />
                <Text pl={'$1'}>+{selectedCountry.phone}</Text>
              </Pressable>
            </InputSlot>
            <Box h={'$full'} w={'$0.5'} bgColor="$coolGray300" ml={'$3'}></Box>
            <InputField
              type="text"
              value={phoneNumber}
              onChangeText={txt => setPhoneNumber(txt)}
            />
          </Input>
        </FormControl>
      </VStack>
      <CountryPicker
        onClose={() => setShowCountryPicker(false)}
        onSelect={country => {
          setSelectedCountry(country);
          setShowCountryPicker(false);
        }}
        visible={showCountryPicker}
      />
    </Box>
  );
};

export default PhoneLogin;
