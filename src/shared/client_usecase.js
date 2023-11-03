import { AppRepository } from "./app_repository";
import { ClientDTO } from "./models/client_dto";
import { ResultDTO } from "./models/result_dto";

export class ClientUsecase {
    constructor(apiBaseUrl) {
        this.repository = new AppRepository(apiBaseUrl + '/cliente')
    }

    async create(client) {
        const result = await this.repository.create(client)
        return new ResultDTO(result.data, result.status)
    }

    async get(clientId) {
        const result = await this.repository.get(clientId)
        return new ResultDTO(result.data, result.status)
    }

    async index() {
        const result = await this.repository.index()
        if(result.status == 200) {
            var clientList = [new ClientDTO()]
            clientList.pop()
            result.data.forEach(client => {
                clientList.push(new ClientDTO(client))
            });
            return clientList
        } else {
            return null;
        }
    }

    async update(clientId, client) {
        const result = await this.repository.update(clientId, client)
        return new ResultDTO(result.data, result.status)
    }

    async delete(clientId) {
        const result = await this.repository.delete(clientId)
        return new ResultDTO(result.data, result.status)
    }
}