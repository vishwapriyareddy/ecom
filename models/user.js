const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: false,
    },
    street: {
        type: String,
        default: "",
    },
    apartment: {
        type: String,
        default: "",
    },
    zip: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
});
// userSchema.pre("save", async function (next) {
//     if (this.isModified("passwordHash")) {
//         this.passwordHash = bcrypt.hash(this.passwordHash, 12);
//     }
// });
userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
userSchema.set("toJSON", {
    virtuals: true,
});



exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;