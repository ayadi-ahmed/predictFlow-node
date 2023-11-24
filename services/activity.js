const { ActivityRepo } = require("../repository");
const ApiError = require("../errors/ApiError");

module.exports = class ActivityService {
    constructor() {
        this.repository = new ActivityRepo();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }

    async create(activity) {
        if (!activity.name) {
            throw new ApiError("Invalid activity", 400)
        }
        const new_activity = await this.repository.create(activity);
        return new_activity;
    }

    async findById(id) {
        const activity = await this.repository.findById(id);
        if (!activity) {
            throw new ApiError("Activity with this id not found", 404)
        }
        return activity;
    }

    async deleteById(id) {
        const activity = await this.repository.findById(id);
        if (!activity) {
            throw new ApiError("Activity with this id not found", 404)
        }

        await this.repository.deleteById(id);
        return "activity deleted";
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