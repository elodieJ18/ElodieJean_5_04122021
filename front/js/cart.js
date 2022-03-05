let productLocalStorage = JSON.parse(localStorage.getItem("itemOrdered"));

for (let i = 0; i < productLocalStorage.length; i++) {
  fetch(`http://localhost:3000/api/products/${productLocalStorage[i].id}`)
    .then((res) => res.json())
    .then((data) => {
      function cartDisplay(data) {
        let article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", `${data.id}`);
        article.setAttribute("data-color", `${data.color}`);
        article.innerHTML = `
          <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${productLocalStorage[i].color}</p>
              <p data-id="${data.id}"  data-color="${data.color}">${
          productLocalStorage[i].quantity *
          data.price.toString().replace(/00/, "")
        } €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${
                  data.id
                }"  data-color="${data.color}" value="${
          productLocalStorage[i].quantity
        }">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" >Supprimer</p>
              </div>
            </div>
          </div>`;
      }
      const addNewQuantity = async (cartDisplay) => {
        await cartDisplay;
        let input = document.querySelector("input");
        for (let i = 0; i < productLocalStorage.length; i++) {
          input.addEventListener("click", () => {
            if (
              productLocalStorage[i]._id == data.id &&
              productLocalStorage[i].colors == data.color
            ) {
              return (
                (document.querySelectorAll(
                  ".cart__item__content__description >p:last-child"
                )[i].textContent = `${
                  input[i].value * data.price.toString().replace(/00/, "")
                } €`),
                console.log("Newquantité")
              );
            }
          });
        }
      };
      addNewQuantity();
      cartDisplay(data);
    })
    .catch((error) => console.log(`Une erreur est survenue: ${error}`));
}

/*const input = document.querySelector("input");
input.onchange = function () {
  const key = input.value;
  localStorage.setItem("key", key);
  input.value = localStorage.getItem("key");
};

/*for (let i = 0; i < productLocalStorage.length; i++) {
  let newQuantity = document.querySelector("input").value;
  if (
    productLocalStorage.quantity < ++newQuantity.value ||
    productLocalStorage.quantity > ++newQuantity.value
  ) {
    let index = productLocalStorage[i];
    let newValue =
      Number(index.quantity) + Number(newQuantity.quantity);
    newQuantity.quantity = newValue.toString();
    console.log(newQuantity.quantity);
  }
  localStorage.setItem("newQuantity", JSON.stringify(productLocalStorage));
}*/

/*----------------------------------------------------------------------------------*/
/*function updateValue(e) {
    let newValuePush = productLocalStorage[i].quantity;
    newValuePush = e.target.value;
  }
  const addNewQuantity = async () => {
    let input = document.querySelector("input");
    input.addEventListener("change", updateValue);
  };
   */
/*----------------------------------------------------------------------------------*/
/*suivi d'un tuto pour rajouter la quantité */

/*push dans le localstorage 

function saveCart(cart) {
  localStorage.setItem("itemOrdered", cart);
}

/*Appeler le localstorage 

function getCart() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(
      cart
    ); /*ici ce n'est pas notre cas on a déjà notre localstorage
  }
}

Ajouter un produit 
function addCart(data) {
  let basket = getCart(); /*----appelle le localstorage
  let foundProduct = basket.find(
    (p) => p.id == data.id
  ); /* on cherche dans le panier si il y a un id (p.id) égale à l'id (product.id) du produit que je veux ajouter  
  if (foundProduct != undefined) {
    /*si il est différent (!=) d'undefined ça veut dire qu'il existe déjà donc on rajouter quantité++ 
    foundProduct.quantity++;
  } else {
  }
  basket.push(
    product
  ); /*----push le nouveau produit en question dans le localstorage
}

/*supprimer un produit du panier */
/*astuce garder tout les produits dont l'id est différent de telle value, alors supprimer le produit et garder les autres 
/*Dans mon cas faire cette fonction dans un addEventListener et ajouer l'id comme dans produit.js
function removeFromCart(data) {
  let basket = getCart();
  basket = cart.filter((p) => p.id != data.id);
  saveBasket(cart);
}

/*changer la quantité 

function changeQuantity(data, quantity) {
  let foundProduct = productLocalStorage.find((p) => p.id == data.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
  }
  changeQuantity.push;
  localStorage.setItem("itemOrdered", cart);
}
/*fin du tuto */

/*-----------------------------Resultat qui marche mais avec seulement une augmentation au click--------------------------------------- */
/*const addNewQuantity = async () => {
  let input = document.querySelector("input");
  input.addEventListener("click", () => {
    for (let i = 0; i < productLocalStorage.length; i++) {
      if (
        productLocalStorage[i]._id == data.id &&
        productLocalStorage[i].colors == data.color
      ) {
        return (
          /*changer ici-je ne veux pas qu'au click ce soit que ++ mais au numéro de la valeur affiché*/
/*       productLocalStorage[i].quantity++,
          localStorage.setItem("data", JSON.stringify(productLocalStorage)),
          (document.querySelectorAll(".itemQuantity")[i].textContent =
            productLocalStorage[i].quantity),
          /*adapter le prix à la modification au click 
          (document.querySelectorAll(
            ".cart__item__content__description >p:last-child"
          )[i].textContent = `${
            productLocalStorage[i].quantity *
            data.price.toString().replace(/00/, "")
          } €`),
          console.log("quantité++")
        );
      }
    }
  });
};
*/
