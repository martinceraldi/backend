import { Router } from "express";
import Carrito from "../managers/cartManagers.js";

const cartsRouter = Router();
const carrito = new Carrito();

cartsRouter.post("/", async (req, res) => {
  const newCarrito = await carrito.createCarrito();
  res.status(200).send(newCarrito);
});

cartsRouter.get("/:cid", async (req, res) => {
  const id = req.params.cid;

  const getCarrito = await carrito.getCarritoById(id);

  res.status(200).send(getCarrito);
});

cartsRouter.post("/:cid/product/:pid", async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const updateCarrito = await carrito.updateCarrito(cid, pid);

  res.status(200).send(updateCarrito);
});

export default cartsRouter;
