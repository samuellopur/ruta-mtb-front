// Módulos
import { mtbProducts, mtbUsers, mtbCheck } from "./data.js";

// DATA: Datos Quemados en LocalStorage
let mtbCatalog = JSON.parse(localStorage.getItem("mtbCatalog")) || [];
let mtbUsersData = JSON.parse(localStorage.getItem("mtbUsers")) || [];
let mtbUserValidate = JSON.parse(localStorage.getItem("mtbCheck")) || [];
let mtbUserCart = [];

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (!mtbCatalog || mtbCatalog.length === 0) {
        localStorage.setItem("mtbCatalog", JSON.stringify(mtbProducts));
    };
    if (!mtbUsersData || mtbUsersData.length === 0) {
        localStorage.setItem("mtbUsers", JSON.stringify(mtbUsers));
    };
    if (!mtbUserValidate || mtbUserValidate.length === 0) {
        localStorage.setItem("mtbCheck", JSON.stringify(mtbCheck));
    };
    mtbCatalog = JSON.parse(localStorage.getItem("mtbCatalog"));
    mtbUsersData = JSON.parse(localStorage.getItem("mtbUsers"));
    mtbUserValidate = JSON.parse(localStorage.getItem("mtbCheck"));
    if (window.location.pathname.includes("catalog.html")) {
        console.log("Estás en la página de carrito");
        mtbViewCatalog(mtbCatalog);
    }
    if (window.location.pathname.includes("user.html")) {
        console.log("Estás en la página de usuario");
        mtbPanelUserCart();
    }
    if (window.location.pathname.includes("admin.html")) {
        console.log("Estás en la página de admin");
        mtbPanelAdminCart();
    }
    mtbLoadNav();
    mtbCartRefresh();
})

// Carga de NavBar por INNER
function mtbLoadNav() {
    const mtbNav = document.getElementById("mtbNav");
    mtbNav.innerHTML =
        `
    <div class="mtbNavLogo">
            <img src="#" alt="#">
        </div>
        <div>
            <a href="#" id="mtbNavBurguer" class="mtbNavBurguer" onclick="mtbBurguerClick()"><span><i class="bi bi-list"></i></span></a>
        </div>
        <div class="mtbNavLink" id="mtbNavLink">
            <a href="#"><span>Inicio</span></a>
            <a href="catalog.html"><span>Catálogo</span></a>
            <a href="#"><span>Contacto</span></a>
            <a href="#"><span>Conocenos</span></a>
            <a id="mtbLinkTextHref" href="#"><span id="mtbLinkTextUser">Cargando...</span></a>
            <a id="mtbLinkEspecial" href="#" onclick="mtbCartModalClick(); mtbBurguerClick();"><span>Carrito</span></a>
        </div>
        <div class="mtbNavAlert animate__animated animate__fadeIn" id="mtbNavAlert">
            <p id="mtbNavAlertText"></p>
        </div>
    `
    mtbNavValidate();
}

// Validación de Navbar (Login/Registro y Generalidades)
function mtbNavValidate() {
    if (window.location.pathname.includes("login.html")) {
        mtbLinkTextHref.style.display = "none";
        mtbLinkEspecial.style.display = "none";
        return
    }
    const mtbUserData = mtbUsersData.find(i => i.id === mtbUserValidate[0].id);
    if (!mtbUserValidate || mtbUserValidate[0].verification === false) {
            mtbLinkTextUser.innerHTML = "Inicio/Registro"
            mtbLinkEspecial.style.display = "none";
            document.getElementById("mtbLinkTextHref").href = "../pages/login.html";
    } else if (mtbUserValidate[0].id === 1) {
            const mtbUserName = mtbUserData.name
            mtbLinkTextUser.innerHTML = `<i class="bi bi-person-circle"></i> ${mtbUserName}`
            mtbLinkEspecial.style.display = "none";
            document.getElementById("mtbLinkTextHref").href = "../pages/admin.html";
    } else {
            const mtbUserName = mtbUserData.name
            mtbLinkTextUser.innerHTML = `<i class="bi bi-person-circle"></i> ${mtbUserName}`
            document.getElementById("mtbLinkTextHref").href = "../pages/user.html";
    }
}

