const ApiError = require("../errors/ApiError");
const { UserModel } = require("../models");


class UserRepository {

    async findAll() {
        const users = await UserModel.find({});
        return users;
    }


    async findById(id) {
        const user = await UserModel.findById(id);
        return user;
    }

    async create(user) {
        const new_user = await UserModel.create(user);
        return new_user;
    }

    async deleteById(id) {
        return await UserModel.deleteOne({ _id: id });
    }

    async getArticles(userId) {
        const user = await UserModel.findById(userId).populate("articles");
        if (!user) {
            throw new ApiError("User with this id not found");
        }
        return user.articles;
    }
}

module.exports = UserRepository;