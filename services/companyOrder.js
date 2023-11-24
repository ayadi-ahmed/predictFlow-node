const { CompanyOrderRepo } = require("../repository");
const ApiError = require("../errors/ApiError");

module.exports = class CompanyOrderService {
    constructor() {
        this.repository = new CompanyOrderRepo();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }
    async findAllByUserId(userId) {
        try {
            return await this.repository.findAllByUserId(userId);
        } catch (error) {
            throw error
        }
    }
    async findOrderNumbersByUserId(userId) {
        try {
            return await this.repository.findOrderNumbersByUserId(userId);
        } catch (error) {
            throw error
        }
    }

    async create(order) {
        if (!order.quantity || order.articles.length === 0) {
            throw new ApiError("Invalid order details", 400)
        }
        return await this.repository.create(order);
    }

    async findById(id) {
        const companyOrder = await this.repository.findById(id);
        if (!companyOrder) {
            throw new ApiError("order with this id not found", 404)
        }
        return companyOrder;
    }
    async deleteById(id) {
        const companyOrder = await this.repository.findById(id);
        if (!companyOrder) {
            throw new ApiError("order with this id not found", 404)
        }
        await this.repository.deleteById(id);
        return "deleted";
    }
    /* 
        async findOrdersBySupplier(supplierId) {
            return await this.repository.findOrdersBySupplier(supplierId);
        }
        async addOrder(supplierId, order) {
            return await this.repository.addOrder(supplierId, order);
        }
        async removeOrder(supplierId, order) {
            return await this.repository.removeOrder(supplierId, order);
        } */
}