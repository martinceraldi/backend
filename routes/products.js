import { Router } from "express";
import Productos from "../managers/productManagers.js";

const productsRouter = Router();

const products = new Productos();

productsRouter.get("/products", async (req, res) => {
  const productosGuardados = await products.getProducts();
  res.render('index', {productosGuardados});
});

productsRouter.get("/realtimeproducts", async (req, res) => {
  res.render('realTimeProducts');
});

productsRouter.get("/", async (req, res) => {
  const productosGuardados = await products.getProducts();
  res.status(200).send(productosGuardados);
});

productsRouter.get("/:pid", async (req, res) => {

  const id = req.params.pid;

  let productoEncontrado = await products.getProductById(id);

  res.status(200).send(productoEncontrado);
});

productsRouter.post("/", (req, res) => {
  products.createProduct(req.body);
  res.send("Los productos se ven POST");
});

productsRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const body = req.body;

  let productoActualizado = await products.updateProductById(id, body);
  res.status(200).send(productoActualizado);
});

productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  await products.deleteProductById(id);

  res.status(200).send("producto eliminado");
});

export default productsRouter;
