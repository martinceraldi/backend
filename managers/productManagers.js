import fs from "fs";

class Productos {
  ruta;
  products = [];

  constructor() {
    this.ruta = "./data/productos.json";
    this.init();
  }

  async init() {
    if (fs.existsSync(this.ruta)) {
      console.log("El archivo de productos ya existe");
    } else {
      //No existe? lo creo.
      fs.writeFileSync(this.ruta, JSON.stringify([]));
    }
  }

  async getProducts() {
    return JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
  }

  async createProduct({title, description, code, price, status, stock, category, thumbnails}) {
    
    // guardar en una variable lo que ya hay en el archivo
    this.products = await this.getProducts();

    let id = await this.obtenerId();
    console.log("ID devuelto: ", id);
    // creo un producto
    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    };

    // agrego el producto guardado al array de productos
    this.products.push(newProduct);

    // guardo el array de productos
    fs.writeFileSync(this.ruta, JSON.stringify(this.products));
  }

  async obtenerId() {
    this.products = await this.getProducts();

    let id = 0;

    if(this.products.length === 0) {
      id = 1;
    } else {
      let ultimoproducto = this.products[this.products.length - 1];
      id = ultimoproducto.id + 1;
    }

    return id;
  }

  async getProductById(id) {
    // leer el archivo
    this.products = await this.getProducts(); 

    return this.products.find(element => element.id == id);
  }

  async updateProductById(id, body) {
    this.products = await this.getProducts();
    let indice = this.products.findIndex(element => element.id == id);

    this.products[indice] = { ...this.products[indice], ...body};

    // guardo el array de productos
    fs.writeFileSync(this.ruta, JSON.stringify(this.products));

    return this.products[indice];
  }

  async deleteProductById(id) {
    this.products = await this.getProducts();
    let indice = this.products.findIndex(element => element.id == id);

    this.products.splice(indice, 1);

    // guardo el array de productos
    fs.writeFileSync(this.ruta, JSON.stringify(this.products));

  }
}

export default Productos;
