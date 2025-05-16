'use strict';

const listaUl = document.querySelector(".js-listado"); 
const input = document.querySelector(".js-input")
const btnFind = document.querySelector(".js-btn-form")
const carrito = [];
let allProducts = [];

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
    
    //Añadir al carrito
    carrito.push(productClick); 
    renderCarrito();

    //Seleccionamos la UL del carrito

    const carritoUl = document.querySelector(".js-carrito")

    //Queremos que nos pinte los productos en el carrito
   //Sustituir imagen si no hay
    let imageURL;

    if (!productClick.image) {
        imageURL = "https://placehold.co/600x400";
        } else {
        imageURL = productClick.image;
    }

    carritoUl.innerHTML += `
        <li class="product-card">
        <img src="${imageURL}" alt="${productClick.title}" />
        <p>${productClick.title}</p>
        <p>${productClick.price} €</p>
        <button class="product-card__btn">Eliminar</button>
        </li>`;
 }

 function renderCarrito() {
    const carritoUl = document.querySelector(".js-carrito");
    carritoUl.innerHTML = "";
  
    for (const product of carrito) {
      carritoUl.innerHTML += `
        <li class="carrito__item">
          <p>${product.title}</p>
          <p>${product.price} €</p>
        </li>
      `;
    }
  
    // Mostramos el aside si estaba oculto
    const carritoContainer = document.querySelector(".js-carrito-container");
    carritoContainer.classList.remove("hidden");
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

fetch (url)
.then(response =>response.json())
.then(products => {
    console.log(products)
    allProducts = products;
    renderProductos(products)
})