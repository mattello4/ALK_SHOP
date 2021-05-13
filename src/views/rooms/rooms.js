import $ from "jquery";
import axios from "axios";
export * from "../../layout/card.css";
import { required } from "../signUp/required";
import { checkdate } from "./checkdate";
import { yearahead } from "./yearahead";
import { outofdate } from "./outofdate";

const validate = (validation, errorMessage) => {
  validation ? errorMessage.show() : errorMessage.hide();
};

export const rooms = () => {
  const fragment = $(document.createDocumentFragment());
  const form = $(`
  <form name="rooms" autocomplete="off" novalidate>
  <div class="container mt-2">
  <div class="col-md-12 item text-center">
      <label>Przyjazd</label><br>
      <input type="date" id="come"><br>
      <p id="come-check" class="text-danger">Data przyjazdu wcześniejsza niż bieżąca</p>
      <p id="come-required" class="text-danger">Uzupełnij datę przyjazdu</p>
      <label>Odjazd</label><br>
      <input type="date" id="away"/><br>
      <p id="away-yearahead" class="text-danger">Wybrana data wyjazdu nie może być dalsza niż rok od daty przyjazdu</p>
      <p id="away-outofdate" class="text-danger">Wybrana data wyjazdu nie moze być wczesniejsza lub równa niż data przyjazdu</p>
      <p id="away-required" class="text-danger">Uzupełnij datę wyjazdu</p>
      </div>
  </div>
</div>
</form>`);
  const section = $("<section>Loading...</section>");

  fragment.append(form, section);

  // POBIERAMY POKOJE Z JSON-SERVER
  axios
    .get("http://localhost:3000/rooms")
    .then((response) => response.data)
    .then((rooms) => {
      const articles = rooms.map((room) => {
        const { id, name, beds, guests, price } = room;

        const article = $(`

        <div class="container">
        <div class="row justify-content-md-center">
          <div class="card col-sm-12 col-md-4">
          <div class="alert alert-success" id="success-alert">
          <button type="button" class="close" data-dismiss="alert">x</button>
          <strong>Sukces! </strong> Dodałeś pokój do koszyka.
        </div>>
                        <h4>${name}</h4>
                        <p class="card-text"><strong>Beds</strong> ${beds} | <strong>Guests</strong> ${guests}</p>
                        <p class="card-text"><strong>Price</strong> ${price.toFixed(
                          2
                        )} zł</p>
                      
                        <button class="addcart btn btn-elegant" type="button"">Dodaj do koszyka</button>
                        <button class="btn btn-elegant" id="info" type="button">Wiecej informacji</button>
                        </div>
                        </div>
                      </div>
                
                `);
        const success = article.find("#success-alert");
        success.hide();

        const carts = article.find(".addcart");
        const errorMessages = {
          come: {
            required: form.find("#come-required"),
            checkdate: form.find("#come-check"),
          },
          away: {
            required: form.find("#away-required"),
            yearahead: form.find("#away-yearahead"),
            outofdate: form.find("#away-outofdate"),
          },
        };
        errorMessages.come.required.hide();
        errorMessages.come.checkdate.hide();

        errorMessages.away.required.hide();
        errorMessages.away.yearahead.hide();
        errorMessages.away.outofdate.hide();

        carts.on("click", (event) => {
          let come = $("#come").val();
          let away = $("#away").val();
          const isDataORequired = required(come);
          const isDataDRequired = required(away);
          const isCheckDate = checkdate(come);
          const isYearAhead = yearahead(away, come);
          const isAwayoutofdate = outofdate(away, come);

          //Sprawdzenie w kalendarzu
          validate(isCheckDate, errorMessages.come.checkdate);
          validate(isDataORequired, errorMessages.come.required);

          validate(isDataDRequired, errorMessages.away.required);
          validate(isYearAhead, errorMessages.away.yearahead);
          validate(isAwayoutofdate, errorMessages.away.outofdate);
          if (
            !isDataORequired &&
            !isDataDRequired &&
            !isCheckDate &&
            !isYearAhead &&
            !isAwayoutofdate
          ) {
            //Przeniesienie do local storage

            var date = "od:" + come + " do:" + away;
            cartNumbers(rooms[id - 1]);
            totalCost(rooms[id - 1]);

            function cartNumbers(rooms) {
              let productNumbers = localStorage.getItem("cartNumbers");
              rooms["Date"] = date;
              console.log("Product clicked", rooms);
              productNumbers = parseInt(productNumbers);

              if (productNumbers) {
                localStorage.setItem("cartNumbers", productNumbers + 1);
                productNumbers + 1;
              } else {
                localStorage.setItem("cartNumbers", 1);
              }

              setItems(rooms);
            }
            function setItems(rooms) {
              let cartItems = localStorage.getItem("productsInCart");
              cartItems = JSON.parse(cartItems);
              if (cartItems != null) {
                if (cartItems[rooms.name] == undefined) {
                  cartItems = {
                    ...cartItems,
                    [rooms.name]: rooms,
                  };
                }
                cartItems[rooms.name].inCart += 1;
              } else {
                rooms.inCart = 1;
                cartItems = {
                  [rooms.name]: rooms,
                };
              }
              success.show();
              success.fadeTo(2000, 500).slideUp(500, function () {
                success.slideUp(500);
              });

              localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            }
            function totalCost(rooms) {
              let cartCost = localStorage.getItem("totalCost");

              if (cartCost != null) {
                cartCost = parseInt(cartCost);
                localStorage.setItem("totalCost", cartCost + rooms.price);
              } else {
                localStorage.setItem("totalCost", rooms.price);
              }
            }
          }
        });

        const inforoom = article.find("#info");
        inforoom.on("click", (event) => {
          event.preventDefault();

          const navigationEvent = new CustomEvent("navigation", {
            detail: {
              view: "rooms-detail",
              roomId: id,
            },
          });

          document.dispatchEvent(navigationEvent);
        });

        return article;
      });

      section.empty().append(articles);
    });

  return fragment;
};