// Menú Hamburguesa (Navbar)
function mtbBurguerClick() {
    const mtbNavMenu = document.getElementById("mtbNavLink");
    mtbNavMenu.classList.toggle("mtbViewNone");
}

// Función para ver catálogo
function mtbViewCatalog(mtbData) {
    const contenedor = document.getElementById("mtbCataProducts");
    contenedor.innerHTML = ``
    if (mtbData.length === 0) {
        const mtbCataProductsNone = document.createElement("p");
        mtbCataProductsNone.textContent = "No hay nada ok"
        contenedor.appendChild(mtbCataProductsNone)
    }
    mtbData.forEach(i => {
        const mtbDiv = document.createElement("div");
        mtbDiv.className = "mtbCataCard";
        mtbDiv.setAttribute = ("data-mtbId", i.id);
        mtbDiv.innerHTML =
            `
        <p class="mtbCataTag">${i.type}</p>
        <p class="mtbCataTag">${i.category}</p>
        <img src="${i.img}" alt="${i.title}">
        <h3>${i.title}</h3>
        <p>${i.description}</p>
        <p class="mtbCataPrice">$<span>${i.price.toLocaleString('es-CO')}</span></p>
        <button onclick="mtbCartAdd(${i.id})" class="mtbSmallButton">Agregar</button>
        `
        contenedor.appendChild(mtbDiv)
    })
}

// Filtros de la página "Categoría y Tipo"
document.querySelectorAll("a[data-mtbFilter]").forEach(i => {
    i.addEventListener("click", e => {
        e.preventDefault();
        const mtbCategory = e.target.getAttribute("data-mtbFilter");
        let mtbFilter = [];
        if (mtbCategory === "all") {
            mtbFilter = mtbCatalog;
        } else {
            mtbFilter = mtbCatalog.filter(i => i.category === mtbCategory);
        }
        mtbViewCatalog(mtbFilter);
    })
})

document.querySelectorAll("a[data-mtbType]").forEach(i => {
    i.addEventListener("click", e => {
        e.preventDefault();
        const mtbCategory = e.target.getAttribute("data-mtbType");
        let mtbFilter = [];
        if (mtbCategory === "all") {
            mtbFilter = mtbCatalog;
        } else {
            mtbFilter = mtbCatalog.filter(i => i.type === mtbCategory);
        }
        mtbViewCatalog(mtbFilter);
    })
})

// CARRITO: Todas sus funcionalidades (Modal)
function mtbCartAdd(mtbData) {
    mtbUserCart = mtbUsersData.find(i => i.id == mtbUserValidate[0].id)
    if (!mtbUserCart) { return; }
    if (mtbUserValidate[0].verification === false) {
        mtbAlert(2);
        return;
    }
    const index = mtbCatalog.find(i => i.id == mtbData);
    const amount = 1;
    if (index) {
        const mtbExist = mtbUserCart.cart.find(i => i.id == mtbData);
        if (index.stock >= amount) {
            index.stock -= amount;
            if (mtbExist) {
                mtbExist.amount += amount;
            } else {
                mtbUserCart.cart.push({ id: parseInt(index.id), amount});
            }
            mtbAlert(3);
            mtbCartRefresh();
        } else {
            mtbAlert(10);
        }
        localStorage.setItem("mtbUsers", JSON.stringify(mtbUsersData));
        localStorage.setItem("mtbCatalog", JSON.stringify(mtbCatalog));
    }

}

function mtbCartAddMore(mtbData) {
    const index = mtbUserCart.cart.find(i => i.id == mtbData);
    index.amount += 1;
    console.log(mtbUsersData)
    localStorage.setItem("mtbUsers", JSON.stringify(mtbUsersData));
    mtbCartRefresh();
}

function mtbCartRest(mtbData) {
    const index = mtbUserCart.cart.find(i => i.id == mtbData);
    if (index.amount > 1) {
        index.amount -= 1;
    } else {
        mtbUserCart.cart.splice(index, 1);
    }
    localStorage.setItem("mtbUsers", JSON.stringify(mtbUsersData));
    mtbCartRefresh();
}

function mtbDelete(mtbData) {
    const index = mtbUserCart.cart.findIndex(i => i.id == mtbData);
    mtbUserCart.cart.splice(index, 1)
    localStorage.setItem("mtbUsers", JSON.stringify(mtbUsersData));
    mtbCartRefresh();
}

