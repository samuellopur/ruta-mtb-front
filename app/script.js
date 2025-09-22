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
    if (window.location.pathname === ("/pages/catalog.html")) {
        console.log("Estás en la página de carrito");
        mtbViewCatalog(mtbCatalog);
    }
    if (window.location.pathname === ("/pages/user.html")) {
        console.log("Estás en la página de usuario");
        mtbPanelUserCart();
    }
    if (window.location.pathname === ("/pages/admin.html")) {
        console.log("Estás en la página de admin");
        mtbPanelAdminCart();
    }
    if (!window.location.pathname === ("/pages/login.html") || mtbUserValidate[0].id === 1) {
        console.log("No se cargará el carrito por condiciones de la página");
        mtbCartRefresh();
    }
    if (window.location.pathname === ("/pages/login.html")) {
        console.log("Estás en la página de login");
        mtbLoadContent('mtbLogin');
    }
    if (window.location.pathname === ("/pages/index.html")) {
        console.log("Estás en la página de inicio");
        mtbIndexFunction();
    }
    mtbLoadNav();

})

// Carga de NavBar por INNER
function mtbLoadNav() {
    const mtbNav = document.getElementById("mtbNav");
    mtbNav.innerHTML =
        `
    <div class="mtbNavLogo">
            <img src="../img/MTB_NEWLOGO.png" alt="Logo de Ruta MTB">
        </div>
        <div>
            <a href="#" id="mtbNavBurguer" class="mtbNavBurguer" onclick="mtbBurguerClick()"><span><i class="bi bi-list"></i></span></a>
        </div>
        <div class="mtbNavLink" id="mtbNavLink">
            <a href="/pages/index.html"><span>Inicio</span></a>
            <a href="/pages/catalog.html"><span>Catálogo</span></a>
            <a href="/pages/contact.html"><span>Contacto</span></a>
            <a href="/pages/about.html"><span>Conocenos</span></a>
            <a id="mtbLinkTextHref" href="#"><span id="mtbLinkTextUser">Cargando...</span></a>
            <a id="mtbLinkEspecial" href="#" onclick="mtbCartModalClick(); mtbBurguerClick();"><span>Carrito</span></a>
        </div>
        <div class="mtbNavAlert animate__animated animate__fadeIn" id="mtbNavAlert">
            <p id="mtbNavAlertText"></p>
        </div>
    `
    mtbNavValidate();
}

