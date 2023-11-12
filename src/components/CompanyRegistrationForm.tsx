import React, { useState, useEffect } from 'react';
import { Button, Center, FormControl, Input, VStack, WarningOutlineIcon } from 'native-base';
import { Company } from '../@types/Company';
import { api } from '../services/api'; // Ajuste o caminho conforme necessário

interface Props {
  company?: Company; // A empresa para editar, se estiver presente
  setIsEditMode: (isEditMode: boolean) => void;
  refreshCompanies: () => void; // Função para atualizar a lista de empresas após a submissão
  handleAddCompany: (newCompany: Company) => void;
}

export const CompanyRegistrationForm: React.FC<Props> = ({ company, setIsEditMode, refreshCompanies, handleAddCompany, }) => {
  // Estado inicial do formulário
  const [formData, setFormData] = useState<Company>({
    id: company?.id || '',
    email: company?.email || '',
    cnpj: company?.cnpj || '',
    role: company?.role || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualiza o estado do formulário quando uma empresa para edição é recebida
  useEffect(() => {
    if (company) {
      setFormData({
        id: company.id,
        email: company.email,
        cnpj: company.cnpj,
        role: company.role,
      });
    }
  }, [company]);

  // Lida com a submissão do formulário
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (company) {
        // Se tivermos uma empresa, atualize-a
        await api.put(`/empresas/${company.id}`, formData);
      } else {
        // Se não, crie uma nova empresa
        await api.post('/empresas', formData);
      }
      // Atualize a lista de empresas e saia do modo de edição
      refreshCompanies();
      setIsEditMode(false);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitWithNoAPI = async () => {
    setIsSubmitting(true);
    try {
      // Chamada de função para adicionar a nova empresa ao estado
      handleAddCompany({ ...formData, id: Date.now().toString() }); // Use Date.now() como um ID temporário
      setIsEditMode(false); // Sair do modo de edição
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Lida com a mudança de entrada do formulário
  const handleInputChange = (name: keyof Company, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Center w="100%" justifyContent="center">
      <VStack space={4} w="100%" mt={4} alignItems="center">
        <FormControl isRequired w="75%">
          <FormControl.Label
            _text={{
              color: 'white', 
              fontSize: 'md', 
              fontWeight: 'bold', 
            }}
          >E-mail Corporativo</FormControl.Label>
          <Input
            color="white"
            bg="gray.500"
            placeholder="Digite o e-mail corporativo"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
        </FormControl>

        <FormControl isRequired w="75%">
          <FormControl.Label
            _text={{
              color: 'white', 
              fontSize: 'md', 
              fontWeight: 'bold', 
            }}

          >CNPJ</FormControl.Label>
          <Input
            color="white"
            bg="gray.500"
            placeholder="Digite o CNPJ da empresa"
            value={formData.cnpj}
            onChangeText={(value) => handleInputChange('cnpj', value)}
          />
        </FormControl>

        <FormControl isRequired w="75%">
          <FormControl.Label
            _text={{
              color: 'white', 
              fontSize: 'md', 
              fontWeight: 'bold', 
            }}
          >Cargo</FormControl.Label>
          <Input
            color="white"
            bg="gray.500"
            placeholder="Digite o cargo"
            value={formData.role}
            onChangeText={(value) => handleInputChange('role', value)}
          />
        </FormControl>

        <Button
          mt={5}
          colorScheme="blue"
          onPress={handleSubmitWithNoAPI}
          isDisabled={isSubmitting}
          bg="emerald.500"
          borderRadius="xl"
          width="50%"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Empresa'}
        </Button>
      </VStack>
    </Center>
  );
};
function handleAddCompany(formData: Company) {
  throw new Error('Function not implemented.');
}

