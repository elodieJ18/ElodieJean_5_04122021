/*LocaStorage */
/*Qui contient l'id, la quantité et la couleur */

let productLocalStorage = JSON.parse(localStorage.getItem("itemOrdered"));
console.log(productLocalStorage);

/*API poru appeler ce qui n'est pas dans le local storage */
/*Img, Titre, Description et Prix */

const urlString = window.location.href;
const url = new URL(urlString);
console.log("http://localhost:3000/api/products/");

let productData = [];

const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(productData);
    });
};

/*
let productFusion = {
  this.id = id;
  this.quantity = quantity;
};
console.log(productFusion); */

/*Solution est de peut-être faire un tableau 
qui appelera dans l'api ce qu'il manque 
mais il faut quand même que l'id du local soit lié à l'api
donc peut-être faire un tableau en appelant le local storage + le reste*/

/*Le but est de réutiliser l'id afficher dans le localstorage */
/*pour pouvoir afficher ce qu'il manque */

const cartDisplay = async () => {
  if (productLocalStorage) {
    await productLocalStorage;
    await fetchProduct();
    /*Le DOM est appelé tout ce qui est dans le localStorage est affiché */

    document.getElementById("cart__items").innerHTML = productLocalStorage.map(
      (
        product
      ) => `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
      <img src="" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2></h2>
          <p>${product.colors}</p>
          <p>€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
    );
  }
};

cartDisplay();
