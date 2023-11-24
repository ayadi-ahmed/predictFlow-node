const { CategoryModel } = require("../models");


class CategoryRepository {

    async findAll() {
        const categories = await CategoryModel.find({});
        return categories;
    }


    async findById(id) {
        const category = await CategoryModel.findById(id);
        return category;
    }

    async create(category) {
        const new_category = await CategoryModel.create(category);
        return new_category;
    }


    async deleteById(id) {
        return await CategoryModel.deleteOne({ _id: id });
    }
}

module.exports = CategoryRepository;