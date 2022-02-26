const urlString = window.location.href;
const url = new URL(urlString);
const productId = url.searchParams.get("id");
console.log("http://localhost:3000/api/products/" + productId);
let productData = [];

const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(productData);
    });
};

const produitDisplay = async () => {
  await fetchProduct();

  document.getElementsByClassName(
    "item__img"
  )[0].innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`; /*le document.getElementsByTagName ne marchait pas */

  document.getElementById(
    "title"
  ).innerHTML = `${productData.name}`; /*pas besoin de remettre tout le htlm puisque l'id est avant l'élement changeant*/

  document.getElementById(
    "price"
  ).innerHTML = `${productData.price}`; /*pas besoin de remettre tout le htlm puisque l'id est avant l'élement changeant*/

  document.getElementById(
    "description"
  ).innerHTML = `${productData.description}`;

  /*option des couleurs*/

  let select = document.getElementById("colors");
  console.log(select);

  console.log(productData.colors);

  productData.colors.forEach((colors) => {
    console.log(document.createElement("option"));
    let tagOption = document.createElement("option");

    tagOption.innerHTML = `${colors}`;
    tagOption.value = `${colors}`;

    select.appendChild(tagOption);
    console.log(tagOption);
  });
  /*bouton ajouter au panier*/

  document.getElementById(
    "addToCart"
  ).innerHTML = `<button id="${productData._id}">Ajouter au panier</button>`;
  addCart(productData);
};

produitDisplay();

const addCart = () => {
  let button = document.getElementById(productData._id);
  console.log(button);
  button.addEventListener("click", () => {
    let itemQuantity = document.querySelector("#quantity").value;
    let itemColor = document.querySelector("#colors").value;
    let itemOrdered = JSON.parse(localStorage.getItem("itemOrdered"));

    if (itemColor === "" || itemColor == null) {
      alert("Choisissez une couleur");
      itemColor.pull(selectedProduct);
    }

    if (itemOrdered == null) {
      itemOrdered = [];
    }

    let selectedProduct = {
      id: productData._id,
      quantity: itemQuantity,
      color: itemColor,
    };

    if (localStorage.itemOrdered == null) {
      itemOrdered.push(selectedProduct);
    } else if (
      localStorage.itemOrdered.includes(selectedProduct.id) &&
      localStorage.itemOrdered.includes(selectedProduct.color)
    ) {
      for (let i = 0; i < itemOrdered.length; i++) {
        if (
          itemOrdered[i].id === selectedProduct.id &&
          itemOrdered[i].color === selectedProduct.color
        ) {
          let index = itemOrdered[i];
          let newValue =
            Number(selectedProduct.quantity) + Number(index.quantity);

          index.quantity = newValue.toString();
        }
      }
    } else {
      itemOrdered.push(selectedProduct);
    }
    localStorage.setItem("itemOrdered", JSON.stringify(itemOrdered));
  });
};
