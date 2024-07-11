import fs from "fs";

class Carrito {
    rutaCarrito;
    carrito = [];

    constructor() {
        this.rutaCarrito =  "./data/carrito.json";
        this.init();
    }

    async init() {
        if( fs.existsSync(this.rutaCarrito)) {
            console.log("Error, el archivo ya existe");
        } else {
            fs.writeFileSync(this.rutaCarrito, JSON.stringify([]));
            console.log("Creado correctamente");
        }
    }

    async getCarrito() {
        return JSON.parse(fs.readFileSync(this.rutaCarrito, "utf-8"));
    }

    async createCarrito() {
        this.carrito = await this.getCarrito();

        let id = await this.obtenerId();

        let newCarrito = {
            id,
            products: []
        }

        this.carrito.push(newCarrito);

        fs.writeFileSync(this.rutaCarrito, JSON.stringify(this.carrito));
        
        return newCarrito;
    }

    async obtenerId() {
        this.carrito = await this.getCarrito();

        if(this.carrito.length === 0) {
            return 1;
        } else {
            let ultimoCarrito = this.carrito[this.carrito.length - 1];
            return ultimoCarrito.id + 1
        }
    }

    async getCarritoById(id) {
        this.carrito = await this.getCarrito();

        return this.carrito.find(element => element.id == id);
    }

    async updateCarrito(cid, pid) {
        this.carrito = await this.getCarrito();

        let indiceDelCarrito = this.carrito.findIndex(element => element.id == cid);

        if(indiceDelCarrito < 0) {
            return "el carrito no existe";
        }

        let carritoAux = this.carrito[indiceDelCarrito];

        let indiceDeProducto = carritoAux.products.findIndex(element => element.productId == pid);

        if (indiceDeProducto < 0) {
            let newProducto = {
                productId: pid,
                quantity: 1
            };

            carritoAux.products.push(newProducto);
        } else {
            carritoAux.products[indiceDeProducto].quantity++;
        }

        this.carrito[indiceDelCarrito] = carritoAux;

        fs.writeFileSync(this.rutaCarrito, JSON.stringify(this.carrito));
    }
}


export default Carrito;