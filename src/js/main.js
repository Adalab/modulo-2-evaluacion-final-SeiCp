'use strict';

const listaUl = document.querySelector(".js-listado"); 
const input = document.querySelector(".js-input")
const btnFind = document.querySelector(".js-btn-form")

const carrito = []; //constante: porque no vamos a modificar el contenido--> carrito = otra cosa
let allProducts = []; //array vacío, luego le ponemos contenido en el fetch

console.log('>> Ready :)');

//funciones (del infierno)

//Función para pintar un producto + sustituir img
function renderProduct(product){
    
    let imageURL;

    if (!product.image) {
        imageURL = "https://placehold.co/600x400";
     } else {
        imageURL = product.image;
    }

    listaUl.innerHTML += 
        `<li class="product-card" id="${product.id}">
            <img src="${imageURL}" alt="${product.title}" />
            <p>${product.title}</p>
            <p>${product.price}</p>
            <button class="js-btn-comprar product-card__btn" id="${product.id}">Comprar</button>
         </li>`;
        }

//Estamos haciendo click en comprar de cada producto
function handleClickComprar(event){
    console.log(event.currentTarget.id); //ID del botón clicado
    
    const id = parseInt(event.currentTarget.id); //lo convertimos a número

    const productClick = allProducts.find(productItem => productItem.id === id);
    
    carrito.push(productClick); //Añadir al carrito
    
    renderCarrito(); //Pintamos el carito

    //Seleccionamos la UL del carrito

    const carritoUl = document.querySelector(".js-carrito")

 }

 function handleClickCerrar(event) {
    const id = parseInt(event.currentTarget.id);
  
    const index = carrito.findIndex(product => product.id === id);
    if (index !== -1) {
      carrito.splice(index, 1); // eliminamos el producto del array
      renderCarrito(); // volvemos a pintarlo
    }
  }

 function renderCarrito() {
    const carritoUl = document.querySelector(".js-carrito");
    carritoUl.innerHTML = "";
  
    for (const product of carrito) {
        let imageURL;

        if (!product.image) {
            imageURL = "https://placehold.co/600x400";
            } else {
            imageURL = product.image;
        }
    
        carritoUl.innerHTML += `
            <li class="product-card">
            <p class="js-btn-cerrar product-card__x" id="${product.id}" >x</p> 
            <img src="${imageURL}" alt="${product.title}" />
            <p>${product.title}</p>
            <p>${product.price}€</p>
            <button class="product-card__btn--eliminar">Eliminar</button>
            </li>`;
    }
  
    // Mostramos el aside si estaba oculto
    const carritoContainer = document.querySelector(".js-carrito-container");
    carritoContainer.classList.remove("hidden"); 

    //Añadimos el evento después de pintar/esconder el carrito
    //Creamos la constante para los botones cerrar
    const botonesCerrar = document.querySelectorAll(".js-btn-cerrar");

        for (const btnCerrar of botonesCerrar) {
            btnCerrar.addEventListener("click", handleClickCerrar);
        }
  }

//función de toda la lista de productos
function renderProductos(listaProductos) {

    listaUl.innerHTML = "";//Limpia la lista

    for (let product of listaProductos) {
        renderProduct(product);
      }

    const btnComprar = document.querySelectorAll(".js-btn-comprar")
    
    for(let btn of btnComprar){
        btn.addEventListener("click", handleClickComprar)
    }
}

function handleClickFind(event){
    //Limpiamos el form para que no se autorecargue
    event.preventDefault();

    //Accedemos al valor del input
    let valueFind = input.value;

    //Lo de las minús y las mayús en base a lo que escriba la usuaria
    const productsFiltrados = allProducts.filter(productItem => productItem.title.toLowerCase().includes(valueFind.toLowerCase()));
    console.log(productsFiltrados); 
    //Pintamos otra vez la función con los productos filtrados
    renderProductos(productsFiltrados);
}

btnFind.addEventListener("click", handleClickFind);


//carga los datos de la API
let url = "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";

//guarfamos las cosas en localStorage para facilitar la carga de la página
if (localStorage.getItem("productos") === null) {
    // Si no hay productos guardados, los pido con fetch
    fetch(url)
      .then(response => response.json())
      .then(products => {
        allProducts = products; // guardo en variable global, la tengo arriba
        localStorage.setItem("productos", JSON.stringify(products)); // y en localStorage
        renderProductos(allProducts);
      });
  } else {
    // Si ya hay productos guardados, los uso directamente
    allProducts = JSON.parse(localStorage.getItem("productos"));
    renderProductos(allProducts);
  }
