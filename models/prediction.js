const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PredictionSchema = new Schema(
    {
        userId: String,
        articleId: String,
        articleInitialQuantity: Number,
        articleCategory: String,
        customerOrderQuantities:Number,
        customer:String,
        customerActivity:String,
        quantity_label:Number,
        //supplier:String,
        companyOrdersQuatity:Number

    },
    {
        timestamps: true
    }
);

PredictionSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model('prediction', PredictionSchema);