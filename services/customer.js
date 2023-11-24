const { CustomerRepo } = require("../repository");
const ApiError = require("../errors/ApiError");
const CustomerOrderService = require("./customerOrder");

module.exports = class CustomerService {
    constructor() {
        this.repository = new CustomerRepo();
        this.customerOrderService = new CustomerOrderService();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }

    async findClientsByCompanyId(companyId) {
        try {
            return await this.repository.findByCompanyId(companyId)
        } catch (error) {
            throw error
        }
    }
    async findCustomersNumberByCompanyId(companyId) {
        try {
            return await this.repository.findCustomersNumberByCompanyId(companyId)
        } catch (error) {
            throw error
        }
    }

    async create(client) {
        if (!client.name || !client.email || !client.password) {
            throw new ApiError("Invalid client details", 400)
        }
        if (!client.companyId) {
            throw new ApiError("Company id is required")
        }
        const new_client = await this.repository.create(client);
        return new_client;
    }

    async findById(id) {
        const client = await this.repository.findById(id);
        if (!client) {
            throw new ApiError("Client with this id not found", 404)
        }
        return client;
    }

    async deleteById(id) {
        const client = await this.repository.findById(id);
        if (!client) {
            throw new ApiError("Client with this id not found", 404)
        }

        await this.repository.deleteById(id);
        return "client deleted";
    }

    async addOrder(customerId, order) {
        const customer = await this.repository.findById(customerId);
        if (!customer) {
            throw new ApiError("Customer with this id not found", 404)
        }
        const new_order = await this.customerOrderService.create(order);
        customer.orders.push(new_order);
        await customer.save();
        return new_order;
    }

    async getOrders(customerId) {
        const orders = await this.repository.getOrders(customerId);
        return orders;
    }
}