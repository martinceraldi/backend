const socket = io();

function guardar() {
    console.log("CLICK!!!!");
    
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let code = document.getElementById("code").value;
    let price = document.getElementById("price").value;
    let status = document.getElementById("status").value;
    let stock = document.getElementById("stock").value;
    let category = document.getElementById("category").value;

    socket.emit("saveProducts", {title, description, code, price, status, stock, category});
}

function borrar(id) {
    console.log("ID: ", id);
    socket.emit("deleteProducts", {id});
}

socket.on('getProducts', info => {
    let tabla = `
        <div class='container text-center my-5'>
            <div class='jumbotron' style='background-color: bisque; color:black'>
            <table class='table table-striped'>
                <thead>
                    <tr class='table-info'>
                        <th scope='col'>#</th>
                        <th scope='col'>title</th>
                        <th scope='col'>description</th>
                        <th scope='col'>code</th>
                        <th scope='col'>price</th>
                        <th scope='col'>status</th>
                        <th scope='col'>stock</th>
                        <th scope='col'>category</th>
                        <th scope='col'> - </th>
                        </tr>
                        </thead>
                        <tbody>`
                        info.forEach(element => {
                            tabla += `<tr>
                            <th scope="row">` + element.id + ` </th>
                            <th scope="row">` + element.title + ` </th>
                            <th scope="row">` + element.description + ` </th>
                            <th scope="row">` + element.code + ` </th>
                            <th scope="row">` + element.price + ` </th>
                            <th scope="row">` + element.status + ` </th>
                            <th scope="row">` + element.stock + ` </th>
                            <th scope="row">` + element.category + ` </th>
                            <th scope="row"><button type="button" class="btn btn-danger" onclick="borrar(id=`+ element.id + `)">Borrar</button></th>
                            </tr>`
                        });
    tabla += "</tbody></table></div></div>";

    document.getElementById("tabla").innerHTML = tabla;
})