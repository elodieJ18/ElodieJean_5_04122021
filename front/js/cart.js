let productLocalStorage = JSON.parse(localStorage.getItem("itemOrdered"));
console.log(productLocalStorage);
for (let i = 0; i < productLocalStorage.length; i++) {
  fetch(`http://localhost:3000/api/products/${productLocalStorage[i].id}`)
    .then((res) => res.json())
    .then((data) => {
      function cartDisplay(data) {
        console.log(data);
        let article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", `${data._id}`);
        article.setAttribute("data-color", `${data.colors}`);
        article.innerHTML = `
          <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${productLocalStorage[i].color}</p>
              <p data-id="${data._id}"  data-color="${
          productLocalStorage[i].color
        }">${
          productLocalStorage[i].quantity *
          data.price.toString().replace(/00/, "")
        } €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" data-id="${
                  data._id
                }"  data-color="${productLocalStorage[i].color}" value="${
          productLocalStorage[i].quantity
        }">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" >Supprimer</p>
              </div>
            </div>
          </div>`;
      }
      cartDisplay(data);

      for (let i = 0; i < productLocalStorage.length; i++) {
        if (productLocalStorage[i].id === data._id) {
          let buttonQuantity = document.querySelectorAll(".itemQuantity");

          buttonQuantity.forEach((buttonQuantity) => {
            console.log(buttonQuantity);
            buttonQuantity.addEventListener("click", () => {
              productLocalStorage[i].quantity,
                localStorage.setItem(
                  "data",
                  JSON.stringify(productLocalStorage, "quantity")
                ),
                (document.querySelectorAll(
                  ".cart__item__content__description >p:last-child"
                )[i].textContent = `${
                  productLocalStorage[i].quantity *
                  data.price.toString().replace(/00/, "")
                } €`);
              document.querySelectorAll(".itemQuantity")[i].textContent =
                productLocalStorage[i].quantity++;
              console.log("quantité++");
            });
          });
        }
      }

      let totalAddproduct = productLocalStorage.length;
      for (let i = 0; i < totalAddproduct; i++) console.log(totalAddproduit);
      if (productLocalStorage[i].quantity == 1 && totalAddproduct == 1) {
        return localStorage.removeItem("product");
      }
    })
    .catch((error) => console.log(`Une erreur est survenue: ${error}`));
}

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
/*productLocalStorage[i].quantity++,
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


-------------------------------------------------------
const addNewQuantity = async (cartDisplay) => {
        await cartDisplay;

        for (let i = 0; i < productLocalStorage.length; i++) {
          /*la ce qui est écris c'est qu'avec le click de l'input on change le prix pour chaque les articles */
/*  let input = document.getElementsByTagName("input")[0];
          Array.input.forEach((input) => {
            input.addEventListener("click", () => {
              if (
                productLocalStorage[i]._id == data.id &&
                productLocalStorage[i].colors == data.color
              ) {
                return (
                  /*changer ici-je ne veux pas qu'au click ce soit que ++ mais au numéro de la valeur affiché*/
/*    productLocalStorage[i].quantity++,
                  localStorage.setItem(
                    "data",
                    JSON.stringify(productLocalStorage)
                  ),
                  (document.querySelectorAll(".itemQuantity")[i].textContent =
                    productLocalStorage[i].quantity),
                  /*adapter le prix à la modification au click */
/*    (document.querySelectorAll(
                    ".cart__item__content__description >p:last-child"
                  )[i].textContent = `${
                    productLocalStorage[i].quantity *
                    data.price.toString().replace(/00/, "")
                  } €`),
                  console.log("quantité++")
                );
              }
            });
          });
        }
      };


      -----------------------------------------------------------------------------
  let buttonQuantity = document.querySelectorAll("input.itemQuantity");
      console.log(buttonQuantity);
      buttonQuantity.forEach((buttonQuantity) => {
        buttonQuantity.addEventListener("click", updataQuantity);
      });

      function updataQuantity() {
        for (let i = 0; i < productLocalStorage.length; i++) {
          if (
            productLocalStorage[i]._id == data.id &&
            productLocalStorage[i].colors == data.color
          )
            return (
              productLocalStorage[i].quantity++,
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


*/
