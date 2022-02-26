/*LocaStorage */
/*Qui contient l'id, la quantité et la couleur */

let ProductLocalStorage = JSON.parse(localStorage.getItem("itemOrdered"));
console.log(ProductLocalStorage);

/*API poru appeler ce qui n'est pas dans le local storage */
/*Img, Titre, Description et Prix */

const urlString = window.location.href;
const url = new URL(urlString);
console.log("http://localhost:3000/api/products/");
/*const productId = url.searchParams.get("id");
const productId = `http://localhost:3000/api/products/${ProductLocalStorage.id}`;
console.log(productId);*/

/*Solution est de peut-être faire un tableau 
qui appelera dans l'api ce qu'il manque 
mais il faut quand même que l'id du local soit lié à l'api
donc peut-être faire un tableau en appelant le local storage + le reste*/

let productData = [];

const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(productData);
    });
};

let image = document.querySelector(".cart__item__img");
console.log(image);

let productSelection = {};

/*Le but est de réutiliser l'id afficher dans le localstorage */
/*pour pouvoir afficher ce qu'il manque */

const cartDisplay = async () => {
  if (ProductLocalStorage) {
    await ProductLocalStorage;
    /*Le DOM est appelé tout ce qui est dans le localStorage est affiché */

    document.getElementById("cart__items").innerHTML = ProductLocalStorage.map(
      (
        product
      ) => `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="" alt="">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
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
