import { Router } from "express";
import Productos from "../managers/productManagers.js";

const productsRouter = Router();

const products = new Productos();

productsRouter.get("/products", async (req, res) => {
  const {limit = 10, page = 1, sort, query} = req.query;

  const productosGuardados = await products.getProducts(limit, page, sort, query);
  const nextLink = productosGuardados.hasNextPage ? `/api/products/products?limit=${limit}&page=${parseInt(page) + 1}` : null;
  const prevLink = productosGuardados.hasPrevPage ? `/api/products/products?limit=${limit}&page=${parseInt(page) - 1}` : null;

  const response = {
    status: "success",
    payload: productosGuardados.docs,
    totalPages: productosGuardados.totalPages,
    prevPage: productosGuardados.prevPage,
    nextPage: productosGuardados.nextPage,
    page: productosGuardados.page,
    hasPrevPage: productosGuardados.hasPrevPage,
    hasNextPage: productosGuardados.hasNextPage,
    prevLink,
    nextLink,
  };

  console.log(response);

  res.render('index', {response});
});

productsRouter.get("/realtimeproducts", async (req, res) => {
  res.render('realTimeProducts');
});

productsRouter.get("/", async (req, res) => {
  const {limit = 10, page = 1, sort, query} = req.query;

  try {
    const prods = await products.getProducts(limit, page, sort, query);
    const nextLink = prods.hasNextPage ? `/api/products?limit=${limit}&page=${parseInt(page) + 1}` : null;
    const prevLink = prods.hasPrevPage ? `/api/products?limit=${limit}&page=${parseInt(page) - 1}` : null;

    const response = {
      status: "success",
      payload: prods.docs,
      totalPages: prods.totalPages,
      prevPage: prods.prevPage,
      nextPage: prods.nextPage,
      page: prods.page,
      hasPrevPage: prods.hasPrevPage,
      hasNextPage: prods.hasNextPage,
      prevLink,
      nextLink,
    };

    res.status(200).send(response);
  } catch (err) {

    const response = {
      status: "error",
      message: "Error al obtener los productos",
      error: err,
    };
    res.status(500).send(response);
  }
});

productsRouter.get("/:pid", async (req, res) => {

  const id = req.params.pid;

  let productoEncontrado = await products.getProductById(id);

  res.status(200).send(productoEncontrado);
});

productsRouter.post("/", async (req, res) => {
  const response = await products.createProduct(req.body);
  res.send(response);
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
