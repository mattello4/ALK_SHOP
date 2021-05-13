import $ from "jquery";
import axios from "axios";
export * from "../../layout/card.css";

export const treatments = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $(`<div class="col-md-12 text-center"><h2>Wybierz</h2></div>`);
  const section = $("<section>Loading...</section>");
  fragment.append(h2, section);

  // POBIERAMY POKOJE Z JSON-SERVER
  axios
    .get("http://localhost:3000/treatments")
    .then((response) => response.data)
    .then((treatments) => {
      const articles = treatments.map((treatment) => {
        const { id, name, area, time, price } = treatment;

        const article = $(`

        <div class="container">
        <div class="row justify-content-md-center">
          <div class="card col-sm-12 col-md-4">
                        <h4>${name}</h4>
                        <p class="card-text"><strong>Powierzchnia ciała:</strong> ${area} | <strong>Czas:</strong> ${time}</p>
                        <p class="card-text"><strong>Cena</strong> ${price.toFixed(
                          2
                        )} zł</p>
                        <button class="addcart btn btn-elegant" type="button"">Dodaj do koszyka</button>
                        </div>
                        </div>
                      </div>
                `);
        const carts = article.find(".addcart");
        carts.on("click", (event) => {
          cartNumbers(treatments[id - 1]);
          totalCost(treatments[id - 1]);
        });

        function cartNumbers(treatments) {
          let productNumbers = localStorage.getItem("cartNumbers");
          console.log("Product clicked", treatments);
          productNumbers = parseInt(productNumbers);

          if (productNumbers) {
            localStorage.setItem("cartNumbers", productNumbers + 1);
            productNumbers + 1;
          } else {
            localStorage.setItem("cartNumbers", 1);
          }

          setItems(treatments);
        }
        return article;
      });

      function setItems(treatments) {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        if (cartItems != null) {
          if (cartItems[treatments.name] == undefined) {
            cartItems = {
              ...cartItems,
              [treatments.name]: treatments,
            };
          }
          cartItems[treatments.name].inCart += 1;
        } else {
          treatments.inCart = 1;
          cartItems = {
            [treatments.name]: treatments,
          };
        }

        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      }

      function totalCost(treatments) {
        let cartCost = localStorage.getItem("totalCost");

        if (cartCost != null) {
          cartCost = parseInt(cartCost);
          localStorage.setItem("totalCost", cartCost + treatments.price);
        } else {
          localStorage.setItem("totalCost", treatments.price);
        }
      }

      section.empty().append(articles);
    });

  return fragment;
};
