const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        phoneNumber: String,
        articles: [
            { type: Schema.Types.ObjectId, ref: 'artilce' }
        ],
    },
    {
        timestamps: true
    }
);

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}

module.exports = mongoose.model('user', UserSchema);