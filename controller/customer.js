const { CustomerService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")

module.exports = (app) => {

    const service = new CustomerService();

    app.get("/customer", async (req, res, next) => {
        try {
            const clients = await service.findAll();
            res.status(200).send({ message: "Clients retreived successfully", data: clients })
        } catch (error) {
            next(error)
        }
    })

    app.get("/customer/company/:id", async (req, res, next) => {
        try {
            const clientsByCompany = await service.findClientsByCompanyId(req.params.id);
            return res.status(200).send({ message: "customers retrieved successfully", data: clientsByCompany });
        } catch (error) {
            next(error)
        }
    })

    app.get("/customer/number/company/:id", async (req, res, next) => {
        try {
            const clientsByCompany = await service.findCustomersNumberByCompanyId(req.params.id);
            return res.status(200).send({ message: "customers retrieved successfully", data: clientsByCompany });
        } catch (error) {
            next(error)
        }
    })

    //get customer orders
    app.get("/customer/:id/orders", async (req, res, next) => {
        const id = req.params.id;
        try {
            const orders = await service.getOrders(id);
            res.status(200).send({ message: "orders retrieved successfully", data: orders })
        } catch (error) {
            next(error)
        }
    })

    app.get("/customer/:id", async (req, res, next) => {
        try {
            const client = await service.findById(req.params.id);
            res.status(200).send({ message: "Client retreived successfully", data: client })
        } catch (error) {
            next(error)
        }
    })

    app.post("/customer", async (req, res, next) => {
        try {
            const client = await service.create(req.body);
            res.status(200).send({ message: "Client created successfully", data: client })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/customer/:id", async (req, res, next) => {
        try {
            const client = await service.deleteById(req.params.id);
            res.status(200).send({ message: "Client deleted successfully", data: client })
        } catch (error) {
            next(error)
        }
    })

    //add order
    app.post("/customer/order", async (req, res, next) => {
        const { customerId, order } = req.body;
        try {
            const new_order = await service.addOrder(customerId, order);
            res.status(200).send({ message: "order deleted successfully", data: new_order })
        } catch (error) {
            next(error)
        }
    })



    app.use(errorHandler)
}