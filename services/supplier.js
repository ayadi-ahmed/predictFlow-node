const { SupplierRepo, CompanyOrderRepo } = require("../repository");
const ApiError = require("../errors/ApiError");

module.exports = class SupplierService {
    constructor() {
        this.repository = new SupplierRepo();
        this.companyOrderRepo = new CompanyOrderRepo();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }

    async create(supplier) {
        if (!supplier.name || !supplier.email) {
            throw new ApiError("Invalid supplier details", 400)
        }
        const new_supplier = await this.repository.create(supplier);
        return new_supplier;
    }

    async findById(id) {
        const supplier = await this.repository.findById(id);
        if (!supplier) {
            throw new ApiError("supplier with this id not found", 404)
        }
        return supplier;
    }
    async deleteById(id) {
        const supplier = await this.repository.findById(id);
        if (!supplier) {
            throw new ApiError("supplier with this id not found", 404)
        }
        await this.repository.deleteById(id);
        return "deleted";
    }

    async findOrdersBySupplier(supplierId) {
        return await this.repository.findOrdersBySupplier(supplierId);
    }

    async addOrder(supplierId, order) {
        const saved_order = await this.companyOrderRepo.create(order);
        return await this.repository.addOrder(supplierId, saved_order);
    }

    async removeOrder(supplierId, order) {
        await this.companyOrderRepo.deleteById(order._id);
        return await this.repository.removeOrder(supplierId, order);
    }
}