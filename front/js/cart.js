let addProduct = JSON.parse(localStorage.getItem("productLocal"));

console.log(addProduct);

const cartDisplay = async () => {
  console.log("salut");

  if (addProduct) {
    await addProduct;
    console.log(addProduct);

    document.getElementById("cart__items").innerHTML = addProduct.map(
      (
        product
      ) => `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.colors}</p>
          <p>${
            product.quantite + product.price.toString().replace(/00/, "")
          }€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :${product.quantite} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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
