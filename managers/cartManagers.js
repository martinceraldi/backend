import cart from "../models/cartModels.js";
import Products from "./productManagers.js";
const productManager = new Products();


class Carrito {

    constructor() {}

    async getCarritos() {
        try {
            return await cart.find();
        } catch (err) { 
            console.log(err);
        }
    }

    async getCarritoByIdWithProducts(id) {
        try {
            return await cart.find({_id: id}).populate("products.productId");
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    async getCarritoById(id) {
        try {
            return await cart.find({_id: id});
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    async createCarrito(id) {
        try {
            const product = await productManager.getProductById(id);

            if (product.length === 0) {
                return "el producto no existe";
            }

            //create cart with product
            const newCart = await cart.create({products: [
                { productId: product[0]._id }
               ],
            });

            return newCart;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const realProduct = await productManager.getProductById(pid);
            if (realProduct.length === 0) {
                return "el producto no existe";
            }

            const cart = (await this.getCarritoById(cid))[0];

            if(!cart) {
                return "el carrito no existe";
            }

            const index = cart.products.findIndex(product => product.productId == pid);

            index < 1 ? cart.products.push({productId: realProduct[0]._id}) : cart.products[index].quantity += 1;

            return await cart.save();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteProductFromCarrito(cid, pid) {
        try {
            const cart = (await this.getCarritoById(cid))[0];

            const index = cart.products.findIndex(product => product.productId == pid);
            if (index < 0) {
                return "el producto no existe en el carrito";
            }

            cart.products.splice(index, 1);
            return await cart.save();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async updateCarrito(cid, products) {
        try {
            const cart = (await this.getCarritoById(cid))[0];

            cart.products = products;

            return await cart.save();
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = (await this.getCarritoById(cid))[0];

            const index = cart.products.findIndex(product => product._id == pid);
            if (index < 0) {
                return "el producto no existe en el carrito";
            }
            cart.products[index].quantity = quantity;
            return await cart.save();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteAllProducts(cid) {
        try {
            const cart = (await this.getCarritoById(cid))[0];

            cart.products = [];

            return await cart.save();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}


export default Carrito;