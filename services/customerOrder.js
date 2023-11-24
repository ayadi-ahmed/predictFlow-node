const { CustomerOrderRepo } = require("../repository");
const ApiError = require("../errors/ApiError");

class CustomerOrderService {
    constructor() {
        this.repository = new CustomerOrderRepo();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }

    async create(order) {
        if (!order.items) {
            throw new ApiError("order items cannot be empty", 400)
        }
        let total = 0;
        order.items.forEach(item => {
            total += item.article.price * item.quantity
        });
        order.total = total;
        const new_order = await this.repository.create(order);
        return new_order;
    }

    async findById(id) {
        const order = await this.repository.findById(id);
        if (!order) {
            throw new ApiError("Order with this id not found", 404)
        }
        return order;
    }

    async deleteById(id) {
        const order = await this.repository.findById(id);
        if (!order) {
            throw new ApiError("Order with this id not found", 404)
        }

        await this.repository.deleteById(id);
        return "order deleted";
    }

    /* async addOrder(clientId, order) {
        const client = await this.repository.findById(clientId);
        if (!client) {
            throw new ApiError("Client with this id not found", 404)
        }

        client.orders.push(order);
        const updatedClient = await client.save();
        return updatedClient;
    } */
}

module.exports = CustomerOrderService;