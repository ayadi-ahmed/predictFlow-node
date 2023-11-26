const { CompanyOrderService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")
const verifyToken = require("../config/TokenConfig");


module.exports = (app) => {

    const service = new CompanyOrderService();

    app.get("/company-order",verifyToken, async (req, res, next) => {
        try {
            const orders = await service.findAll();
            res.status(200).send({ message: "Orders retreived successfully", data: orders })
        } catch (error) {
            next(error)
        }
    })

    app.get("/company-order/user/:id",verifyToken, async (req, res, next) => {
        try {
            const orders = await service.findAllByUserId(req.params.id);
            res.status(200).send({ message: "Orders retreived successfully", data: orders })
        } catch (error) {
            next(error)
        }
    })

    app.get("/company-order/number/user/:id",verifyToken, async (req, res, next) => {
        try {
            const orders = await service.findOrderNumbersByUserId(req.params.id);
            res.status(200).send({ message: "Orders number retreived successfully", data: orders })
        } catch (error) {
            next(error)
        }
    })

    app.get("/company-order/:id",verifyToken, async (req, res, next) => {
        try {
            const order = await service.findById(req.params.id);
            res.status(200).send({ message: "Orders retreived successfully", data: order })
        } catch (error) {
            next(error)
        }
    })



    app.post("/company-order",verifyToken, async (req, res, next) => {
        try {
            const orders = await service.create(req.body);
            res.status(200).send({ message: "Orders created successfully", data: orders })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/company-order/:id",verifyToken, async (req, res, next) => {
        const id = req.params.id;
        try {
            const response = await service.deleteById(id);
            res.status(200).send({ message: "Order deleted successfully", data: response })
        } catch (error) {
            next(error)
        }
    })

    /* 
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
                const supplier = await service.findById(req.params.id);
                res.status(200).send({ message: "Supplier deleted successfully", data: supplier })
            } catch (error) {
                next(error)
            }
        })
    
       
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
            try {
                const response = await service.addOrder(supplierId, order);
                res.status(200).send({ message: response, data: response })
            } catch (error) {
                next(error)
            }
        })
     */
    app.use(errorHandler)
}