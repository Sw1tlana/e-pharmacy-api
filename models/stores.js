import mongoose from "mongoose";

const pharmsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: /^\+?[0-9]{10,15}$/,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
});

const Store = mongoose.model('Store', pharmsSchema);

export default Store;