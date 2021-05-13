import $ from "jquery";
export * from "../layout/navigation.css";

const button = (text) => $(`<button type="button">${text}</button>`);

const createNavigationEvent = (view) =>
  new CustomEvent("navigation", {
    detail: {
      view: view,
    },
  });

export const navigation = () => {
  const nav =
    $(`<nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">


  
  </nav>`);

  const basketButton = button("Koszyk").addClass("nav navbar-nav btn");
  basketButton.on("click", function (event) {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent("basket"));
  });

  const homeButton = button("Home").addClass("nav navbar-nav btn");
  homeButton.on("click", function (event) {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent("home"));
  });

  const roomsButton = button("Pokoje").addClass("nav navbar-nav btn");
  roomsButton.on("click", function (event) {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent("rooms"));
  });

  const signUpButton = button("Zarejestruj się").addClass("nav navbar-nav btn");
  signUpButton.on("click", function (event) {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent("signUp"));
  });

  const loginButton = button("Zaloguj się").addClass("nav navbar-nav btn");
  loginButton.on("click", function (event) {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent("login"));
  });

  const treatmentsButton = button("Zabiegi").addClass("nav navbar-nav btn");
  treatmentsButton.on("click", function (event) {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent("treatments"));
  });

  nav.append(
    basketButton,
    homeButton,
    roomsButton,
    treatmentsButton,
    signUpButton,
    loginButton
  );

  return nav;
};
