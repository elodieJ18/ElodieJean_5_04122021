const apiURL = "https://api.ogniter.fr/kanap/api/products";

var shoppingCart = [];
var products = {}; // { 'id': product }
var totalQuantity = 0;
var totalPrice = 0;

document.addEventListener("DOMContentLoaded", async () => {
  if (!location.href.includes("cart.html")) {
    displayOrderId();
    return;
  }

  products = await getProducts();

  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (!shoppingCart) {
    return;
  }

  const cart = document.getElementById("cart__items");

  shoppingCart.forEach(async (item) => {
    cart.appendChild(await createItemInCart(item));
  });

  updateTotal();

  if (location.search) {
    order();
  }
});

const createItemInCart = async (item) => {
  const product = products[item.id];

  const itemArticle = document.createElement("article");
  const itemDivImg = document.createElement("div");
  const itemImg = document.createElement("img");
  const itemDivContent = document.createElement("div");
  const itemDivContentDesc = document.createElement("div");
  const itemDivContentDescName = document.createElement("h2");
  const itemDivContentDescColor = document.createElement("p");
  const itemDivContentDescPrice = document.createElement("p");
  const itemDivContentSettings = document.createElement("div");
  const itemDivContentSettingsQty = document.createElement("div");
  const itemDivContentSettingsQtyValue = document.createElement("p");
  const itemDivContentSettingsQtyInput = document.createElement("input");
  const itemDivContentSettingsDel = document.createElement("div");
  const itemDivContentSettingsDelText = document.createElement("p");

  itemArticle.classList.add("cart__item");
  itemArticle.dataset.id = item.id;
  itemArticle.dataset.color = item.color;

  itemDivImg.classList.add("cart__item__img");

  itemImg.src = product.imageUrl;

  itemDivContent.classList.add("cart__item__content");

  itemDivContentDesc.classList.add("cart__item__content__description");

  itemDivContentDescName.innerHTML = product.name;

  itemDivContentDescColor.innerHTML = item.color;

  itemDivContentDescPrice.innerHTML = `${product.price * item.quantity} €`;

  itemDivContentSettings.classList.add("cart__item__content__settings");

  itemDivContentSettingsQty.classList.add(
    "cart__item__content__settings__quantity"
  );

  itemDivContentSettingsQtyValue.innerHTML = "Qté : ";

  itemDivContentSettingsQtyInput.type = "number";
  itemDivContentSettingsQtyInput.classList.add("itemQuantity");
  itemDivContentSettingsQtyInput.name = "itemQuantity";
  itemDivContentSettingsQtyInput.min = 1;
  itemDivContentSettingsQtyInput.max = 100;
  itemDivContentSettingsQtyInput.value = item.quantity;
  itemDivContentSettingsQtyInput.addEventListener("change", updateQuantity);

  itemDivContentSettingsDel.classList.add(
    "cart__item__content__settings__delete"
  );

  itemDivContentSettingsDelText.addEventListener("click", deleteItem);
  itemDivContentSettingsDelText.innerHTML = "Supprimer";

  itemDivContentDesc.appendChild(itemDivContentDescName);
  itemDivContentDesc.appendChild(itemDivContentDescColor);
  itemDivContentDesc.appendChild(itemDivContentDescPrice);

  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyValue);
  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyInput);

  itemDivContentSettingsDel.appendChild(itemDivContentSettingsDelText);

  itemDivContentSettings.appendChild(itemDivContentSettingsQty);
  itemDivContentSettings.appendChild(itemDivContentSettingsDel);

  itemDivContent.appendChild(itemDivContentDesc);
  itemDivContent.appendChild(itemDivContentSettings);

  itemDivImg.appendChild(itemImg);

  itemArticle.appendChild(itemDivImg);
  itemArticle.appendChild(itemDivContent);

  return itemArticle;
};

const deleteItem = (delButton) => {
  if (
    window.confirm("Êtes-vous sûr de vouloir supprimer ce produit du panier ?")
  ) {
    const path =
      delButton.path || (delButton.composedPath && delButton.composedPath());
    const cartItem = path.find((element) =>
      element.classList.contains("cart__item")
    );
    const id = cartItem.dataset.id;
    const color = cartItem.dataset.color;
    cartItem.parentNode.removeChild(cartItem);
    shoppingCart.splice(
      shoppingCart.indexOf(
        shoppingCart.find((item) => item.id === id && item.color === color)
      ),
      1
    );
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    alert("Suppression effectuée.");
    updateTotal();
  }
};

const updateQuantity = (listener) => {
  if (!listener) {
    return;
  }

  const path =
    listener.path || (listener.composedPath && listener.composedPath());
  const cartItem = path.find((element) =>
    element.classList.contains("cart__item")
  );
  const id = cartItem.dataset.id;
  const color = cartItem.dataset.color;

  let value = +listener.target.value;

  if (isNaN(value)) {
    return (listener.target.value = 0);
  } else {
    value = Math.abs(value);
    if (value < 1) {
      value = 1;
    }
    if (value > 100) {
      value = 100;
    }
  }

  listener.target.value = value;

  const clickedProduct = shoppingCart.find(
    (item) => item.id === id && item.color === color
  );
  clickedProduct.quantity = value;
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  updatePrice(listener, clickedProduct.quantity * products[id].price);
};

const updatePrice = (listener, newPrice) => {
  const path =
    listener.path || (listener.composedPath && listener.composedPath());
  const cartItem = path.find((element) =>
    element.classList.contains("cart__item__content")
  );
  const cartItemDesc = cartItem.children[0];
  const cartItemDescPrice = cartItemDesc.children[2];
  cartItemDescPrice.innerHTML = `${newPrice} €`;
  updateTotal();
};

const updateTotal = () => {
  const totalQuantityElement = document.getElementById("totalQuantity");
  const totalPriceElement = document.getElementById("totalPrice");

  totalQuantity = 0;
  totalPrice = 0;

  for (const item of shoppingCart) {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * products[item.id].price;
  }

  totalQuantityElement.innerHTML = totalQuantity;
  totalPriceElement.innerHTML = totalPrice;
};

const displayOrderId = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("orderId");

  const orderElem = document.getElementById("orderId");
  orderElem.innerHTML = orderId;
};

const getProducts = async () => {
  const response = await fetch(apiURL);
  if (!response.ok) {
    return;
  }

  const productsText = await response.text();
  if (!productsText) {
    return;
  }

  const products = {};
  const productArray = await JSON.parse(productsText);
  productArray.forEach((product) => {
    products[product._id] = product;
  });

  return products;
};
