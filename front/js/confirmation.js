/*----------------appelle-du-localstorage-------------- */
let idConfirm = localStorage.getItem("orderId");
console.log(idConfirm);

let numberOrder = document.querySelector("#orderId");
numberOrder.innerHTML = `${idConfirm}`;

localStorage.clear();

function returnHome() {
  if (idConfirm == null) {
    window.location.href = "index.html";
  }
}
returnHome();
