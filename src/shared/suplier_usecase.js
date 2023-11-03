import { AppRepository } from "./app_repository";
import { SuplierDTO } from "./models/suplier_dto";
import { ResultDTO } from "./models/result_dto";

export class SuplierUsecase {
    constructor(apiBaseUrl) {
        this.repository = new AppRepository(apiBaseUrl + '/fornecedor')
    }

    async create(suplier) {
        const result = await this.repository.create(suplier)
        return new ResultDTO(result.data, result.status)
    }

    async get(suplierId) {
        const result = await this.repository.get(suplierId)
        return new ResultDTO(result.data, result.status)
    }

    async index() {
        const result = await this.repository.index()
        if(result.status == 200) {
            var suplierList = [new SuplierDTO()]
            suplierList.pop()
            result.data.forEach(suplier => {
                suplierList.push(new SuplierDTO(suplier))
            });
            return suplierList
        } else {
            return null;
        }
    }

    async update(suplierId, suplier) {
        const result = await this.repository.update(suplierId, suplier)
        return new ResultDTO(result.data, result.status)
    }

    async delete(suplierId) {
        const result = await this.repository.delete(suplierId)
        return new ResultDTO(result.data, result.status)
    }
}