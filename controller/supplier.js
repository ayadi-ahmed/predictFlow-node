const { SupplierService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")

module.exports = (app) => {

    const service = new SupplierService();

    app.get("/supplier", async (req, res, next) => {
        try {
            const suppliers = await service.findAll();
            res.status(200).send({ message: "Suppliers retreived successfully", data: suppliers })
        } catch (error) {
            next(error)
        }
    })


    app.get("/supplier/:id", async (req, res, next) => {
        try {
            const supplier = await service.findById(req.params.id);
            res.status(200).send({ message: "Supplier retreived successfully", data: supplier })
        } catch (error) {
            next(error)
        }
    })



    app.post("/supplier", async (req, res, next) => {
        try {
            const supplier = await service.create(req.body);
            res.status(200).send({ message: "Supplier created successfully", data: supplier })
        } catch (error) {
            next(error)
        }
    })

    //remove order
    app.delete("/supplier/order", async (req, res, next) => {
        const { supplierId, order } = req.body;
        try {
            const response = await service.removeOrder(supplierId, order);
            res.status(200).send({ message: response, data: response })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/supplier/:id", async (req, res, next) => {
        try {
            const supplier = await service.deleteById(req.params.id);
            res.status(200).send({ message: "Supplier deleted successfully", data: supplier })
        } catch (error) {
            next(error)
        }
    })

    //find orders
    app.get("/supplier/:id/orders", async (req, res, next) => {
        const id = req.params.id;
        try {
            const orders = await service.findOrdersBySupplier(id);
            res.status(200).send({ message: "Orders retrieved successfully", data: orders })
        } catch (error) {
            next(error)
        }
    })

    //add order
    app.post("/supplier/order", async (req, res, next) => {
        const { supplierId, order } = req.body;
        console.log(req.body)
        try {
            const response = await service.addOrder(supplierId, order);
            res.status(200).send({ message: response, data: response })
        } catch (error) {
            next(error)
        }
    })

    app.use(errorHandler)
}