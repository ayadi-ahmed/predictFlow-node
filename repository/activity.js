const { CustomerModel, ActivityModel } = require("../models");


class ActivityRepository {

    async findAll() {
        const activities = await ActivityModel.find({});
        return activities;
    }

    async findById(id) {
        const activity = await ActivityModel.findById(id);
        return activity;
    }

    async create(activity) {
        const new_activity = await ActivityModel.create(activity);
        return new_activity;
    }

    async deleteById(id) {
        return await ActivityModel.deleteOne({ _id: id });
    }
}

module.exports = ActivityRepository;