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
}

/*<!--           <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->
          */

/*
fetch(url).then(function(result) {
    if (result.ok) {
        return result.json();
    }
}).then(data => {
    console.log(data);
}).catch(erreur => {
    console.log("une erreur est survenu: "+erreur)
})*/
