import { Router } from "express";
import Carrito from "../managers/cartManagers.js";

const cartsRouter = Router();
const carrito = new Carrito();

cartsRouter.get("/", async (req, res) => {
  const carritos = await carrito.getCarritos();
  res.status(200).send(carritos);
});

cartsRouter.post("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const newCarrito = await carrito.createCarrito(pid);
  res.status(200).send(newCarrito);
});

cartsRouter.get("/:cid", async (req, res) => {
  const id = req.params.cid;

  const getCarrito = await carrito.getCarritoByIdWithProducts(id);

  res.status(200).send(getCarrito);
});

cartsRouter.post("/:cid/product/:pid", async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const updateCarrito = await carrito.addProductToCart(cid, pid);

  res.status(200).send(updateCarrito);
});

// elimina del carrito el producto seleccionado.
cartsRouter.delete("/:cid/products/:pid", async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const deleteProduct = await carrito.deleteProductFromCarrito(cid, pid);

  res.status(200).send(deleteProduct);
});

// actualiza todos los productos del carrito con un arreglo de productos.
cartsRouter.put("/:cid", async(req, res) => {
  const cid = req.params.cid;
  const {products} = req.body;

  const updateCarrito = await carrito.updateCarrito(cid, products);

  res.status(200).send(updateCarrito);
});

// PUT api/carts/:cid/products/:pid
// deberá poder actualizar SÓLO la
// cantidad de ejemplares del producto
// por cualquier cantidad pasada
// desde req.body
cartsRouter.put("/:cid/products/:pid", async(req, res) => {

  const cid = req.params.cid;
  const pid = req.params.pid;
  const {quantity} = req.body;

  const updateProduct = await carrito.updateProductQuantity(cid, pid, quantity);

  res.status(200).send(updateProduct);
});

// DELETE api/carts/:cid deberá
// eliminar todos los productos del
// carrito
cartsRouter.delete("/:cid", async(req, res) => {
  const cid = req.params.cid;

  const deleteAllProducts = await carrito.deleteAllProducts(cid);

  res.status(200).send(deleteAllProducts);
});

export default cartsRouter;


/*
Esta vez, para el modelo de Carts,
en su propiedad products, el id
de cada producto generado
dentro del array tiene que hacer
referencia al modelo de Products.
Modificar la ruta /:cid para que al
traer todos los productos, los
traiga completos mediante un
“populate”. De esta manera
almacenamos sólo el Id, pero al
solicitarlo podemos desglosar los
productos asociados
*/