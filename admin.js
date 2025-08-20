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
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
    