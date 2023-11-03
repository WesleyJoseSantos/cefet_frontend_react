export class SuplierDTO {
    constructor(obj) {
        if(obj == null) return
        this.id_fornecedor = obj.id_fornecedor
        this.razao = obj.razao,
        this.cpf_cnpj = obj.cpf_cnpj
        this.contato = obj.contato
        this.logradouro = obj.logradouro
        this.cidade = obj.cidade
        this.uf = obj.uf
    }
}