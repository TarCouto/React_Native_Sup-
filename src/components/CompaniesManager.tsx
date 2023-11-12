import React, { useState, useEffect } from 'react';
import { Button, Center, VStack } from 'native-base';
import { Company } from '../@types/Company';
import { CompanyList } from './CompanyList';
import { CompanyRegistrationForm } from '../components/CompanyRegistrationForm';
import { api } from '../services/api';

export const CompaniesManager: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined); //
  const [isEditMode, setIsEditMode] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  
  const loadCompanies = async () => {
    try {
      const response = await api.get('/empresas');
      // Certifique-se de acessar o array de empresas corretamente
      setCompanies(response.data._embedded.empresas);
    } catch (error) {
      console.error('Erro ao carregar as empresas:', error);
    }
  };

  const handleAddCompany = (newCompany: Company) => {
    // Use um método mais robusto para gerar um ID, se necessário
    const newId = Math.random().toString();
    // Agora você está atualizando um array, não um objeto
    setCompanies((currentCompanies) => [...currentCompanies, { ...newCompany, id: newId }]);
  };

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsEditMode(true);
  };

  const handleDelete = async (companyId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      try {
        await api.delete(`/empresas/${companyId}`);
        setCompanies(companies.filter((company) => company.id !== companyId));
      } catch (error) {
        console.error('Erro ao excluir a empresa:', error);
      }
    }
  };

  const refreshCompanies = async () => {
    await loadCompanies(); // Simplesmente chama loadCompanies para recarregar a lista
  };

  const handleAddNew = () => {
    setSelectedCompany({ id: '', email: '', cnpj: '', role: '' }); // Definir um objeto de empresa vazio
    setIsEditMode(true);
  };

  return (
    <VStack space={4} mt="4">
      {!isEditMode ? (
        // Renderiza o botão "Adicionar Empresa" apenas se não estiver no modo de edição
        <Button
          size="md"
          px="1"
          py="3"
          width="50%"
          ml={'24'}
          mr={'24'}
          bg="emerald.500"
          borderRadius="xl"
          onPress={handleAddNew}>Pagina de Cadastro</Button>
      ) : null}
      {isEditMode ? (
        // Passa o selectedCompany para o formulário e as funções de controle de estado
        <CompanyRegistrationForm
          company={selectedCompany}
          setIsEditMode={setIsEditMode}
          refreshCompanies={refreshCompanies}
          handleAddCompany={handleAddCompany}
        />
      ) : (
        // Renderiza a lista de empresas
        <CompanyList
          companies={companies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </VStack>
  );
};

