const s=document.querySelector(".js-listado"),d=document.querySelector(".js-input"),u=document.querySelector(".js-btn-form"),c=[];let n=[];console.log(">> Ready :)");function p(t){let o;t.image?o=t.image:o="https://placehold.co/600x400",s.innerHTML+=`<li class="product-card" id="${t.id}">
            <img src="${o}" alt="${t.title}" />
            <p>${t.title}</p>
            <p>${t.price}</p>
            <button class="js-btn-comprar product-card__btn" id="${t.id}">Comprar</button>
         </li>`}function m(t){console.log(t.currentTarget.id);const o=parseInt(t.currentTarget.id),r=n.find(e=>e.id===o);c.push(r),a(),document.querySelector(".js-carrito")}function f(t){const o=parseInt(t.currentTarget.id),r=c.findIndex(e=>e.id===o);r!==-1&&(c.splice(r,1),a())}function a(){const t=document.querySelector(".js-carrito");t.innerHTML="";for(const e of c){let i;e.image?i=e.image:i="https://placehold.co/600x400",t.innerHTML+=`
            <li class="product-card">
            <p class="js-btn-cerrar product-card__x" id="${e.id}" >x</p> 
            <img src="${i}" alt="${e.title}" />
            <p>${e.title}</p>
            <p>${e.price}€</p>
            <button class="product-card__btn--eliminar">Eliminar</button>
            </li>`}document.querySelector(".js-carrito-container").classList.remove("hidden");const r=document.querySelectorAll(".js-btn-cerrar");for(const e of r)e.addEventListener("click",f)}function l(t){s.innerHTML="";for(let r of t)p(r);const o=document.querySelectorAll(".js-btn-comprar");for(let r of o)r.addEventListener("click",m)}function g(t){t.preventDefault();let o=d.value;const r=n.filter(e=>e.title.toLowerCase().includes(o.toLowerCase()));console.log(r),l(r)}u.addEventListener("click",g);let b="https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";localStorage.getItem("productos")===null?fetch(b).then(t=>t.json()).then(t=>{n=t,localStorage.setItem("productos",JSON.stringify(t)),l(n)}):(n=JSON.parse(localStorage.getItem("productos")),l(n));
//# sourceMappingURL=main.js.map
