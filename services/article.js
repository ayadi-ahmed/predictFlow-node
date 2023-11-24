const { ArticleRepo } = require("../repository");
const ApiError = require("../errors/ApiError");

module.exports = class ArticleService {
    constructor() {
        this.repository = new ArticleRepo();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }
    async findByUserId(userId) {
        try {
            return await this.repository.findByUserId(userId);
        } catch (error) {
            throw error
        }
    }

    async findArticleNumbersByUserId(userId) {
        try {
            return await this.repository.findArticleNumbersByUserId(userId);
        } catch (error) {
            throw error
        }
    }

    async create(article) {
        if (!article.name) {
            throw new ApiError("Invalid article details", 400)
        }
        const new_article = await this.repository.create(article);
        return new_article;
    }

    async findById(id) {
        const article = await this.repository.findById(id);
        if (!article) {
            throw new ApiError("article with this id not found", 404)
        }
        return article;
    }
    async deleteById(id) {
        const article = await this.repository.findById(id);
        if (!article) {
            throw new ApiError("article with this id not found", 404)
        }
        await this.repository.deleteById(id);
        return "deleted";
    }
}