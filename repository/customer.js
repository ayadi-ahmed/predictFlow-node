const ApiError = require("../errors/ApiError");
const { CustomerModel } = require("../models");


class CustomerRepository {

    async findAll() {
        const customers = await CustomerModel.find({});
        return customers;
    }

    async findByCompanyId(id) {
        return await CustomerModel.find({ companyId: id });
    }
    async findCustomersNumberByCompanyId(id) {
        return (await CustomerModel.find({ companyId: id })).length;
    }

    async findById(id) {
        const customer = await CustomerModel.findById(id);
        return customer;
    }

    async create(customer) {
        const new_customer = await CustomerModel.create(customer);
        return new_customer;
    }

    async deleteById(id) {
        return await CustomerModel.deleteOne({ _id: id });
    }

    async getOrders(customerId) {
        const customer = await CustomerModel.findById(customerId).populate("orders");
        if (!customer) {
            throw new ApiError("Customer with this id not found");
        }
        return customer.orders;
    }
}

module.exports = CustomerRepository;