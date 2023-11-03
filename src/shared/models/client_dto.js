export class ClientDTO {
    constructor(obj) {
        if(obj == null) return
        this.id_cliente = obj.id_cliente
        this.nome = obj.nome,
        this.sobrenome = obj.sobrenome
        this.email = obj.email
        this.salario = obj.salario
    }
}