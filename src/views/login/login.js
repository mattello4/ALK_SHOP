import $ from "jquery";
import axios from "axios";

export const login = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $("<h2>Login</h2>");
  const form = $(`
  <form name="login" autocomplete="off" novalidate>
 
  <div class="row justify-content-md-center">
  <div class="card col-sm-12 col-md-4">
  <div class="alert alert-danger" id="danger-alert">
  <button type="button" class="close" data-dismiss="alert">x</button>
   Wpisałeś błędne hasło lub użytkownika.
</div>
      <div class="form-group">
          <label for="login">Login</label>
          <input id="login" class="form-control" type="text">
         
      </div>

      <div class="form-group">
          <label for="password">Password</label>
          <input id="password" class="form-control" type="password">
    
      </div>
      
      <button class="btn btn-primary" type="button">Login</button>
  </form>
`);

  const danger = form.find("#danger-alert");
  danger.hide();

  const button = form.find("button");

  button.on("click", (event) => {
    const login = $("#login").val();
    const password = $("#password").val();

    const data = {
      l: login,
      p: password,
    };

    axios;
    axios
      .get("http://localhost:3000/users")
      .then((response) => response.data)
      .then((users) => {
        const user = users.find((usr) => usr.l === data.l && usr.p === data.p);

        if (user) {
          sessionStorage.setItem("user", JSON.stringify(user));
          window.location.reload(true);
        } else {
          danger.show();
          danger.fadeTo(2000, 500).slideUp(500, function () {
            danger.slideUp(500);
          });
        }
      });
  });

  fragment.append(h2, form);

  return fragment;
};
