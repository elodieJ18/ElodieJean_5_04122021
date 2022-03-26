const url = "http://localhost:3000/api/products";

fetch(url)
  .then((result) => {
    if (result.ok) {
      return result.json();
    }
  })
  .then((data) => {
    displayCouches(data);
  })
  .catch((erreur) => {
    console.log("une erreur est survenu: " + erreur);
  });

function displayCouches(products) {
  for (let i = 0; i < products.length; i++) {
    let a = document.createElement("a");
    document.querySelector("#items").appendChild(a);
    a.setAttribute("href", "./product.html?id=" + products[i]._id);
    a.innerHTML = `
        <article>
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
        </article>
      `;
  }

  let a = document.querySelectorAll("a");
  console.log(a);

  a.forEach((a) =>
    a.addEventListener("click", () => {
      console.log(a);

      window.location = `product.html?${bouton.id}`;
    })
  );
}
