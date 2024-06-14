import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
import { engine } from 'express-handlebars';
import {Server} from 'socket.io';
import __dirname from "./util.js";
import Productos from "./managers/productManagers.js";

const PORT = 8080;
const app = express();
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

//siempre llamada y respuesta
app.get("/", (request, response) => {
  response.send("funciona");
});

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

const httpServer = app.listen(PORT, () => {
  console.log("funcionando");
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async socket => {

  let products = new Productos();
  socketServer.sockets.emit('getProducts', await products.getProducts());

  socket.on('saveProducts', async ({title, description, code, price, status, stock, category}) => {  
    await products.createProduct({title, description, code, price, status, stock, category});
  })

  socket.on('deleteProducts', async ({id})=>  await products.deleteProductById(id))
});