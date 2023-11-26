const { ArticleService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")
const verifyToken = require("../config/TokenConfig");


module.exports = (app) => {

    const service = new ArticleService();

    app.get("/article",verifyToken, async (req, res, next) => {
        try {
            const articles = await service.findAll();
            res.status(200).send({ message: "Articles retreived successfully", data: articles })
        } catch (error) {
            next(error)
        }
    })

    app.get("/article/user/:id", async (req, res, next) => {
        try {
            const articles = await service.findByUserId(req.params.id);
            res.status(200).send({ message: "Articles retreived successfully", data: articles })
        } catch (error) {
            next(error)
        }
    })

    app.get("/article/number/user/:id",verifyToken, async (req, res, next) => {
        try {
            const articles = await service.findArticleNumbersByUserId(req.params.id);
            res.status(200).send({ message: "Articles number retreived successfully", data: articles })
        } catch (error) {
            next(error)
        }
    })

    app.get("/article/:id", async (req, res, next) => {
        try {
            const article = await service.findById(req.params.id);
            res.status(200).send({ message: "Article retreived successfully", data: article })
        } catch (error) {
            next(error)
        }
    })


    app.post("/article", verifyToken,async (req, res, next) => {
        try {
            const article = await service.create(req.body);
            res.status(200).send({ message: "Article created successfully", data: article })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/article/:id", verifyToken,async (req, res, next) => {
        try {
            const response = await service.deleteById(req.params.id);
            res.status(200).send({ message: "Article deleted successfully", data: response })
        } catch (error) {
            next(error)
        }
    })

    app.use(errorHandler)
}