// DIV: Mostrar/Ocultar div específico 
function mtbToggleDiv(mtbData) {
    const div = document.getElementById(`${mtbData}`);
    div.classList.toggle("mtbViewNone");
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

// INICIO (Index): Funciones para ver lo último agregado y lo más vendido
function mtbIndexFunction() {
    const div1 = document.getElementById("mtbIndexReferencesNew");
    div1.innerHTML = ``
    const div1Content = mtbCatalog.slice(-3).reverse();
    div1Content.forEach(i => {
        const newDiv1 = document.createElement('div');
        newDiv1.className = "mtbCataCard";
        newDiv1.classList.add("animate__animated", "animate__fadeIn");
        newDiv1.innerHTML =
            `
            <p class="mtbCataTag">${i.type}</p>
            <p class="mtbCataTag">${i.category}</p>
            <img src="${i.img}" alt="${i.title}">
            <h3>${i.title}</h3>
            <p>${i.description}</p>
        `
        div1.appendChild(newDiv1);
    })

    const div2 = document.getElementById("mtbIndexReferencesSelled");
    div2.innerHTML = ``
    const div2Content = [];
    mtbUsersData.forEach(user => {
        user.purchase.forEach(purchase => {
            const mtbUserPurchaseList = purchase.cartList || [];

            if (mtbUserPurchaseList.length !== 0) {
                mtbUserPurchaseList.forEach(i => {
                    const mtbExist = div2Content.find(e => e.id == i.id);
                    if (mtbExist) {
                        mtbExist.amount += i.amount;
                    } else {
                        div2Content.push({ id: i.id, amount: i.amount });
                    }
                });
            }
        });
    });

    div2Content.sort((a, b) => b.amount - a.amount);
    console.log(div2Content)
    if (div2Content.length >= 3) {
        div2Content.forEach(i => {
        const product = mtbCatalog.find(e => e.id == i.id)
        const newDiv2 = document.createElement('div');
        let amountSelled;
        if (i.amount >= 1 && i.amount < 4) {
            amountSelled = `Ventas +1`
        } else if (i.amount >= 5) {
            amountSelled = `Ventas +5`
        }
        newDiv2.className = "mtbCataCard";
        newDiv2.classList.add("animate__animated", "animate__fadeIn");
        newDiv2.innerHTML =
            `
            <p class="mtbCataTag">${product.type}</p>
            <p class="mtbCataTag">${product.category}</p>
            <img src="${product.img}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="mtbCataSelled">${amountSelled}</p>
        `
        div2.appendChild(newDiv2);
    })
    } else {
        const newDiv2 = document.createElement('div');
        newDiv2.className = "mtbCataCard";
        newDiv2.classList.add("animate__animated", "animate__fadeIn");
        newDiv2.innerHTML =
            `
            <p class="mtbCataTag">Anuncio</p>
            <img src="/img/IMG_003.png" alt="Anuncio">
            <h3>¡Ayúdanos a crecer!</h3>
            <p>El apartado se complementará con más compras de los usuarios</p>
        `
        div2.appendChild(newDiv2);
    }




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
        mtbDiv.classList.add("animate__animated", "animate__fadeIn");
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
    if (mtbUserValidate[0].id === 1) { mtbAlert(1); return; }
    if (!mtbUserCart || mtbUserValidate[0].verification === false) {
        mtbAlert(2);
        return;
    }
    const index = mtbCatalog.find(i => i.id == mtbData);
    const amount = 1;
    if (index) {
        const mtbExist = mtbUserCart.cart.find(i => i.id == mtbData);
        if (index.stock >= amount) {
            if (mtbExist) {
                mtbExist.amount += amount;
            } else {
                mtbUserCart.cart.push({ id: parseInt(index.id), amount });
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
    <button class="mtbSmallButton" style="display: inline-block; margin-right: 7px;" onclick="mtbBuy()">Pagar</button>
    `
}

// PASARELA DE PAGO: Solo visual
function mtbCartModalPay(cartOk, cartDelete) {
    const mtbDiv = document.getElementById("mtbCartModalContent");
    const mtbPay = document.createElement("div");
    mtbUserCart = mtbUsersData.find(i => i.id == mtbUserValidate[0].id)
    mtbPay.className = "mtbPayModal";
    mtbPay.innerHTML =
        `
    <h3><i class="bi bi-bag-check"></i></h3>
    <h3>Pago realizado</h3>
    <p>Felicidades por tu compra, siéntete orgulloso ;)</p>
    <p>Puedes ver el tracking en tu perfil, así rastrearás tu pedido</p>
    <p>Productos comprados:</p>
    `
    cartOk.forEach(i => {
        const p = mtbCatalog.find(p => p.id == i.id);
        mtbPay.innerHTML += `<p class="mtbPayDetail"><i class="bi bi-dot"></i>${p ? p.title : 'Producto desconocido'} <strong>X${i.amount}</strong></p>`
    })
    mtbPay.innerHTML +=
        `
    <p>Si existen algunos productos eliminados por falta de stock los verás aquí abajo</p>
    `
    cartDelete.forEach(i => {
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
        mtbDeleteAllCart();
    }, 5000);
}

// Modal de Carrito, abrir y cerrar
function mtbCartModalClick() {
    const mtbCartModalMenu = document.getElementById("mtbCartModal");
    mtbCartModalMenu.classList.toggle("mtbViewNone");
    mtbCartRefresh();
}

// VENTA/PAY: Lógica al momento de la compra
function mtbBuy() {
    mtbUserCart = mtbUsersData.find(i => i.id == mtbUserValidate[0].id)
    if (!mtbUserCart || mtbUserCart.cart.length === 0) {
        mtbAlert();
        return;
    }
    const cart = mtbUserCart.cart
    const idPurchase = Date.now();
    const ahora = new Date();
    const date = `${String(ahora.getDate()).padStart(2, '0')}/${String(ahora.getMonth() + 1).padStart(2, '0')}/${ahora.getFullYear()}`;
    const status = "Empaquetando";
    let pay = 0;
    const cartList = [];
    const cartDelete = [];
    // const mtbExist = mtbUserCart.cart.find(i => i.id == mtbData);
    cart.forEach(e => {
        const index = mtbCatalog.find(i => i.id == e.id);
        if (index.stock >= e.amount) {
            const sumPay = index.price * e.amount;
            pay += sumPay;
            cartList.push(e);
            index.stock -= e.amount;
        } else {
            cartDelete.push(e);
        }
    })
    mtbCartModalPay(cartList, cartDelete);
    mtbUserCart.purchase.push({ idPurchase, date, status, pay, cartList });
    localStorage.setItem("mtbUsers", JSON.stringify(mtbUsersData));
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
    const purchase = document.getElementById("mtbPanelUserPurchase");
    const mtbUserPurchaseList = mtbUserCart.purchase;
    purchase.innerHTML = "";

    if (mtbUserCartList.length != 0) {
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

    if (mtbUserPurchaseList.length != 0) {
        mtbUserPurchaseList.forEach(i => {
            const div = document.createElement("div");
            div.className = "mtbPanelUserPurchaseCard";
            div.innerHTML =
                `
            <p class="mtbPurchaseFirstInfo"><strong>ID: </strong><span>${i.idPurchase}</span>. <strong>Fecha: </strong><span>${i.date}</span>.  <strong>Pagado: </strong>$<span>${i.pay.toLocaleString('es-CO')}</span>.  <strong>Estado: </strong><span>${i.status}</span>.</p>
        `;
            const mtbProductsOfPurchase = i.cartList
            mtbProductsOfPurchase.forEach(u => {
                const data = mtbCatalog.find(e => e.id === u.id);
                const div2 = document.createElement("div");
                div2.className = "mtbPurchaseSecondInfo";
                div2.innerHTML =
                    `
                <img src="${data.img}" alt="${data.title}">
                <p><span>${data.title}</span> X<span>${u.amount}</span></p>
            `;
                div.appendChild(div2);
            })

            purchase.appendChild(div);
        });
    }
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

    const purchase = document.getElementById("mtbPanelUserPurchase");
    purchase.innerHTML = ``
    let amount = 0;
    mtbUsersData.forEach(user => {
        const mtbUserPurchaseList = user.purchase;
        if (mtbUserPurchaseList.length != 0) {
            mtbUserPurchaseList.forEach(i => {
                const div = document.createElement("div");
                div.className = "mtbPanelUserPurchaseCard";
                div.innerHTML =
                    `
            <p class="mtbPurchaseFirstInfo"><strong>ID: </strong><span>${i.idPurchase}</span>. <strong>Fecha: </strong><span>${i.date}</span>.  <strong>Pagado: </strong>$<span>${i.pay.toLocaleString('es-CO')}</span>.  <strong>Estado: </strong><span>${i.status}</span>. <strong>Comprado por: </strong><span>${user.name}</span>.</p></p>
        `;
                const mtbProductsOfPurchase = i.cartList
                mtbProductsOfPurchase.forEach(u => {
                    const data = mtbCatalog.find(e => e.id === u.id);
                    const div2 = document.createElement("div");
                    div2.className = "mtbPurchaseSecondInfo";
                    div2.innerHTML =
                        `
            <img src="${data.img}" alt="${data.title}">
            <p><span>${data.title}</span> X<span>${u.amount}</span></p>
        `;
                    div.appendChild(div2);
                })

                purchase.appendChild(div);
                amount += i.pay;
            });
            const divAmount = document.getElementById("mtbAmountTotal");
            divAmount.innerText = amount.toLocaleString('es-CO');
        }
    })

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
            img = mtbInfo ? mtbInfo.img : "/img/IMG_003.png";
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

// LOGIN/REGISTRO: Lógica
function mtbTogglePass(id, toggle) {
    const password = document.getElementById(id);
    const icon = toggle.querySelector('i');
    if (password.type === 'password') {
        password.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        password.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

function mtbFormFocus(mtbReference) {
    const reference = document.getElementById(`${mtbReference}`);
    reference.addEventListener("focus", () => mtbValidate(mtbReference));
    reference.addEventListener("input", () => mtbValidate(mtbReference));
}

function mtbFormSubmit(mtbTypeForm) {
    const name = document.getElementById('mtbToggleName');
    const surname = document.getElementById('mtbToggleSurname');
    const mail = document.getElementById('mtbToggleMail');
    const pass = document.getElementById('mtbTogglePass');
    const check = document.getElementById("mtbLoginCheckValidation");
    let div;

    if (mtbTypeForm === "mtbRegister") {
        if (mtbValidate('mtbToggleName') && mtbValidate('mtbToggleSurname') && mtbValidate('mtbToggleMail') && mtbValidate('mtbTogglePass') && mtbValidate('mtbTogglePassConfirm')) {
            const mtbData = {
                id: Date.now(),
                name: name.value,
                surname: surname.value,
                mail: mail.value,
                password: pass.value,
                address: " ",
                phone: " ",
                role: 2,
                cart: [],
                purchase: []
            };
            mtbFormHandle(mtbTypeForm, mtbData);
        } else {
            check.innerHTML = "";
            div = document.createElement("p");
            div.textContent = "Algún dato está mal, recuerda revisar las validaciones"
            check.appendChild(div);
        }
    }

    if (mtbTypeForm === "mtbLogin") {
        if (mtbValidate('mtbToggleMail') && mtbValidate('mtbTogglePass')) {
            const mtbData = {
                mail: mail.value,
                password: pass.value,
            };
            mtbFormHandle(mtbTypeForm, mtbData);
        } else {
            check.innerHTML = "";
            div = document.createElement("p");
            div.textContent = "Algún dato está mal, recuerda revisar las validaciones"
            check.appendChild(div);
        }
    }
}

function mtbFormHandle(mtbType, mtbData) {
    let users = JSON.parse(localStorage.getItem('mtbUsers')) || [];

    if (mtbType === "mtbRegister") {
        if (users.some(u => u.mail === mtbData.mail)) {
            mtbAlert(11);
            return;
        }
        users.push(mtbData);
        localStorage.setItem('mtbUsers', JSON.stringify(users));
        mtbAlert(12);
        window.location.href = 'catalog.html';
        mtbFormHandle("mtbLogin", mtbData)
    }

    if (mtbType === "mtbLogin") {
        const user = users.find(u => u.mail === mtbData.mail && u.password === mtbData.password);
        if (!user) {
            mtbAlert(13);
            return;
        }
        const mtbValidateUser = [{
            id: user.id,
            verification: true
        }];
        localStorage.setItem("mtbCheck", JSON.stringify(mtbValidateUser));
        window.location.href = 'catalog.html';

    }
}

function mtbValidate(mtbReference) {
    const name = document.getElementById('mtbToggleName') || "";
    const surname = document.getElementById('mtbToggleSurname') || "";
    const confirm = document.getElementById('mtbTogglePassConfirm') || "";
    const check = document.getElementById("mtbLoginCheckValidation") || "";
    const mail = document.getElementById('mtbToggleMail');
    const pass = document.getElementById('mtbTogglePass');
    check.innerHTML = "";
    let valid = true;
    let div;

    if (mtbReference === name.id) {
        if (!/^\S{1,50}$/.test(name.value)) {
            div = document.createElement("p");
            div.textContent = "Nombre: Sin espacios y máximo 50 carácteres"
            check.appendChild(div);
            valid = false;
        }

        return valid;
    }

    if (mtbReference === surname.id) {
        if (!/^\S{1,50}$/.test(surname.value)) {
            div = document.createElement("p");
            div.textContent = "Apellido: Sin espacios y máximo 50 carácteres"
            check.appendChild(div);
            valid = false;
        }

        return valid;
    }

    if (mtbReference === mail.id) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value)) {
            div = document.createElement("p");
            div.textContent = "Verifica el correo. Ejemplo: user@rutamtb.com"
            check.appendChild(div);
            valid = false;
        }

        return valid;
    }

    if (mtbReference === pass.id) {
        if (pass.value.length < 8) {
            div = document.createElement("p");
            div.textContent = "Mínimo 8 carácteres"
            check.appendChild(div);
            valid = false;
        }

        if (!/\d/.test(pass.value)) {
            div = document.createElement("p");
            div.textContent = "Al menos un número"
            check.appendChild(div);
            valid = false;
        }

        if (!/[!@#$%^&*]/.test(pass.value)) {
            div = document.createElement("p");
            div.textContent = "Al menos un carácter especial (!@#$%^&*)"
            check.appendChild(div);
            valid = false;
        }

        if (!/[A-Z]/.test(pass.value)) {
            div = document.createElement("p");
            div.textContent = "Al menos una mayúscula"
            check.appendChild(div);
            valid = false;
        }

        return valid;
    }

    if (mtbReference === confirm.id) {
        if (pass.value !== confirm.value) {
            div = document.createElement("p");
            div.textContent = "Las contraseñas no coinciden"
            check.appendChild(div);
            valid = false;
        }

        return valid;
    }

}

function mtbLoadContent(mtbData) {
    const mtbLoginForm = document.getElementById("mtbLoginForm");
    mtbLoginForm.innerHTML = ``
    if (mtbData === "mtbRegister") {
        mtbLoginForm.innerHTML =
            `
        <input type="text" name="mail" id="mtbToggleName" placeholder="Nombre" onfocus="mtbFormFocus('mtbToggleName')">
        <input type="text" name="mail" id="mtbToggleSurname" placeholder="Apellido" onfocus="mtbFormFocus('mtbToggleSurname')">
        <input type="text" name="mail" id="mtbToggleMail" placeholder="Correo electrónico" onfocus="mtbFormFocus('mtbToggleMail')">
        <input type="password" name="pass" id="mtbTogglePass" placeholder="Contraseña" onfocus="mtbFormFocus('mtbTogglePass')">
        <span class="mtbTogglePass" onclick="mtbTogglePass('mtbTogglePass', this)">
            <i class="bi bi-eye"></i>
        </span>
        <input type="password" name="pass" id="mtbTogglePassConfirm" placeholder="Confirmar Contraseña" onfocus="mtbFormFocus('mtbTogglePassConfirm')">
        <span class="mtbTogglePass" onclick="mtbTogglePass('mtbTogglePassConfirm', this)">
            <i class="bi bi-eye"></i>
        </span>
        <div class="mtbLoginCheckValidation" id="mtbLoginCheckValidation"></div>
        <button type="button" onclick="mtbFormSubmit('mtbRegister')">Registrarse</button>
        <p>¿Ya tienes cuenta? <a href="#" onclick="mtbLoadContent('mtbLogin')">Iniciar Sesión</a></p>
        `
        return;
    }
    if (mtbData === "mtbLogin") {
        mtbLoginForm.innerHTML =
            `
        <input type="text" name="mail" id="mtbToggleMail" placeholder="Correo electrónico" onfocus="mtbFormFocus('mtbToggleMail')">
        <input type="password" name="pass" id="mtbTogglePass" placeholder="Contraseña" onfocus="mtbFormFocus('mtbTogglePass')">
        <span class="mtbTogglePass" onclick="mtbTogglePass('mtbTogglePass', this)">
            <i class="bi bi-eye"></i>
        </span>
        <div class="mtbLoginCheckValidation" id="mtbLoginCheckValidation"></div>
        <button type="button" onclick="mtbFormSubmit('mtbLogin')">Iniciar sesión</button>
        <p>¿No tienes cuenta? <a href="#" onclick="mtbLoadContent('mtbRegister')">Regístrarse</a></p>
        `
        return;
    }

}


// ALERTAS: Sección de Alertas
function mtbAlert(mtbAlertData) {
    const mtbNavAlert = document.getElementById("mtbNavAlert");
    const mtbNavAlertText = document.getElementById("mtbNavAlertText");
    mtbNavAlert.style.display = "inline-block";
    switch (mtbAlertData) {
        case 1:
            mtbNavAlertText.textContent = "Eres administrador, no puedes comprar de tu propia tienda";
            break;
        case 2:
            mtbNavAlertText.textContent = "Tienes que iniciar sesión para agregar productos";
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
        case 11:
            mtbNavAlertText.textContent = "El correo que escribiste ya se encuentra en uso, inténtalo nuevamente";
            break;
        case 12:
            mtbNavAlertText.textContent = "Usuario CREADO exitosamente";
            break;
        case 13:
            mtbNavAlertText.textContent = "Datos incorrecto, revisa o en su defecto regístrate";
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

window.mtbToggleDiv = mtbToggleDiv;
window.mtbBurguerClick = mtbBurguerClick;
window.mtbCartModalClick = mtbCartModalClick;
window.mtbCartAdd = mtbCartAdd;
window.mtbCartAddMore = mtbCartAddMore;
window.mtbCartRest = mtbCartRest;
window.mtbDelete = mtbDelete;
window.mtbDeleteAllCart = mtbDeleteAllCart;
window.mtbBuy = mtbBuy;

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

// Login
window.mtbTogglePass = mtbTogglePass;
window.mtbFormFocus = mtbFormFocus;
window.mtbFormSubmit = mtbFormSubmit;
window.mtbFormHandle = mtbFormHandle;
window.mtbLoadContent = mtbLoadContent;
