import mongoose, {Schema} from "mongoose";
const cartCollection = "cart";

const cartSchema = new Schema({
   products: [{
     productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
     quantity: { type: Number, required: true, default: 1 },
   }],
 });

const cart = new mongoose.model(cartCollection, cartSchema);

export default cart;