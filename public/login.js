const url = "http://localhost:3000";

const save = (e) => {
  // e.preventDefault();
  console.log(e);
  console.log("hello");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const obj = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);

  axios
    .post(`${url}/signup`, obj)
    .then(async (data) => {
      console.log(data);
      console.log(data.data);
      if (data.data.name == "SequelizeUniqueConstraintError") {
        console.log("duplicate");
        const showResult = document.getElementById("showResult");
        showResult.innerHTML = "User Already exist";
      } else {
        // e.redirect('login.html')
        alert(data.data.message);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userName", data.data.name);
        localStorage.setItem("isPremium", data.data.is_premium);
        window.location = `${url}/expense.html`;
      }
    })
    .catch((err) => console.log(err));
  name.value = "";
  email.value = "";
  password.value = "";
};
const login = (e) => {
  // e.preventDefault();
  console.log(e);
  console.log("login");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const obj = {
    email: email.value,
    password: password.value,
  };
  console.log(obj);

  axios
    .post(`${url}/login`, obj)
    .then((data) => {
      console.log(`in login response`);
      console.log(data);
      localStorage.setItem(`userName`, `${data.data.name}`);
      localStorage.setItem(`token`, `${data.data.token}`);
      localStorage.setItem(`isPremium`, `${data.data.is_premium}`);
      const showResult = document.getElementById("showResult");
      showResult.innerHTML = "User login successfully";
      alert("user login successful");
      window.location = `${url}/expense.html`;
      email.value = "";
      password.value = "";
      //user already exist message and not direct to anyother location(bug)
    })
    .catch((err) => {
      console.log(err);
      const showResult = document.getElementById("showResult");
      showResult.innerHTML = err.response.data.name;
    });
};
// login();

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token == undefined || token == "" || token == null) {
  } else {
    alert("You are already login");
    window.location = `${url}/expense.html`;
  }
});

const forgetPassword = () => {
  const forget_password = document.getElementById("forget_password");
  forget_password.addEventListener("click", () => {
    location = `${url}/forget.html`;
  });
};
forgetPassword();
