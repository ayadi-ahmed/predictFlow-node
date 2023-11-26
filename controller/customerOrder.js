const { CustomerOrderService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")
const verifyToken = require("../config/TokenConfig");


module.exports = (app) => {

    const service = new CustomerOrderService();

    app.get("/customer-order",verifyToken, async (req, res, next) => {
        try {
            const orders = await service.findAll();
            res.status(200).send({ message: "Orders retreived successfully", data: orders })
        } catch (error) {
            next(error)
        }
    })

    app.get("/customer-order/:id",verifyToken, async (req, res, next) => {
        try {
            const order = await service.findById(req.params.id);
            res.status(200).send({ message: "Order retreived successfully", data: order })
        } catch (error) {
            next(error)
        }
    })

    app.post("/customer-order",verifyToken, async (req, res, next) => {
        try {
            const order = await service.create(req.body);
            res.status(200).send({ message: "Order created successfully", data: order })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/customer-order/:id",verifyToken, async (req, res, next) => {
        try {
            const order = await service.deleteById(req.params.id);
            res.status(200).send({ message: "Order deleted successfully", data: order })
        } catch (error) {
            next(error)
        }
    })

    app.use(errorHandler)
}