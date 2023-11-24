const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SupplierSchema = new Schema(
    {
        name: String,
        email: String,
        orders: [
            { type: Schema.Types.ObjectId, ref: 'companyOrder' }
        ]
    },
    {
        timestamps: true
    }
);

SupplierSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model('supplier', SupplierSchema);