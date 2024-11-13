import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
 },
 suppliers: {
    type: String,
    required: true,
 },
 stock: {
    type: String,
    required: true,
 },
 price: {
    type: Number,
    required: true,
 },
 category: {
    type: String,
    required: true,
 },
 photo: {
    type: String,
    required: false,
}
});

const Product = mongoose.model('Product', productsSchema);

export default Product;