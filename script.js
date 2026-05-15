let imagenes = [];
let index = 0;

let categoriaActiva = "todos";


function abrirImagen(src) {
    const modal = document.getElementById("modal-img-grande");
    const img = document.getElementById("img-grande");

    index = imagenes.findIndex(im => im === src);

    if (index === -1) index = 0;

    img.src = imagenes[index];
    modal.style.display = "flex";
}

function cerrarImagen() {
    document.getElementById("modal-img-grande").style.display = "none";
}


function cambiarImagen(direccion) {
    index += direccion;

    if (index < 0) index = imagenes.length - 1;
    if (index >= imagenes.length) index = 0;

    const img = document.getElementById("modal-img");

    // 🔥 FORZAR REINICIO DE ANIMACIÓN
    img.classList.remove("fade");
    img.src = imagenes[index];

    setTimeout(() => {
        img.classList.add("fade");
    }, 10);
}

function cambiarImagenGrande(direccion) {
    index += direccion;

    if (index < 0) index = imagenes.length - 1;
    if (index >= imagenes.length) index = 0;

    const imgGrande = document.getElementById("img-grande");

    // 🔥 MISMO TRUCO
    imgGrande.classList.remove("fade-grande");
    imgGrande.src = imagenes[index];

    setTimeout(() => {
        imgGrande.classList.add("fade-grande");
    }, 10);

    // sincronizar pequeña
    document.getElementById("modal-img").src = imagenes[index];
}

// FILTRO POR CATEGORÍA
function filtrar(categoria) {

    categoriaActiva = categoria; // 🔥 NUEVO

    // 🔥 MANEJO DE BOTONES ACTIVOS
    const botones = document.querySelectorAll(".categoria");
    botones.forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    aplicarFiltros(); // 🔥 NUEVO
}

function aplicarFiltros() {
    let texto = document.getElementById("buscador").value.toLowerCase();

    let cards = document.querySelectorAll(".card");
    let mensaje = document.getElementById("sin-resultados");

    let hayResultados = false;

    cards.forEach(card => {
        let coincideTexto = card.innerText.toLowerCase().includes(texto);
        let coincideCategoria = categoriaActiva === "todos" || card.classList.contains(categoriaActiva);

        if (coincideTexto && coincideCategoria) {
            card.style.display = "";
            hayResultados = true;
        } else {
            card.style.display = "none";
        }
        
    });

    mensaje.style.display = hayResultados ? "none" : "block";
}

// BUSCADOR

document.getElementById("buscador").addEventListener("input", function() {

    aplicarFiltros();

});

// ANIMACIÓN CORREGIDA
const elementos = document.querySelectorAll('.fade-in');

function mostrarElementos() {
    elementos.forEach(el => {
        const pos = el.getBoundingClientRect().top;
        const altura = window.innerHeight;

        if (pos < altura - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
}

// MODAL
function abrirModal(nombre, desc, servicio, horario, ubicacion, contacto, imgs, wa, fb, ig) {

    imagenes = imgs;
    index = 0;
    document.getElementById("modal-img").src = imagenes[index];

    document.getElementById("modal").style.display = "flex";

    document.getElementById("modal-titulo").innerText = nombre;
    document.getElementById("modal-desc").innerText = desc;
    document.getElementById("modal-servicio").innerText = servicio;
    document.getElementById("modal-horario").innerText = horario;
    document.getElementById("modal-ubicacion").innerText = ubicacion;
    document.getElementById("modal-contacto").innerText = contacto;
    document.getElementById("modal-img").src = imagenes[index];

    document.querySelector(".whatsapp").href = wa;
    document.querySelector(".facebook").href = fb;
    document.querySelector(".instagram").href = ig;
    document.getElementById("modal-img").classList.add("fade");
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

// NAVBAR SCROLL EFECTO
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

window.addEventListener('load', mostrarElementos);
window.addEventListener('scroll', mostrarElementos);


const secciones = document.querySelectorAll("section");
const links = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    secciones.forEach(sec => {
        const top = sec.offsetTop - 100;
        const height = sec.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            current = sec.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("activo");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("activo");
        }
    });
});

// Cerrar precionando fuera del cuadro blanco
document.getElementById("modal").addEventListener("click", function(e) {
    if (e.target === this) {
        cerrarModal();
    }
});


// cerrar la imagen grande
document.getElementById("modal-img-grande").addEventListener("click", function(e) {
    if (e.target === this) {
        cerrarImagen();
    }
});



// ===== CARRUSEL HISTORIA =====
const slidesHistoria = document.querySelectorAll(".historia-carrusel .slide");

let indiceHistoria = 0;

function cambiarSlideHistoria() {
    if (slidesHistoria.length === 0) return;

    slidesHistoria[indiceHistoria].classList.remove("active");

    indiceHistoria++;
    if (indiceHistoria >= slidesHistoria.length) {
        indiceHistoria = 0;
    }

    slidesHistoria[indiceHistoria].classList.add("active");
}

// iniciar automático
setInterval(cambiarSlideHistoria, 4000);

// ===== MENÚ HAMBURGUESA =====

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {

    navLinks.classList.remove("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

});

document.addEventListener("click", (e) => {

    if (
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});

