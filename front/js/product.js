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
  let main = (document.getElementsByTagName("main").innerHTML = `
  <article>
  <div class="item__img">
              <!-- <img src="${productData.imageUrl}" alt="${productData.altTxt}"> -->
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${productData.name}</h1>
                <p>Prix : <span id="price">${productData.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${productData.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                      <option value="">--SVP, choisissez une couleur --</option>
                      ${productData.colors}
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>
            </div>
          </article>`);

  console.log(main);
};

produitDisplay();