function mtbDeleteAllCart() {
    const index = mtbUserCart.cart;
    mtbUserCart.cart.splice(index)
    localStorage.setItem("mtbUsers", JSON.stringify(mtbUsersData));
    mtbCartRefresh();
    mtbCartModalClick();
    mtbAlert(9);
}

function mtbDataCartReset() {
    const mtbDataCart = document.getElementById("mtbCartModalPanelBottom");
    mtbDataCart.style.display = "none";
}

function mtbCartRefresh() {
    mtbUserCart = mtbUsersData.find(i => i.id == mtbUserValidate[0].id) || [];
    const cart = document.getElementById("mtbCartModalAdd");
    const mtbUserCartList = mtbUserCart.cart
    cart.innerHTML = "";
    const mtbDataCart = document.getElementById("mtbCartModalPanelBottom");
    let data1 = document.getElementById("mtbDataPrice1");
    let data2 = document.getElementById("mtbDataPrice2");
    let data3 = document.getElementById("mtbDataPrice3");
    let data4 = document.getElementById("mtbDataPrice4");
    data1 = 0;
    data2 = 0;
    data3 = 0;
    data4 = 0;

    if (!mtbUserCartList || mtbUserCartList.length === 0) {
        mtbDataCartReset();
        return;
    }

    mtbUserCartList.forEach(i => {
        if (!mtbUserCartList || mtbUserCartList.length === 0) {
            mtbDataCart.style.display = "none";
            return;
        }
        const data = mtbCatalog.find(e => e.id === i.id)
        const div = document.createElement("div");
        div.className = "mtbCartModalCard";
        const mtbTotal = data.price * i.amount;
        data1 += parseInt(i.amount);
        data2 += parseInt(mtbTotal);
        div.innerHTML =
            `
            <div class="CardCartImg">
                <img src="${data.img}" alt="${data.title}">
            </div>
            <div class="CardCartContent">
                <h3>${data.title}</h3>
                <p>Cantidad: <span>${i.amount}</span></p>
                <p>Precio: $<span>${mtbTotal.toLocaleString('es-CO')}</span></p>
                <p>Tipo: <span>${data.type}</span></p>
            </div>
            <div class="CardCartButtons">
                <button class="mtbSmallButton" onclick="mtbCartAddMore(${data.id})"><i class="bi bi-plus-lg"></i></button>
                <button class="mtbSmallButton" onclick="mtbCartRest(${data.id})"><i class="bi bi-dash-lg"></i></button>
                <button class="mtbSmallButton" onclick="mtbDelete(${data.id})"><i class="bi bi-trash-fill"></i></button>
            </div>
    `;
        cart.appendChild(div);
    });

    if (data2 > 100000) {
        data3 = 0;
    } else {
        data3 = 100000;
    }
    data4 = data2 + data3;

    mtbDataCart.style.display = "block";
    mtbDataCart.innerHTML =
        `
    <p>Cantidad: <span id="mtbDataPrice1">${data1}</span></p>
    <p>Subtotal: <span id="mtbDataPrice2">$${data2.toLocaleString('es-CO')}</span></p>
    <p>Envío: <span id="mtbDataPrice3">$${data3.toLocaleString('es-CO')}</span></p>
    <p><strong>Total: <span id="mtbDataPrice4">$${data4.toLocaleString('es-CO')}</span></strong></p>
    <button class="mtbSmallButton" style="display: inline-block; margin-right: 7px;" onclick="mtbDeleteAllCart()">Vaciar</button>
    <button class="mtbSmallButton" style="display: inline-block; margin-right: 7px;" onclick="mtbCartModalPay()">Pagar</button>
    `
}

