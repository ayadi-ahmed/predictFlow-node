const { CategoryRepo, ArticleRepo } = require("../repository");
const ApiError = require("../errors/ApiError");

module.exports = class CategoryService {
    constructor() {
        this.repository = new CategoryRepo();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }



    async create(category) {
        if (!category.name) {
            throw new ApiError("Invalid category name", 400)
        }
        if (!category.companyId) {
            throw new ApiError("Invalid company ID", 400)
        }
        const new_category = await this.repository.create(category);
        return new_category;
    }

    async findById(id) {
        const category = await this.repository.findById(id);
        if (!category) {
            throw new ApiError("category with this id not found", 404)
        }
        return category;
    }
    async deleteById(id) {
        const category = await this.repository.findById(id);
        if (!category) {
            throw new ApiError("category with this id not found", 404)
        }
        await this.repository.deleteById(id);
        return "deleted";
    }
}