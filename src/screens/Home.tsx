// Home.tsx
import React, { useState } from 'react';
import { VStack, FlatList, Text, Heading, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '@components/HomeHeader';
// Ajuste o caminho do import conforme necessário
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { CompaniesManager } from '@components/CompaniesManager';

export function Home() {
  // Estado para os grupos de restaurantes
  const [groups, setGroups] = useState(['Comercios', 'Padaria', 'Restaurantes']);

  // Estado para os alimentos (esta parte do estado parece estar relacionada a exercícios, então talvez seja uma mistura de contextos)
 

  // Hook de navegação do React Navigation
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  // Função para lidar com a navegação (aparentemente para detalhes de alimentos/exercícios, mas isso depende do seu fluxo de aplicativo)
  function handleOpenFoodDetails() {
    navigation.navigate('exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <Text color="gray.200" fontSize="md" fontFamily="heading" ml={'10'} mb={0} mt={6} px={2}>
        Adcione seu Cadastro da sua empresa
      </Text>
      <CompaniesManager />
    </VStack>
  );
}
