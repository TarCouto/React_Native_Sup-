import React from 'react';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Group } from '@components/GrupRestaurants';
import { HomeHeader } from '@components/HomeHeader';
import { FlatList, Heading, HStack, Text, VStack } from 'native-base';
import { RastaurantCard } from '@components/RestaurantsCard';
import { AppNavigatorRoutesProps } from '@routes/app.routes';



export function Home() {

  const [groups, setGroups] = useState(['Comercios', 'Padaria', 'Rstaurantes']);
  const [foods, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terras']);
  const [groupSelected, setGroupSelected] = useState('Costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenFoodDetails() {
    navigation.navigate('exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <HStack>
        <FlatList
          data={groups}
          renderItem={({ item }) => <Text>{item}</Text>}
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            px: 8,
          }}
          my={10}
          maxH={10}
          minH={10}
        />
      </HStack>
      <VStack px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Historico do Chat
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {foods.length}
          </Text>
        </HStack>
        <FlatList
          data={foods}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <RastaurantCard onPress={handleOpenFoodDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20
          }}
        />
      </VStack>
    </VStack>
  );
}