import product from "../models/productModels.js";

class Productos {

  constructor() {}

  async getProducts(limit, page, sort, query) {
    try {
      return await product.paginate({},{limit, page, sort, query});
    } catch (err) { 
      console.log(err);
    }
  }

  async createProduct({title, description, code, price, status, stock, category}) {
    try {
      return await product.create({title, description, code, price, status, stock, category}); 
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      return await product.find({_id: id});
    } catch (err) { 
      console.log(err);
    }
  }

  async updateProductById(id, body) {
    try {
      return await product.findByIdAndUpdate({_id: id}, body, {new: true});
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductById(id) {
    try {
     return await product.deleteOne({_id: id}); 
    } catch (err) {
      console.log(err);
    }
  }
}

export default Productos;