// PASARELA DE PAGO: Solo visual
function mtbCartModalPay() {
    const mtbDiv = document.getElementById("mtbCartModalContent");
    const mtbPay = document.createElement("div");
    mtbUserCart = mtbUsersData.find(i => i.id == mtbUserValidate[0].id)
    const mtbUserCartList = mtbUserCart.cart
    mtbPay.className = "mtbPayModal";
    mtbPay.innerHTML =
        `
    <h3><i class="bi bi-bag-check"></i></h3>
    <h3>Pago realizado</h3>
    <p>Felicidades por tu compra, siéntete orgulloso ;)</p>
    <p>Puedes ver el tracking en tu perfil, así rastrearás tu pedido</p>
    <p>Productos comprados:</p>
    `
    mtbUserCartList.forEach(i => {
        const p = mtbCatalog.find(p => p.id == i.id);
        mtbPay.innerHTML += `<p class="mtbPayDetail"><i class="bi bi-dot"></i>${p ? p.title : 'Producto desconocido'} <strong>X${i.amount}</strong></p>`
    })
    mtbPay.innerHTML +=
        `
    <p>Datos de entrega:</p>
    <p class="mtbPayDetail"><i class="bi bi-dot"></i>Titular: ${mtbUserCart.name}</p>
    <p class="mtbPayDetail"><i class="bi bi-dot"></i>${mtbUserCart.address}</p>
    <p class="mtbPayDetail"><i class="bi bi-dot"></i>Teléfono: ${mtbUserCart.phone}</p>
    `
    mtbDiv.appendChild(mtbPay)
    setTimeout(() => {
        mtbPay.style.display = "none";
        mtbCartModalClick();
    }, 5000);
}

// Modal de Carrito, abrir y cerrar
function mtbCartModalClick() {
    const mtbCartModalMenu = document.getElementById("mtbCartModal");
    mtbCartModalMenu.classList.toggle("mtbViewNone");
}

// PANELES: Lógica de Paneles Admin/User
function mtbPanelUserCart() {
    const mtbUserData = mtbUsersData.find(i => i.id === mtbUserValidate[0].id);
    const mtbName = document.getElementById("mtbPanelWelcome");
    const mtbMail = document.getElementById("mtbPanelMail");
    const mtbAddress = document.getElementById("mtbPanelAddress");
    const mtbPhone = document.getElementById("mtbPanelPhone");
    mtbName.textContent = `${mtbUserData.name}`
    mtbMail.textContent = `${mtbUserData.mail}`
    mtbAddress.textContent = `${mtbUserData.address}`
    mtbPhone.textContent = `${mtbUserData.phone}`
    const cart = document.getElementById("mtbPanelUserCart");
    mtbUserCart = mtbUsersData.find(i => i.id == mtbUserValidate[0].id)
    const mtbUserCartList = mtbUserCart.cart
    cart.innerHTML = "";
    if (mtbUserCartList.length === 0) {
        return;
    }

    mtbUserCartList.forEach(i => {
        const data = mtbCatalog.find(e => e.id === i.id)
        const div = document.createElement("div");
        div.className = "mtbPanelUserCartCard";
        const mtbTotal = data.price * i.amount;
        div.innerHTML =
            `
            <img src="${data.img}" alt="${data.title}">
            <p>${data.title}</p>
            <p>${data.type}</p>
            <p>$${data.price.toLocaleString('es-CO')}</p>
            <p>${i.amount}</p>
            <p>$${mtbTotal.toLocaleString('es-CO')}</p>
    `;
        cart.appendChild(div);
    });
}

function mtbPanelAdminCart() {
    const mtbUserData = mtbUsersData.find(i => i.id === mtbUserValidate[0].id);
    const mtbName = document.getElementById("mtbPanelWelcome");
    const mtbMail = document.getElementById("mtbPanelMail");
    const mtbAddress = document.getElementById("mtbPanelAddress");
    const mtbPhone = document.getElementById("mtbPanelPhone");
    mtbName.textContent = `${mtbUserData.name}`
    mtbMail.textContent = `${mtbUserData.mail}`
    mtbAddress.textContent = `${mtbUserData.address}`
    mtbPhone.textContent = `${mtbUserData.phone}`
    mtbCatalog = JSON.parse(localStorage.getItem("mtbCatalog")) || [];
    const cart = document.getElementById("mtbPanelAdminCart");
    cart.innerHTML = "";
    if (mtbCatalog.length === 0) {
        return;
    }

    mtbCatalog.forEach(data => {
        const div = document.createElement("div");
        div.className = "mtbPanelUserCartCard";
        div.innerHTML =
            `
            <img src="${data.img}" alt="${data.title}">
            <p>${data.id}</p>
            <p>${data.title}</p>
            <p>$${data.price.toLocaleString('es-CO')}</p>
            <p>Stock: ${data.stock}</p>
            <p>${data.category}</p>
            <p>${data.type}</p>
            <button onclick="mtbCRUD(${data.id})" class="mtbSmallButton">Modificar</button>
            <button onclick="mtbCRUDDelete(${data.id})" class="mtbSmallButton">Eliminar</button>
    `;
        cart.appendChild(div);
    });
}

