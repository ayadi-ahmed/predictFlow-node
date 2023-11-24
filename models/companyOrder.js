const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanyOrderSchema = new Schema(
    {
        date: { type: Date, default: Date.now() },
        quantity: { type: Number, required: true },
        userId: String,
        articles: [
            { type: Schema.Types.ObjectId, ref: 'article', required: true },
        ]
    },
    {
        timestamps: true
    }
);

CompanyOrderSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model('companyOrder', CompanyOrderSchema);