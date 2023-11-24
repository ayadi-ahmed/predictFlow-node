const { UserRepo } = require("../repository");
const ApiError = require("../errors/ApiError");
const ArticleService = require("./article");

module.exports = class UserService {
    constructor() {
        this.repository = new UserRepo();
        this.articleService = new ArticleService();
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error
        }
    }



    async create(user) {
        if (!user.name || !user.email || !user.password) {
            throw new ApiError("Invalid user details", 400)
        }
        const new_user = await this.repository.create(user);
        return new_user;
    }

    async findById(id) {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new ApiError("User with this id not found", 404)
        }
        return user;
    }

    async deleteById(id) {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new ApiError("User with this id not found", 404)
        }

        await this.repository.deleteById(id);
        return "user deleted";
    }

    async addArticle(userId, article) {
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new ApiError("User with this id not found", 404)
        }
        const new_article = await this.articleService.create(article);
        user.articles.push(new_article);
        await user.save();
        return new_article;
    }

    async getArticles(userId) {
        const articles = await this.repository.getOrders(userId);
        return articles;
    }
}