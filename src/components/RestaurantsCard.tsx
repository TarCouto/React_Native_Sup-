// componente ExerciceCard
import * as React from 'react';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base';


import { Entypo } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {

};

export function RastaurantCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image 
          w={30}
          h={30}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            Como deslbloquear minha conta
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            11/10/2023
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  );
}