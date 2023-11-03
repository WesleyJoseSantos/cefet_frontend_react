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

import { SuplierDTO } from "../shared/models/suplier_dto";
import { SuplierUsecase } from "../shared/suplier_usecase";

const SuplierModalComp = ({ data, setData, dataEdit, isOpen, onClose, usecase }) => {
  SuplierModalComp.propTypes = {
    data: PropTypes.any,
    setData: PropTypes.func,
    dataEdit: PropTypes.func,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    usecase: PropTypes.instanceOf(SuplierUsecase)
  };

  const [razao, setName] = useState(dataEdit.razao || "");
  const [cpf_cnpj, setCpfCnpj] = useState(dataEdit.cpf_cnpj || "");
  const [contato, setContact] = useState(dataEdit.contato || "");
  const [logradouro, setPlace] = useState(dataEdit.logradouro || "");
  const [cidade, setCity] = useState(dataEdit.cidade || "")
  const [uf, setUf] = useState(dataEdit.uf || "")

  const handleSave = async () => {
    if (!razao || !cpf_cnpj || !contato || !logradouro || !cidade || !uf) {
      return alert("Dados incompletos!");
    }

    if (suplierAlreadyExists()) {
      return alert("Fornecedor já cadastrado!");
    }

    var create = dataEdit.razao == undefined &&
      data.cpf_cnpj == undefined &&
      data.contato == undefined &&
      data.logradouro == undefined &&
      data.cidade == undefined &&
      data.uf == undefined

    dataEdit.razao = razao
    dataEdit.cpf_cnpj = cpf_cnpj
    dataEdit.contato = contato
    dataEdit.logradouro = logradouro
    dataEdit.cidade = cidade
    dataEdit.uf = uf

    if (create) {
      var result = await usecase.create(dataEdit)
      if (result.httpStatus == 200) {
        dataEdit.id_fornecedor = result.insertId
        data.push(dataEdit)
      }
    }
    else {
      result = await usecase.update(dataEdit.id_fornecedor, dataEdit)
      if (result.httpStatus == 200) {
        data[dataEdit.index] = new SuplierDTO(dataEdit);
      }
    }

    setData(data)
    onClose();
  };

  const suplierAlreadyExists = () => {
    if (dataEdit.cpf_cnpj !== cpf_cnpj && data?.length) {
      return data.find((item) => item.cpf_cnpj === cpf_cnpj);
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
                <FormLabel>Razão Social</FormLabel>
                <Input
                  type="text"
                  value={razao}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>CPF ou CNPJ</FormLabel>
                <Input
                  type="text"
                  value={cpf_cnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Contato</FormLabel>
                <Input
                  type="text"
                  value={contato}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Logradouro</FormLabel>
                <Input
                  type="text"
                  value={logradouro}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Cidade</FormLabel>
                <Input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Estado</FormLabel>
                <Input
                  type="text"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
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

export default SuplierModalComp;