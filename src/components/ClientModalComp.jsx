import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";

import PropTypes from 'prop-types';

import { ClientDTO } from '../shared/models/client_dto'
import { ClientUsecase } from "../shared/client_usecase";

const UserModalComp = ({ data, setData, dataEdit, isOpen, onClose, usecase }) => {
  UserModalComp.propTypes = {
    data: PropTypes.any,
    setData: PropTypes.func,
    dataEdit: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    usecase: PropTypes.instanceOf(ClientUsecase)
  };

  const [nome, setName] = useState(dataEdit.nome || "");
  const [sobrenome, setLastName] = useState(dataEdit.sobrenome || "");
  const [email, setEmail] = useState(dataEdit.email || "");
  const [salario, setSalary] = useState(dataEdit.salario || "");

  const handleSave = async () => {
    if (!nome || !sobrenome || !email || !salario) {
      return alert("Dados incompletos!");
    }

    if (emailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    }

    var create = dataEdit.nome == undefined &&
      data.sobrenome == undefined &&
      data.email == undefined &&
      data.salario == undefined

    dataEdit.nome = nome
    dataEdit.sobrenome = sobrenome
    dataEdit.email = email
    dataEdit.salario = Number(salario)

    if (create) {
      var result = await usecase.create(dataEdit)
      if (result.httpStatus == 200) {
        dataEdit.id_cliente = result.insertId
        data.push(dataEdit)
      }
    }
    else {
      result = await usecase.update(dataEdit.id_cliente, dataEdit)
      if (result.httpStatus == 200) {
        data[dataEdit.index] = new ClientDTO(dataEdit);
      }
    }

    setData(data)
    onClose();
  };

  const emailAlreadyExists = () => {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item) => item.email === email);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={nome}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Sobrenome</FormLabel>
                <Input
                  type="text"
                  value={sobrenome}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Salario</FormLabel>
                <Input
                  type="number"
                  value={salario}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModalComp;