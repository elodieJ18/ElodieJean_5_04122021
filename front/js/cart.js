/*Appelle LocaStorage */
/*Qui contient l'id, la quantité et la couleur */

let productLocalStorage = JSON.parse(localStorage.getItem("itemOrdered"));

/*On appelle l'api */

const urlString = window.location.href;
const url = new URL(urlString);
const productId = url.searchParams.get("id");
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

/*Appelle de l'id du localStorage par le DOM*/

const callProductId = async (productId) => {
  console.log(productId);
};

/*Comparaison de  */

/*Le DOM est appelé tout ce qui est dans le localStorage est affiché */
const cartDisplay = async () => {
  await fetchProduct();
  document.getElementById("cart__items").innerHTML = productLocalStorage.map(
    (product) => `<article class="cart__item" data-id="${
      product.id
    }" data-color="${product.color}">
      <div class="cart__item__img">
      <img src="${callProductId(product.id)}" alt="Photographie d'un canapé">
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
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
              product.quantity
            }">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
  );

  /* let select = document.querySelectorAll(".cart__item");
    console.log(select("data-id"));*/
};

cartDisplay();
