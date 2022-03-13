/*----------------appelle-du-localstorage-------------- */
let productLocalStorage = JSON.parse(localStorage.getItem("itemOrdered"));
console.log(productLocalStorage);

/*---------appelle-du-tableau-de-la-quantité-total------*/
let allQuantityCart = [];
/*---------appelle-du-tableau-de-la-quantité-total------*/
let allpriceCart = [];

/*--------------fetch-appeler-l-api-et-le-localstorage-------- */
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
              <p> ${
                productLocalStorage[i].quantity *
                data.price.toString().replace(/00/, "")
              } €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100"  value="${
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

      /*-----------------changer-la-quantité------------------------- */

      function upDateQuantity() {
        let buttonQuantity = document.querySelectorAll(".itemQuantity");
        i = buttonQuantity.length - 1;
        buttonQuantity[i].addEventListener("change", () => {
          if (buttonQuantity[i].value <= 0) {
            buttonQuantity[i].value = 0;
            productLocalStorage.splice(i, 1);
          } else if (buttonQuantity[i].value > 100) {
            buttonQuantity[i].value = 100;
            productLocalStorage[i].quantity = 100;
          } else {
            productLocalStorage[i].quantity = buttonQuantity[i].value;
          }
          localStorage.setItem(
            "itemOrdered",
            JSON.stringify(productLocalStorage)
          );
        });
      }
      upDateQuantity();

      /*---------------------changer-le-prix------------------------- */

      function changePrice() {
        let buttonQuantity = document.querySelectorAll(".itemQuantity");
        i = buttonQuantity.length - 1;
        buttonQuantity[i].addEventListener("change", () => {
          if ((productLocalStorage[i].quantity = buttonQuantity[i].value)) {
            document.querySelectorAll(
              ".cart__item__content__description >p:last-child"
            )[i].textContent = `${
              buttonQuantity[i].value * data.price.toString().replace(/00/, "")
            } €`;
          }
          localStorage.setItem(
            "itemOrdered",
            JSON.stringify(productLocalStorage)
          );
          location.reload();
        });
      }
      changePrice();

      /*--------------------activer-le-button-supprimer---------------------- */
      function deleteButton() {
        let buttonDelete = document.querySelectorAll(".deleteItem");
        buttonDelete[i].addEventListener("click", () => {
          productLocalStorage.splice(i, 1);
          console.log("buttonDelete");
          localStorage.setItem(
            "itemOrdered",
            JSON.stringify(productLocalStorage)
          );
          location.reload();
        });
      }
      deleteButton();

      /*-------------------------------Total-Quantity----------------------------------- */
      /*--creer-un-nouveau-tableau-pour-reunir-toutes-les-données---*/
      function addAllQuantity() {
        let allQuantity = Number(productLocalStorage[i].quantity);
        /*----push-dans-le-tableau-hors-de-la-loupe-----*/
        allQuantityCart.push(allQuantity);
        console.log(allQuantityCart);
        /*-------------Total-All-Quantity-------------- */
        const reducerQuantity = (accumulator, currentValue) =>
          accumulator + currentValue;
        const totalValue = allQuantityCart.reduce(reducerQuantity);
        document.getElementById("totalQuantity").innerHTML = `${totalValue}`;
        console.log(totalValue);
      }
      addAllQuantity();

      /*-------------------Total-price---------------------*/
      function addAllprice() {
        let allPrice = Number(
          productLocalStorage[i].quantity *
            data.price.toString().replace(/00/, "")
        );
        /*----push-dans-le-tableau-hors-de-la-loupe-----*/
        allpriceCart.push(allPrice);
        console.log(allpriceCart);
        /*-------------------Total--all--price---------------------*/
        const reducerPrice = (accumulator, currentValue) =>
          accumulator + currentValue;
        const totalPrice = allpriceCart.reduce(reducerPrice);
        document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
        console.log(totalPrice);
      }
      addAllprice();
    })
    /*---------------------------------------------------- */
    .catch((error) => console.log(`Une erreur est survenue: ${error}`));
}

/*-------------------------------------Formulaire---Validation----------------------------------------- */
function allForm() {
  let btnorder = document.querySelector("#order");
  btnorder.addEventListener("click", () => {
    let itemFirstName = document.querySelector("#firstName").value;
    let itemLastName = document.querySelector("#lastName").value;
    let itemAddress = document.querySelector("#address").value;
    let itemCity = document.querySelector("#city").value;
    let itemEmail = document.querySelector("#email").value;

    let form = JSON.parse(localStorage.getItem("form"));

    if (form == null) {
      form = [];
    }

    let formValue = {
      firstNam: itemFirstName,
      lastName: itemLastName,
      address: itemAddress,
      city: itemCity,
      email: itemEmail,
    };
    if (localStorage.form == null) {
      form.push(formValue);
    }
    console.log(form);

    localStorage.setItem("form", JSON.stringify(form));

    /*---------------envoyer-------*/
    let sendOrder = JSON.parse(localStorage.getItem("sendOrder"));

    if (sendOrder == null) {
      sendOrder = [];
    }

    let sendAll = {
      productLocalStorage,
      form,
    };

    if (localStorage.sendOrder == null) {
      sendOrder.push(sendAll);
    }
    console.log(sendOrder);

    localStorage.setItem("sendOrder", JSON.stringify(sendOrder));
  });
}
allForm();

/*
let itemOrdered = JSON.parse(localStorage.getItem("AllFormulaire"));
let btnorder = document.querySelector("#order");
btnorder.addEventListener("click", () => {
  localStorage.setItem("firstName", document.querySelector("#firstName").value);
});
/*
<form method="get" class="cart__order__form">
                <div class="cart__order__form__question">
                  <label for="firstName">Prénom: </label>
                  <input type="text" name="firstName" id="firstName" required />
                  <p id="firstNameErrorMsg">
                    <!-- ci est un message d'erreur -->
                  </p>
                </div>
                <div class="cart__order__form__question">
                  <label for="lastName">Nom: </label>
                  <input type="text" name="lastName" id="lastName" required />
                  <p id="lastNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="address">Adresse: </label>
                  <input type="text" name="address" id="address" required />
                  <p id="addressErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="city">Ville: </label>
                  <input type="text" name="city" id="city" required />
                  <p id="cityErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required />
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="cart__order__form__submit">
                  <input type="submit" value="Commander !" id="order" />
                </div>
              </form>*/
