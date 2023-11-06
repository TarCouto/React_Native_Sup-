// CompanyRegistrationForm.tsx
import React, { useState } from 'react';
import { Button, Center, FormControl, Input, VStack } from 'native-base';
import { api } from '../services/api'; // Ajuste o caminho do import conforme necessário

interface FormData {
  email: string;
  cnpj: string;
  role: string;
}

export function CompanyRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    cnpj: '',
    role: ''
  });

  function handleInputChange(value: string, name: keyof FormData) {
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit() {
    try {
      // Substitua 'seu-endpoint-cadastro' pelo endpoint específico da sua API
       const response = await api.post('/seu-endpoint-cadastro', formData);
      // console.log(response.data);
      console.log('Dados do formulário:', formData);
      // Implemente a lógica pós-resposta, como limpar o formulário ou exibir uma mensagem
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      // Implemente o manejo de erros, como exibir uma mensagem para o usuário
    }
  }

  return (
    <Center w="100%">
      <VStack space={4} w="90%" mt={4}>
        <FormControl>
          <FormControl.Label>E-mail Corporativo</FormControl.Label>
          <Input
            placeholder="Digite o e-mail corporativo"
            value={formData.email}
            onChangeText={(text) => handleInputChange(text, 'email')}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>CNPJ</FormControl.Label>
          <Input
            placeholder="Digite o CNPJ da empresa"
            value={formData.cnpj}
            onChangeText={(text) => handleInputChange(text, 'cnpj')}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Cargo</FormControl.Label>
          <Input
            placeholder="Digite o cargo que exerce"
            value={formData.role}
            onChangeText={(text) => handleInputChange(text, 'role')}
          />
        </FormControl>
        <Button mt={5} onPress={handleSubmit}>
          Cadastrar Empresa
        </Button>
      </VStack>
    </Center>
  );
}
