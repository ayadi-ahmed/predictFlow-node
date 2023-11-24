const router = require("express").Router();
const { ClientModel } = require("../models");
const ApiError = require("../errors/ApiError")


//get all clients
router.get("", async (req, res, next) => {
    try {
        const clients = await ClientModel.find({});
        res.status(200).send({ message: "clients retrieved successfully", data: clients });
        return;
    } catch (error) {
        next(err)
    }
})
 
//find client by id
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        const client = await ClientModel.findById(id);
        if (!client) {
            throw new ApiError("client with this id not found", 404)
        }
        res.status(200).send({ message: "client retrieved successfully", data: client })
    } catch (error) {
        next(error)
    }
})


//create client
router.post("", async (req, res, next) => {

    const { name, email, phoneNumber, country, password, activity } = req.body;
    try {
        const client = await ClientModel.findOne({ email: email });
        if (!name || !email || !password) {
            throw new ApiError("Invalid details", 400)
        }
        if (client) {
            throw new ApiError("This email is already in use", 400)
        }
        const new_client = await new ClientModel({ name, email, password, country, phoneNumber, activity }).save();
        res.status(200).send({ message: "clients retrieved successfully", data: new_client })
    } catch (error) {
        next(error)
    }
})

//update client
router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const old = req.body
    try {
        const client = await ClientModel.findById(id);
        if (!client) {
            throw new ApiError("client with this id not found", 404)
        }
        await ClientModel.updateOne({ _id: id }, old);
        res.status(200).send({ message: "client updated successfully" })
    } catch (error) {
        next(error)
    }
})


//delete client by id
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const client = await ClientModel.findById(id);
        if (!client) {
            res.status(500).send({ message: "client with this id not found" });
            return;
        }
        await client.deleteOne({ _id: id });
        res.status(200).send({ message: "clients deleted successfully", data: client })
    } catch (error) {
        res.status(500).send({ message: "an error occured" })
    }
});

module.exports = router;