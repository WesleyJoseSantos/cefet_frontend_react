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

import ClientModalComp from "./ClientModalComp";

import { ClientUsecase } from "./../shared/client_usecase";

const clientUsecase = new ClientUsecase('http://localhost:4444')

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
          Cadastro de Clientes
        </Text>

        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Novo Cadastro
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Email
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ nome, sobrenome, email, salario, id_cliente }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{nome}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ nome, sobrenome, email, salario, index, id_cliente }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(id_cliente)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ClientModalComp
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