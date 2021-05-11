import $ from "jquery";
import { home, rooms, roomsDetail, signUp, login, basket } from "../views";
export * from "../layout/main";

export const main = () => {
  const section = $("<section></section>");

  // NA START POKAZUJEMY WIDOK `home`
  section.append(home());

  document.addEventListener("navigation", (event) => {
    // const {detail} = event;
    const detail = event.detail;

    // new Map() 'home' --> home, ...
    // myMap.get(view) itd.
    switch (detail.view) {
      case "home":
        section.empty().append(home());
        break;
      case "rooms":
        section.empty().append(rooms());
        break;
      case "rooms-detail":
        section.empty().append(roomsDetail(detail.roomId));
        break;
      case "signUp":
        section.empty().append(signUp());
        break;
      case "login":
        section.empty().append(login());
        break;
      case "basket":
        section.empty().append(basket());
        break;
      default:
        section.empty().append("Coś poszło nie tak :-(");
    }
  });

  return $(`<main></main>`).append(section);
};
