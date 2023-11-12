import * as yup from 'yup';
import { useContext, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "@services/api";

import LogoSvg from '@assets/SUP!.svg';
import BackgroundImg from '@assets/BAckGrounGalax.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';
import React from 'react';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AuthContext } from '@contexts/AuthContexts';



type FormDataProps = {
  nome: string;
  email: string;
  senha: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  nome: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  senha: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup.string()
    .required('Confirme sua senha.'),
});

export function SignUp() {

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const { signIn } = useContext(AuthContext);

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });


  function handleGoBack() {
    navigation.goBack();
  }


  async function handleSignUp({ nome, email, senha, password_confirm }: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post('/api/usuarios/registrar', { nome, email, senha });
      await signIn(email, senha);
      console.log("Registro e login realizados com sucesso.");
    } catch (error) {
      console.log("Erro no handleSignUp:", error);
      setIsLoading(false);
      let message = 'Não foi possível criar a conta. Tente novamente mais tarde.';
      if (error instanceof AppError) {
        if (error.message.includes('403')) {
          message = 'Cadastro não autorizado. Verifique se já possui cadastro ou entre em contato com o suporte.';
        } else {
          message = error.message;
        }
      }
    }
  }


  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function handleSignUpFake({ nome, email, senha, password_confirm }: FormDataProps) {
    try {
      setIsLoading(true);

      // Código omitido para brevidade: O registro do usuário é feito aqui.

      // Se o registro for bem-sucedido, a função signIn atualiza o estado do usuário
      // Assumindo que signIn atualiza o estado global do usuário corretamente

      // Navegação para a tela principal do AppRoutes
      navigation.navigate('home'); // 'home' deve ser o nome da rota definida nas rotas do AppRoutes

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(true);
    }
  }

  function goToHome() {
    navigation.navigate('home');
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
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.nome?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="senha"
            rules={{
              required: 'Informe sua senha'
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.senha?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(goToHome)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="solid"
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}