import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "product";

const productSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    code: { type: String},
    price: { type: Number },
    stock: { type: Number},
    category: { type: String},
});

productSchema.plugin(mongoosePaginate);
const Product = new mongoose.model(productCollection, productSchema);

export default Product;