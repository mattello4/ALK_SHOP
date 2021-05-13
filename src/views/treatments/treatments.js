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

        return article;
      });

      section.empty().append(articles);
    });

  return fragment;
};
