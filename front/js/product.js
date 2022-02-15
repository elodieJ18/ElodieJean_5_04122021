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

  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`; /*le document.getElementsByTagName ne marchait pas */

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
    let productTableau = JSON.parse(localStorage.getItem("product"));
    let select = document.getElementById("colors");
    console.log(select.value);
    console.log(productTableau);

    const fusionproductColors = Object.assign({}, productData, {
      colors: `${select.value}`,
      quantite: 1,
    });
    console.log(fusionproductColors);

    if (productTableau == null) {
      productTableau = [];
      productTableau.push(fusionproductColors);
      console.log(productTableau);
      localStorage.setItem("product", JSON.stringify(productTableau));
    }
  });
};
