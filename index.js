import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
const PORT = 8080;
const app = express();
app.use(express.json());

//siempre llamada y respuesta
app.get("/", (request, response) => {
  response.send("funciona");
});

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log("funcionando");
});
