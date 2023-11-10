import { Link } from 'react-router-dom';
import { Box, Text, Link as ChakraLink, VStack } from '@chakra-ui/react';

const MenuComp = () => {
  return (
    <Box bg="gray.100" borderRight="1px" borderColor="gray.200" h="100vh" p="4">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Cadastro
      </Text>
      <VStack spacing="2" align="stretch">
        <ChakraLink as={Link} to="/clientes" p="2" rounded="md" _hover={{ bg: 'gray.200' }}>
          Clientes
        </ChakraLink>
        <ChakraLink as={Link} to="/fornecedores" p="2" rounded="md" _hover={{ bg: 'gray.200' }}>
          Fornecedores
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default MenuComp;
