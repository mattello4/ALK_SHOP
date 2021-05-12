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
    let cartCost = localStorage.getItem("totalCost");

    if (cartItems && productContainer) {
      productContainer.innerHTML = "";

      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `  
        
        <div class="product">
      
        <ion-icon name="trash"></ion-icon>
        <span>${item.name}</span>
      </div>
        <div class="price">${item.price},00</div>
        <div class="beds">${item.beds} łóżko/a</div>
        <div class="total"><span>${item.Date}</span></div>
        <div class="total">Aktualnie w koszyku masz: <span>${item.inCart}</span></div>
        </div>
        `;
      });

      productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
               Łączny koszt zamówienia: 
            </h4>
            <h4 class="basketTotal">
                $${cartCost},00
            </h4>
      `;
    }
  }

  //delete basket
  document.querySelector("body").addEventListener("click", function (event) {
    if (event.target.matches(".product ion-icon")) {
      let deleteButtons = document.querySelectorAll(".product ion-icon");
      let productName;
      let productNumbers = localStorage.getItem("cartNumbers");
      let cartItems = localStorage.getItem("productsInCart");
      cartItems = JSON.parse(cartItems);
      let cartCost = localStorage.getItem("totalCost");

      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
          // console.log(i);
          productName = deleteButtons[i].parentElement.textContent
            .trim()
            .replace(/ /g, " ");
          //console.log(productName);
          //console.log(
          //cartItems[productName].name + " " + cartItems[productName].inCart  );
          localStorage.setItem(
            "cartNumbers",
            productNumbers - cartItems[productName].inCart
          );

          localStorage.setItem(
            "totalCost",
            cartCost -
              cartItems[productName].price * cartItems[productName].inCart
          );

          delete cartItems[productName];
          localStorage.setItem("productsInCart", JSON.stringify(cartItems));

          displayCart();
        });
      }
    }
  });

  displayCart();

  fragment.append(h2, section, oFra);

  return fragment;
};
