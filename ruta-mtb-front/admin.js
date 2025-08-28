const json = JSON.parse(localStorage.getItem("infoCatalogo"))|| [];
class Catalogo {
    constructor(id, img, title, description, price) {
        this.id = id;
        this.img = img;
        this.title = title;
        this.description = description;
        this.price = price;
    }
}

const formulario = document.getElementById("adminAgregar");
//const lista = document.getElementById("#listaCatalogo");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const id = Date.now().toString(); 
    const img = "#" ;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = parseInt(document.getElementById("price").value);

    if (id && img && title && description && price) {
        const nuevoProducto = new Catalogo(id, img, title, description, price);
        json.push(nuevoProducto);
        localStorage.setItem("infoCatalogo", JSON.stringify(json));
        alert("Producto agregado correctamente");
        formulario.reset();
        listarProductos();
    } else {
        alert("Por favor, completa todos los campos.");
    }
});


function listarProductos() {
    
    const tabla = document.getElementById("tbody");
    json.forEach((producto) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `            
            <td id="nombreProducto">${producto.title}</td>
            <td>
            <div id="imgProduc" class="img-placeholder"><img src="${producto.img}" alt="${producto.title}"></div>
            </td>
            <td>${producto.description}</td>
            <td>${producto.price}</td>
            <td><span class="estado disponible">Disponible</span></td>
          <td><button class="btn-editar"><i class="bi bi-pencil"></i></button></td>
        `;
        tabla.appendChild(fila);
    });
}

listarProductos();
    