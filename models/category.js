const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: String,
    },
    {
        timestamps: true
    }
);

CategorySchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model('category', CategorySchema);