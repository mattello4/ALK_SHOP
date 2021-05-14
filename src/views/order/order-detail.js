import $ from "jquery";
import axios from "axios";
export * from "../../layout/card.css";

export const orderDetail = (userId) => {
  const fragment = $(document.createDocumentFragment());
  const section = $("<section>Loading...</section>");

  axios
    .get(`http://localhost:3000/orders/?userId=${userId}`)
    .then((response) => response.data)

    .then((orders) => {
      const articles = orders.map((order) => {
        const { name, beds, guests } = order;

        const article = $(`
        <div class="container">
        <div class="row justify-content-md-center">
          <div class="card col-sm-12 col-md-4">
                    <h2>${name}</h2>
                    <p>${beds}</p>
                    <p><strong>Beds</strong> ${beds} | <strong>Guests</strong> ${guests}</p>
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
