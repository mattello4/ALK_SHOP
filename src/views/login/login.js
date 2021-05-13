import $ from "jquery";
import axios from "axios";

export const login = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $("<h2>Login</h2>");
  const form = $(`
  <form name="login" autocomplete="off" novalidate>
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

  const button = form.find("button");

  button.on("click", (event) => {
    const login = $("#login").val();
    const password = $("#password").val();

    const data = {
      l: login,
      p: password,
    };

    axios
      .get("http://localhost:3000/users")
      .then((response) => response.data)
      .then(function (response) {
        console.log(response);
      })
      .then((users) => {
        const user = users.find((usr) => usr.l === data.l && usr.p === data.p);

        if (user) {
          console.log("TAK");
        } else {
          console.log("Coś poszło nie tak");
        }
      });
  });

  fragment.append(h2, form);

  return fragment;
};
