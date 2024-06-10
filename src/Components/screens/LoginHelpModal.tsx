import React, { useState } from 'react';
import {
    Button,
    ButtonText,
    Center,
    CloseIcon,
    Icon,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalFooter,
    VStack,
    FormControl,
    Input,
    Text, Textarea, TextareaInput,
    InputField
} from '@gluestack-ui/themed';
import { ModalContent } from '@gluestack-ui/themed';
import { ModalHeader } from '@gluestack-ui/themed';
import { Heading } from '@gluestack-ui/themed';
import { ModalCloseButton } from '@gluestack-ui/themed';
import { WIDTH } from '~/Utils';

const LoginHelpModal = ({ showModal, setShowModal }: any) => {
    const ref = React.useRef(null);
    return (
        <Center>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(!showModal);
                }}
                finalFocusRef={ref}>
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="lg">Raise a Complain</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <VStack gap={'$2'}>
                            <Text fontSize={15} fontFamily={'Montserrat-Medium'}>
                                Email
                            </Text>
                            <FormControl isRequired mt={1}>
                                <Input alignItems="center">
                                    <InputField
                                        type="text"
                                    // value={email}
                                    // onChangeText={txt => setEmail(txt)}
                                    />
                                </Input>
                            </FormControl>
                        </VStack>
                        <VStack gap={'$2'}>
                            <Text fontSize={15} fontFamily={'Montserrat-Medium'}>
                                Title
                            </Text>
                            <FormControl isRequired mt={1}>
                                <Input alignItems="center">
                                    <InputField
                                        type="text"
                                    // value={email}
                                    // onChangeText={txt => setEmail(txt)}
                                    />
                                </Input>
                            </FormControl>
                        </VStack>
                        <VStack gap={'$2'}>
                            <Text fontSize={15} fontFamily={'Montserrat-Medium'}>
                                Description
                            </Text>
                            <FormControl isRequired mt={1}>
                                <Textarea
                                    size="md"
                                    isReadOnly={false}
                                    isInvalid={false}
                                    isDisabled={false}
                                    w={WIDTH / 1.4}
                                >
                                    <TextareaInput placeholder="Your text goes here..." />
                                </Textarea>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            action="secondary"
                            mr="$3"
                            onPress={() => {
                                setShowModal(false);
                            }}>
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            size="sm"
                            action="positive"
                            borderWidth="$0"
                            onPress={() => {
                                setShowModal(false);
                            }}>
                            <ButtonText>Submit</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
};

export default LoginHelpModal;