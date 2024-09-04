import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const user_Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamp: true });

// Hash the password before saving the document
user_Schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model('user', user_Schema);

export default User