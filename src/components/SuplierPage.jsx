import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import {
  Box,
  Text,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import SuplierModalComp from "./SuplierModalComp";

import { SuplierUsecase } from "./../shared/suplier_usecase";

const clientUsecase = new SuplierUsecase('http://localhost:4444')

const SuplierPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    async function fetchData() {
      const db_costumer = await clientUsecase.index();
      setData(db_costumer);
    }

    fetchData()

  }, [setData]);

  const handleRemove = async (id_fornecedor) => {
    var result = await clientUsecase.delete(id_fornecedor)
    if(result.httpStatus == 200) {
      const newArray = data.filter((item) => item.id_fornecedor !== id_fornecedor);
      setData(newArray);
    }
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Cadastro de Fornecedores
        </Text>

        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Novo Cadastro
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Razão Social
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  CPF/CNPJ
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ razao, cpf_cnpj, contato, logradouro, cidade, uf, id_fornecedor }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{razao}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{cpf_cnpj}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ razao, cpf_cnpj, contato, logradouro, cidade, uf, index, id_fornecedor }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(id_fornecedor)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <SuplierModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          usecase={clientUsecase}
        />
      )}
    </Flex>
  );
};

export default SuplierPage;