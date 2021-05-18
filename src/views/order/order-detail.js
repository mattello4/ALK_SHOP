import $ from "jquery";
import axios from "axios";
export * from "../../layout/card.css";

export const orderDetail = () => {
  const fragment = $(document.createDocumentFragment());
  const section = $("<section>Loading...</section>");
  let element = sessionStorage.getItem("user");
  element = JSON.parse(sessionStorage.getItem("user"));

  axios
    .get(`http://localhost:3000/orders/?userID=${element.id}`)
    .then((response) => response.data)

    .then((orders) => {
      const articles = orders.map((order) => {
        if (order.date === undefined) {
          order.date = "Nie obowiązuje dla danego produktu";
        }
        const { name, inCart, price, orderDate, date } = order;

        const article = $(`
        <div class="container">
        <div class="row justify-content-md-center">
          <div class="card col-sm-12 col-md-4">
                    <h2>${name}</h2>
                    <p>Ilość: ${inCart}</p>
                    <p>Cena: ${price}</p>
                    <p>Okres wypoczynku: ${date}</p>
                    <p>Data zamówienia: ${orderDate}</p>
                   
                </div>
                </div>
              </div>
                `);

        return article;
      });

      section.empty().append(articles);
    });

  fragment.append(section);
  return fragment;
};
