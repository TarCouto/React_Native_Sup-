import React from 'react';

import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

import LogoSvg from '@assets/logo(2).svg';
import BackgroundImg from '@assets/BAckGrounGalax.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from 'react';



import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormData = {
    email: string;
    password: string;
}

export function SignIn() {

    const { signIn } = useAuth();

    const toas = useToast();

    const [isLoading, setIsLoading] = useState(false)
    
    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    async function handleSignIn({ email, password }: FormData){
        try {
            setIsLoading(true);
            await signIn(email, password);
          } catch (error) {
            const isAppError = error instanceof AppError;
      
            const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
      
            toas.show({
              title,
              placement: 'top',
              bgColor: 'red.500'
            })
            setIsLoading(false);
          }
      }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />
                <Center my={24}>
                    <LogoSvg />
                    <Text color="gray.100" fontSize='sm'> Alimentando conexões, fortalecendo vidas.</ Text>
                </Center>
                <Center>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Acesse a conta
                    </Heading>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: 'Informe o e-mail' }}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'Informe a senha' }}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                     <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading}/>
                </Center>
                <Center mt={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>
                </Center>
                <Button
                    title="Criar Conta"
                    variant="solid"
                    onPress={handleNewAccount}
                />
            </VStack>
        </ScrollView>
    );
}