const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        name: String,
        email: String,
        country: String,
        password: String,
        phoneNumber: String,
        activityId: String,
        orders: [
            { type: Schema.Types.ObjectId, ref: 'customerOrder' }
        ],
        //companyId: String
    },
    {
        timestamps: true
    }
);

CustomerSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model('customer', CustomerSchema);