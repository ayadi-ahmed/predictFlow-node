const { CategoryService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")
const verifyToken = require("../config/TokenConfig");


module.exports = (app) => {

    const service = new CategoryService();

    app.get("/category", verifyToken,async (req, res, next) => {
        try {
            const categories = await service.findAll();
            res.status(200).send({ message: "Categories retreived successfully", data: categories })
        } catch (error) {
            next(error)
        }
    })

    app.get("/category/:id", verifyToken,async (req, res, next) => {
        try {
            const category = await service.findById(req.params.id);
            res.status(200).send({ message: "Category retreived successfully", data: category })
        } catch (error) {
            next(error)
        }
    })



    app.post("/category", verifyToken,async (req, res, next) => {
        try {
            const category = await service.create(req.body);
            res.status(200).send({ message: "Category created successfully", data: category })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/category/:id",verifyToken, async (req, res, next) => {
        try {
            const category = await service.deleteById(req.params.id);
            res.status(200).send({ message: "Category deleted successfully", data: category })
        } catch (error) {
            next(error)
        }
    })

    app.use(errorHandler)
}