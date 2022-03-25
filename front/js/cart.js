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
  let form = document.querySelector(".cart__order__form");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  form.city.addEventListener("change", function () {
    validCity(this);
  });

  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML =
        "Veuillez renseigner correctement ce champ.";
    }
  };

  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner correctement ce champ.";
    }
  };

  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner correctement ce champ.";
    }
  };

  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner correctement ce champ.";
    }
  };

  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner correctement votre email.";
    }
  };
}
allForm();

/*-------------------------------*/

function send() {
  let btnorder = document.getElementById("order");
  console.log("avant-lecture-btn");

  btnorder.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("après-lecture-btn");

    /*---------------------preparation-de-l-envoie-------------------- */
    let itemFirstName = document.querySelector("#firstName").value;
    let itemLastName = document.querySelector("#lastName").value;
    let itemAddress = document.querySelector("#address").value;
    let itemCity = document.querySelector("#city").value;
    let itemEmail = document.querySelector("#email").value;

    let contact = {
      firstName: itemFirstName,
      lastName: itemLastName,
      address: itemAddress,
      city: itemCity,
      email: itemEmail,
    };

    let products = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      products.push(productLocalStorage[i].id);
    }

    /*-----------objet-creer--------------- */
    let sendAll = {
      products,
      contact,
    };

    const sendOrder = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendAll),
    });

    sendOrder.then(async (response) => {
      try {
        const content = await response.json();
        console.log(content);
        /*-------------ça-ne-lis-pas-la-suite-parce-que-ce-n'est pas ok */
        if (response.ok) {
          console.log(`Resultat de response.ok : ${response.ok}`);

          console.log(content.orderId);
          localStorage.setItem("responseId", content.orderId);

          /*window.location = "confirmation-commande.html"*/
        } else {
          console.log(`Réponse du serveur : ${response.status}`);
          alert(`Problème avec le serveur : erreur ${response.status}`);
        }
      } catch (e) {
        console.log(e);
      }
    });
    console.log(sendOrder);
  });

  /* .then(function (value) {
      document.getElementById("result").innerText = value.postData.text;
    });*/
}

send();
