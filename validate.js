function renderError(el, value) {
  document.querySelector("span" + `.${el}`).innerHTML = value;
}
function checkForm() {
  let check = true;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const country = document.querySelector("#country").value;
  const bio = document.querySelector("#bio").value;
  const subject = document.querySelector("#subject").value;
  const favorites = document.getElementsByName("favorite");
  const favoriteNum = [];
  if (bio == "") {
    renderError("bio", "Không được để trống");
    check = false;
  } else {
    renderError("bio", "");
  }
  if (subject == "") {
    renderError("subject", "Không được để trống");
    check = false;
  } else {
    renderError("subject", "");
  }
  if (username == "") {
    renderError("username", "Không được để trống");
    check = false;
  } else {
    renderError("username", "");
  }
  if (country == "") {
    renderError("country", "Không được để trống");
    check = false;
  } else {
    renderError("country", "");
  }
  if (password == "") {
    renderError("password", "Không được để trống");
    check = false;
  } else {
    renderError("password", "");
  }
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].checked) {
      favoriteNum.push(favorites[i].value);
    }
  }
  if (favoriteNum.length <= 0) {
    renderError("favorite", "Không được để trống");
    check = false;
  } else {
    renderError("favorite", "");
  }
  return check;
}
const btnEmail = document.querySelector(".btn-email");
const textEmail = document.querySelector(".email");
btnEmail.addEventListener("click", () => {
  textEmail.classList.toggle("email");
});
