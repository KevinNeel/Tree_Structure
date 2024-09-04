import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const tree_Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Tree",
        default: null
    },

}, { timestamp: true });


const Tree = mongoose.model('tree', tree_Schema);

export default Tree