function mtbCRUDClose() {
    const mtbPanel = document.getElementById("mtbPanelAdminCRUD");
    mtbPanel.style.display = "none";
}

function mtbCRUD(mtbData) {
    const mtbPanel = document.getElementById("mtbPanelAdminCRUD");
    mtbPanel.style.display = "block";
    window.location.hash = "mtbPanelControl";
    mtbPanel.innerHTML = ``
    mtbPanel.innerHTML =
        `
    <button class="mtbSmallButton" style="float: right;" onclick="mtbCRUDClose()"><i class="bi bi-x-lg"></i></button>
    <p id="myCatalogFormText"></p>
    <form id="mtbFormPanel">
        <label for="myCatalogFormImage">Imágen<br>
        <input type="file" name="img" id="myCatalogFormImage" style=" display: none;"><div class="mtbSmallButton" style="display: inline-block; margin: 7px 7px 0 0;">Selecciona archivo</div><span id="myCatalogFormImageLabel">Nada seleccionado</span></label>
        <label for="myCatalogFormTitle">Título<br>
        <input type="text" name="title" id="myCatalogFormTitle" value=""></label>
        <label for="myCatalogFormPrice">Precio<br>
        <input type="number" name="price" id="myCatalogFormPrice" value=""></label>
        <label for="myCatalogFormStock">Stock<br>
        <input type="number" name="stock" id="myCatalogFormStock" value=""></label>
        <label for="myCatalogFormDescription">Descripción<br>
        <input type="text" name="description" id="myCatalogFormDescription" value=""></label>
        <label for="myCatalogFormCategory">Categoría<br>
        <select name="category" id="myCatalogFormCategory">
            <option value="bicicleta">Bicicleta</option>
            <option value="accesorio">Accesorio</option>
        </select></label>
        <label for="myCatalogFormType">Tipo (Sin alcance)<br>
        <select name="type" id="myCatalogFormType">
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="unisex">Unisex</option>
        </select></label>
        <button class="mtbSmallButton" type="submit"><i class="bi bi-send-fill"></i> <strong>Enviar</strong></button>
    </form>
    `

    // Variables por elemento
    let form = document.getElementById("mtbFormPanel");
    let text = document.getElementById("myCatalogFormText");
    let img = document.getElementById("myCatalogFormImage");
    let imgLabel = document.getElementById("myCatalogFormImageLabel");
    let title = document.getElementById("myCatalogFormTitle");
    let price = document.getElementById("myCatalogFormPrice");
    let stock = document.getElementById("myCatalogFormStock");
    let description = document.getElementById("myCatalogFormDescription");
    let category = document.getElementById("myCatalogFormCategory");
    let type = document.getElementById("myCatalogFormType");
    if (mtbData) {
        const mtbInfo = mtbCatalog.find(i => i.id == mtbData);
        text.innerHTML = `<strong>Estás modificando ${mtbInfo.title} (ID: ${mtbInfo.id}, DESC: ${mtbInfo.description})</strong>.<br>Si estás segur@ de hacerlo, modifica los valores a continuación, de lo contrario, cancela.`;
        imgLabel.innerText = mtbInfo.img;
        title.value = mtbInfo.title;
        price.value = mtbInfo.price;
        description.value = mtbInfo.description;
        category.value = mtbInfo.category;
        type.value = mtbInfo.type;
        stock.value = mtbInfo.stock;
    } else {
        text.innerHTML = `<strong>Estás creando un producto nuevo</strong>.<br>Siéntete libre de crear ;)`;
    }
    img.addEventListener("change", () => {
        if (img.files.length > 0) {
            imgLabel.textContent = image.files[0].name;
        } else {
            imgLabel.textContent = "Nada seleccionado";
        }
    });
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (title.value && price.value && description.value && category.value && type.value && stock.value) {
            const mtbInfo = mtbCatalog.find(i => i.id == mtbData);
            let id = mtbInfo ? mtbInfo.id : parseInt(Date.now());
            img = mtbInfo ? mtbInfo.img : "img.png";
            title = title.value;
            price = parseInt(price.value);
            description = description.value;
            category = category.value;
            type = type.value;
            stock = stock.value;
            if (mtbData) {
                const producto = mtbCatalog.map(u => u.id === mtbData ? { id, img, title, price, description, category, type, stock } : u);
                localStorage.setItem("mtbCatalog", JSON.stringify(producto));
                mtbAlert(4);
                mtbCRUDClose();
            } else {
                const producto = JSON.parse(localStorage.getItem("mtbCatalog")) || [];
                producto.push({ id, img, title, price, description, category, type, stock });
                localStorage.setItem("mtbCatalog", JSON.stringify(producto));
                mtbAlert(5);
                mtbCRUDClose();
            }
            mtbPanelAdminCart();
            form.reset();
        } else {
            mtbAlert(6);
        }
    })
}

