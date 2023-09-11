// componente ExerciceCard

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
          source={{ uri: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80' }}
          alt="Imagem do lugar"
          w={30}
          h={30}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            Padaria Nove de Setembro
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            120 salgados disponiveis
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