const { CustomerOrderModel } = require("../models");


class CustomerOrderRepository {

    async findAll() {
        const customers = await CustomerOrderModel.find({});
        return customers;
    }

    async findById(id) {
        const order = await CustomerOrderModel.findById(id);
        return order;
    }

    async create(order) {
        const new_order = await CustomerOrderModel.create(order);
        return new_order;
    }

    async deleteById(id) {
        return await CustomerOrderModel.deleteOne({ _id: id });
    }
}

module.exports = CustomerOrderRepository;