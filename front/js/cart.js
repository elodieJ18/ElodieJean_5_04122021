let productLocalStorage = JSON.parse(localStorage.getItem("itemOrdered"));
console.log(productLocalStorage);
for (let i = 0; i < productLocalStorage.length; i++) {
  fetch(`http://localhost:3000/api/products/${productLocalStorage[i].id}`)
    .then((res) => res.json())
    .then((data) => {
      function cartDisplay(data) {
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
              <p> ${data.price}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"  value="${productLocalStorage[i].quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" >Supprimer</p>
              </div>
            </div>
          </div>`;
      }
      cartDisplay(data);

      // data-id="${data._id}"  data-color="${productLocalStorage[i].color}"

      function upDateQuantity() {
        let buttonQuantity = document.querySelectorAll(".itemQuantity");
        i = buttonQuantity.length - 1;
        console.log(i);
        console.log(buttonQuantity[i]);
        buttonQuantity[i].addEventListener("change", () => {
          if (this.value <= 0) {
            this.value = 0;
            productLocalStorage.splice(i, 1);
          } else if (this.value > 100) {
            this.value = 100;
            productLocalStorage[i].quantity = 100;
          } else {
            productLocalStorage[i].quantity = this.value;
          }
          localStorage.setItem(
            "itemOrdered",
            JSON.stringify(productLocalStorage)
          );
          location.reload();
        });
      }
      upDateQuantity();
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
