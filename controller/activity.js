const { ActivityService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler")

module.exports = (app) => {

    const service = new ActivityService();

    app.get("/activity", async (req, res, next) => {
        try {
            const activities = await service.findAll();
            res.status(200).send({ message: "Activities retreived successfully", data: activities })
        } catch (error) {
            next(error)
        }
    })

    app.get("/activity/:id", async (req, res, next) => {
        try {
            const activity = await service.findById(req.params.id);
            res.status(200).send({ message: "Activity retreived successfully", data: activity })
        } catch (error) {
            next(error)
        }
    })

    app.post("/activity", async (req, res, next) => {
        try {
            const activity = await service.create(req.body);
            res.status(200).send({ message: "Activity created successfully", data: activity })
        } catch (error) {
            next(error)
        }
    })

    app.delete("/activity/:id", async (req, res, next) => {
        try {
            const activity = await service.deleteById(req.params.id);
            res.status(200).send({ message: "Activity deleted successfully", data: activity })
        } catch (error) {
            next(error)
        }
    })

    app.use(errorHandler)
}