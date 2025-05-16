'use strict';

const listaUl = document.querySelector(".js-listado"); 
const input = document.querySelector(".js-input")
const btnFind = document.querySelector(".js-btn-form")

console.log('>> Ready :)');



let url = "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";

//funciones (del infierno)
function renderProductos (listaProductos) {
    listaUl.innerHTML = "";

        for (let product of listaProductos) {
            let imageURL;
    
            if (!product.image){
                imageURL = "https://placehold.co/600x400";
            }else {
                imageURL = product.image;
            }    
        
            listaUl.innerHTML += `<li class="product-card">
            <img src= "${product.image}" alt= ${product.title}/>
            <p> ${product.title}</p>
            <p> ${product.price}</p>
            </li>`; 
        }    
        
}

let allProducts = []; //variable global de todos los productos

function handleClickFind(event){
    event.preventDefault();

    let valueFind = input.value;

    const productsFiltrados = allProducts.filter(productItem => productItem.title.toLowerCase().includes(valueFind.toLowerCase()));
    console.log(productsFiltrados); // 👈 esto sí funciona
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