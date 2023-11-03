import axios from "axios"

export class AppRepository {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl
    }

    async create(item) {
        const response = await axios.post(`${this.apiBaseUrl}`, item)
        return response
    }

    async get(itemId) {
        const response = await axios.get(`${this.apiBaseUrl}/${itemId}`)
        return response
    }

    async index() {
        const response = await axios.get(`${this.apiBaseUrl}`)
        return response
    }

    async update(itemId, item) {
        const response = await axios.patch(`${this.apiBaseUrl}/${itemId}`, item)
        return response
    }

    async delete(itemId) {
        const response = await axios.delete(`${this.apiBaseUrl}/${itemId}`)
        return response
    }
}