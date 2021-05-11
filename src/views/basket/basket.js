import $ from "jquery";
export * from "../../layout/card.css";

export const basket = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $("<h2>Twoj koszyk</h2>");

  var oFra = document.createDocumentFragment();
  var productContainer = document.createElement("div");
  productContainer.id = "products";
  oFra.appendChild(productContainer);
  oFra.getElementById("products");

  const section = $(`
  <div class="products-container">

    <div class="product-header">
         
      </div>
</div>
 
  `);

  function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems && productContainer) {
      console.log(productContainer);
      productContainer.innerHTML = "";

      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `<div class="product">
        <ion-icon name="close-circle">
        </ion-icon>
            <span>${item.name}</span>
        </div>
        <div class="price">${item.price},00</div>
        <div class="beds">${item.beds} łóżko/a</div>
        <div class="date">
            <ion-icon class="decrease" name="arrow-dropleft-circle">Usuń</ion-icon>
                <span>${item.Date}</span>
            <ion-icon class="increase" name="arrow-dropright-circle" color="primary"></ion-icon>   
        </div>
        `;
      });
    }
  }
  displayCart();

  fragment.append(h2, section, oFra);
  return fragment;
};
