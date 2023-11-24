const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerOrderSchema = new Schema(
    {
        date: { type: String, default: Date.now() },
        total: { type: Number, default: 0.0 },
        items: [
            {
                quantity: Number,
                article: {
                    _id: String,
                    name: String,
                    description: String,
                    price: Number,
                },
            },
        ]
    },
    {
        timestamps: true
    }
);

CustomerOrderSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model('customerOrder', CustomerOrderSchema);