const { UserService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")

module.exports = (app) => {

    const service = new UserService();

    app.get("/user", async (req, res, next) => {
        try {
            const users = await service.findAll();
            res.status(200).send({ message: "User retreived successfully", data: users })
        } catch (error) {
            next(error)
        }
    })


    //get user articles
    app.get("/user/:id/articles", async (req, res, next) => {
        const id = req.params.id;
        try {
            const articles = await service.getArticles(id);
            res.status(200).send({ message: "articles retrieved successfully", data: articles })
        } catch (error) {
            next(error)
        }
    })

    app.get("/user/:id", async (req, res, next) => {
        try {
            const user = await service.findById(req.params.id);
            res.status(200).send({ message: "User retreived successfully", data: user })
        } catch (error) {
            next(error)
        }
    })

    app.post("/user", async (req, res, next) => {
        try {
            const user = await service.create(req.body);
            res.status(200).send({ message: "user created successfully", data: user })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/user/:id", async (req, res, next) => {
        try {
            const user = await service.deleteById(req.params.id);
            res.status(200).send({ message: "User deleted successfully", data: user })
        } catch (error) {
            next(error)
        }
    })

    //add order
    app.post("/user/artilce", async (req, res, next) => {
        const { userId, article } = req.body;
        try {
            const new_article = await service.addArticle(userId, article);
            res.status(200).send({ message: "Article deleted successfully", data: new_article })
        } catch (error) {
            next(error)
        }
    })



    app.use(errorHandler)
}