function mtbCRUDDelete(mtbData) {
    const index = mtbCatalog.findIndex(i => i.id == mtbData);
    mtbCatalog.splice(index, 1)
    localStorage.setItem("mtbCatalog", JSON.stringify(mtbCatalog));
    mtbPanelAdminCart();
    mtbAlert(7);
}



// ALERTAS: Sección de Alertas
function mtbAlert(mtbAlertData) {
    const mtbNavAlert = document.getElementById("mtbNavAlert");
    const mtbNavAlertText = document.getElementById("mtbNavAlertText");
    mtbNavAlert.style.display = "inline-block";
    switch (mtbAlertData) {
        case 1:
            mtbNavAlertText.textContent = "Recuerda iniciar sesión para agregar productos al carrito";
            break;
        case 2:
            mtbNavAlertText.textContent = "Tienes que iniciar sesión para agregar productos, te redirigeremos para el logueo ;)";
            break;
        case 3:
            mtbNavAlertText.textContent = "Producto agregado correctamente. Verifica desde Menú > Carrito";
            break;
        case 4:
            mtbNavAlertText.textContent = "Elemento del Catálogo MODIFICADO exitosamente";
            break;
        case 5:
            mtbNavAlertText.textContent = "Elemento del Catálogo AGREGADO exitosamente";
            break;
        case 6:
            mtbNavAlertText.textContent = "ADMIN, para MODIFICAR/AGREGAR debes ingresar todos los datos";
            break;
        case 7:
            mtbNavAlertText.textContent = "Elemento del Catálogo ELIMINADO exitosamente";
            break;
        case 8:
            mtbNavAlertText.textContent = "APARTADO EN CONSTRUCCIÓN. Pronto podrás cambiar tu contraseña ;)";
            break;
        case 9:
            mtbNavAlertText.textContent = "Se ha borrado todo el carrito con éxito <3";
            break;
        case 10:
            mtbNavAlertText.textContent = "Lo sentimos, este artículo tiene stock agotado";
            break;
        default:
            mtbNavAlertText.textContent = "Alerta de prueba";;
    }
    setTimeout(() => {
        mtbNavAlert.style.display = "none";
    }, 5000)
}

// Construcción [Funcionalidades PRO]
function mtbUserChangePassword() {
    mtbAlert(8);
}
function mtbLogOut() {
    mtbUserValidate.splice(0, mtbUserValidate.length);
    localStorage.setItem("mtbCheck", JSON.stringify(mtbUserValidate));
    window.location.href = "catalog.html";
}

window.mtbBurguerClick = mtbBurguerClick;
window.mtbCartModalClick = mtbCartModalClick;
window.mtbCartAdd = mtbCartAdd;
window.mtbCartAddMore = mtbCartAddMore;
window.mtbCartRest = mtbCartRest;
window.mtbDelete = mtbDelete;
window.mtbDeleteAllCart = mtbDeleteAllCart;

// Paneles
window.mtbPanelUserCart = mtbPanelUserCart;
window.mtbPanelAdminCart = mtbPanelAdminCart;
window.mtbCRUD = mtbCRUD;
window.mtbCRUDClose = mtbCRUDClose;
window.mtbCRUDDelete = mtbCRUDDelete;

// Apartados en Construcción
window.mtbUserChangePassword = mtbUserChangePassword;
window.mtbCartModalPay = mtbCartModalPay;
window.mtbLogOut = mtbLogOut;