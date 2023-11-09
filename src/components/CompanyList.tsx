// CompanyList.tsx
import React from 'react';
import { FlatList, Button, HStack, Text, Box, useColorModeValue, VStack } from 'native-base';
import { Company } from '../@types/Company';

interface Props {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (companyId: string) => void;
}

export const CompanyList: React.FC<Props> = ({ companies, onEdit, onDelete }) => {
  const bgColor = useColorModeValue('coolGray.100', 'gray.700'); // Ajuste as cores conforme o tema

  const buttonStyle = {
    py: 2,
    px: 4,
    borderRadius: 'md',
  };

  return (
    <FlatList
      data={companies}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Box borderBottomWidth="1" borderColor="coolGray.300" py="2" px="3" bg="coolGray.300">
          <HStack w="full" justifyContent="space-between" alignItems="center" px={2} py={2}>
            <Text
              bg="coolGray.300"
              fontSize="md">{item.email}
            </Text>
            <HStack>
              <Button
                {...buttonStyle} onPress={() => onEdit(item)} bg="emerald.500" size="md" borderRadius="xl">
                Editar
              </Button>
              <Button {...buttonStyle} ml={2} onPress={() => onDelete(item.id)} colorScheme="red" borderRadius="xl">
                Excluir
              </Button>
            </HStack>
          </HStack>

          <Box justifyContent="center">
            <VStack
              fontSize="md"
              alignItems="center">
              <Text
                bg="coolGray.300"
              > Voce esta pronto para Acessar o chat Bot</Text>
            </VStack>
          </Box>
        </Box>
      )}

    />
  );
};
