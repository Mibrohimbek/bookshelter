let email = "eve.holt@reqres.in";
let password = "cityslicka";

let emailInput = document.querySelector(".email");
let passInput = document.querySelector(".password");
let form = document.querySelector("#form");
let lsEmail = localStorage.getItem("email");
let lsPass = localStorage.getItem("password");

if (lsEmail == email && password == lsPass) {
  window.location.replace("../index.html");
}

form.addEventListener("submit", (e) => {
  if (emailInput.value == email && passInput.value == password) {
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("password", passInput.value);
    window.location.replace("../index.html");
  }else{
    alert('Password yoki email xato')
  }
  emailInput.value = ''
  passInput.value = ''
  e.preventDefault();
});

//   fetch("https://regres.in/api/login", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify({
//       email: emailInput.value,
//       password: passInput.value,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         window.location.replace("../pages/index.html");
//       }
//     })
//     .catch((err) => console.log(err));
// });

// function login(username, pass) {
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       'Accept': "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify({ email: username, password: pass }),
//   };

//   return fetch(`https://reqres.in`,)
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         window.location.replace("../pages/index.html");
//       }

//       // return data.token
//     });
// }

// login(email, passInput);
