import "dotenv/config";
import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
import { engine } from 'express-handlebars';
import {Server} from 'socket.io';
import __dirname from "./util.js";
import Productos from "./managers/productManagers.js";
import connection from "./config/DBconnect.js";
import config from "./config/config.js";

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

const httpServer = app.listen(config.server.port, async () => {
  await connection();
  console.log("funcionando - puerto: ", config.server.port);
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