'use strict';

const listaUl = document.querySelector(".js-listado"); 
const input = document.querySelector(".js-input")
const btnFind = document.querySelector(".js-btn-form")
const btnComprar = document.querySelector(".js-btnComprar")
const carrito = [];

console.log('>> Ready :)');

let url = "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";

//funciones (del infierno)

//Función para pintar un producto + sustituir img
function renderProduct(product){
    
    let imageURL;

    if (!product.image) {
        imageURL = "https://placehold.co/600x400";
     } else {
        imageURL = product.image;
    }

  return `
    <li class="js_producto_solo product-card" id="${product.id}">
      <img src="${imageURL}" alt="${product.title}" />
      <p>${product.title}</p>
      <p>${product.price}</p>
      <button class="product-card__btn">Comprar</button>
    </li>
  `;

}

//Estamos haciendo click en comprar de cada producto
function handleClickComprar(event){
    console.log(event.currentTarget.id); //ID del botón clicado

    let idClick = event.currentTarget.id; //Devuelve un "string" y necesitamos un número
    
    const id = parseInt(event.currentTarget.id); //lo convertimos a número

    //Añadir al carrito
    let productClick = allProducts.find(productItem => productItem.id === idClick);
    
    carrito.push(productClick); 

    //Queremos que nos pinte los productos en el carrito
        for (let product of carrito) {
         
            let imageURL;

                if (!product.image) {
                imageURL = "https://placehold.co/600x400";
                } else {
                imageURL = product.image;
            }

            return `
                <li class="js_producto_solo product-card" id="${product.id}">
                    <img src="${imageURL}" alt="${product.title}" />
                    <p>${product.title}</p>
                    <p>${product.price}</p>
                    <button class="product-card__btn">Comprar</button>
                </li>
            `;
    }

    

}

//function renderCarrito ()

//función de toda la lista de productos
function renderProductos (listaProductos) {

    listaUl.innerHTML = "";

    for (let product of listaProductos) {
        listaUl.innerHTML += renderProduct(product);
      }

    const renderProductos = document.querySelectorAll(".js_producto_solo")
    for(let product of renderProductos){
        product.addEventListener("click", handleClickComprar)
    }
}

let allProducts = []; //variable global de todos los productos

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
fetch (url)
.then(response =>response.json())
.then(products => {
    console.log(products)
    allProducts = products;
    renderProductos(products)
})