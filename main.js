const content = document.querySelector("tbody");
const url = "http://localhost:3000/users";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    content.innerHTML = data
      .map((item, index) => {
        const favorite = item.favorite;
        return /*html*/ `
    <tr>
      <td>${index + 1}</td>
      <td>${item.username}</td>
      <td><img src="${item.avatar}" alt="avatar" /></td>
      <td>${item.password}</td>
      <td>${item.gender}</td>
      <td>${item.country}</td>
      <td>${item.bio}</td>
      <td>${item.subject}</td>
      <td>
    ${favorite
      .map((item) => {
        return /*html*/ ` 
      <div style="background-color: ${item}; width: 50px;" class="btn color"></div>
      `;
      })
      .join("")}
      </td>
      <td>
      <button data-id="${
        item.id
      }" class="btn btn-danger btn-remove">Xóa</button>
      <button data-id="${
        item.id
      }" class="btn btn-primary btn-update">Cập nhật</button>
      </td>
    </tr>
      `;
      })
      .join("");

    //add
    const btnAdd = document.querySelector(".btn-add");
    btnAdd.addEventListener("click", () => {
      document.querySelector("body").innerHTML = /*html*/ `
      <form action="" style="width: 300px;" class="container form">
      <h3>Thêm user</h3>
      <div class="form-group">
        <label for="">Username</label><span class="username"></span>
        <input class="form-control" type="text" id="username">
      </div>
      <div class="form-group">
      <label for="">Avatar</label><span class="avatar"></span>
      <input type="file" name="image" onchange="previewFile()" id="image">
      <img width="150px" height="150px" src="" id="image_preview" alt="Image Preview" class="mt-2">
    </div>
      <div class="form-group">
        <label for="">Password</label><span class="password"></span>
        <input class="form-control" type="password" id="password">
      </div>
      <div class="form-group">
        <label for="">Gender</label>
        <div class="d-flex align-items-center gap-2">
        <input type="radio" name="gender" value="Nam" checked>Nam
        <input type="radio" name="gender" value="Nam">Nữ
        </div>
      </div>
      <div class="form-group">
        <label for="">Country</label><span class="country"></span>
        <input class="form-control" type="text" id="country">
      </div>
      <div class="form-group">
        <label for="">Bio</label><span class="bio"></span>
        <input class="form-control" type="text" id="bio">
      </div>
      <div class="form-group">
      <label for="">Subject</label><span class="subject"></span>
      <select name="subject" class="form-select" id="subject">
      <option value="">Select Option</option>
      <option value="Math">Math</option>
      <option value="English">English</option>
      <option value="History">History</option>
      </select>

    </div>
      <div class="form-group">
        <label for="">Favorite</label><span class="favorite"></span><br>
        <input type="checkbox" name="favorite" value="green"> Xanh
        <input type="checkbox" name="favorite" value="red"> Đỏ
        <input type="checkbox" name="favorite" value="yellow"> Vàng
      </div>
      <button type="submit" class="btn btn-primary mt-2" onclick="return checkForm()">Thêm</button>
    </form>
      `;
      const form = document.querySelector(".form");
      form.addEventListener("submit", () => {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const genders = document.getElementsByName("gender");
        const gender = genders[0].checked ? "Nam" : "Nữ";
        const country = document.querySelector("#country").value;
        const bio = document.querySelector("#bio").value;
        const subject = document.querySelector("#subject").value;
        const favorites = document.getElementsByName("favorite");
        const avatar = document
          .querySelector("#image_preview")
          .getAttribute("src");
        let favorite = [];
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].checked) {
            favorite.push(favorites[i].value);
          }
        }
        const dataAdd = {
          username: username,
          avatar: avatar,
          password: password,
          gender: gender,
          country: country,
          bio: bio,
          subject: subject,
          favorite: favorite,
        };
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataAdd),
        }).then(alert("Thêm mới thành công"));
      });
    });
    const btnDeletes = document.querySelectorAll(".btn-remove");
    for (let btn of btnDeletes) {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        if (confirm("Are you sure?")) {
          fetch(`${url}/${id}`, {
            method: "DELETE",
          }).then(alert("Đã xóa thành công"));
        } else {
          alert("Canceled");
        }
      });
    }
    const btnUpdates = document.querySelectorAll(".btn-update");
    for (let btn of btnUpdates) {
      const id = btn.dataset.id;
      btn.addEventListener("click", () => {
        fetch(`${url}/${id}`)
          .then((response) => response.json())
          .then((data) => {
            document.querySelector("body").innerHTML = /*html*/ `
          <form action="" style="width: 300px;" class="container form">
          <h3>Cập nhật user</h3>
          <div class="form-group">
            <label for="">Username</label><span class="username"></span>
            <input class="form-control" type="text" id="username" value="${
              data.username ?? ""
            }">
          </div>
          <div class="form-group">
          <label for="">Avatar</label><span class="avatar"></span>
          <input type="file" name="image" onchange="previewFile()" id="image">
          <img width="150px" height="150px" src="${
            data.avatar
          }" id="image_preview" alt="Image Preview" class="mt-2">
        </div>
          <div class="form-group">
            <label for="">Password</label><span class="password"></span>
            <input class="form-control" type="password" id="password" value="${
              data.password
            }">
          </div>
          <div class="form-group">
            <label for="">Gender</label>
            <div class="d-flex align-items-center gap-2">
            <input type="radio" name="gender" value="Nam" ${
              data.gender === "Nam" ? "checked" : false
            }>Nam
            <input type="radio" name="gender" value="Nữ" ${
              data.gender === "Nữ" ? "checked" : false
            }>Nữ
            </div>
          </div>
          <div class="form-group">
            <label for="">Country</label><span class="country"></span>
            <input class="form-control" type="text" id="country" value="${
              data.country
            }">
          </div>
          <div class="form-group">
            <label for="">Bio</label><span class="bio"></span>
            <input class="form-control" type="text" id="bio" value="${
              data.bio
            }">
          </div>
          <div class="form-group">
          <label for="">Subject</label><span class="subject"></span>
          <select name="subject" class="form-select" id="subject">
          <option value="">Select Option</option>
          <option ${
            data.subject === "Math" ? "selected" : false
          } value="Math">Math</option>
          <option ${
            data.subject === "English" ? "selected" : false
          } value="English">English</option>
          <option ${
            data.subject === "History" ? "selected" : false
          } value="History">History</option>
          </select>
    
        </div>
          <div class="form-group">
            <label for="">Favorite</label><span class="favorite"></span><br>
            <input ${
              data.favorite.includes("green") ? "checked" : false
            } type="checkbox" name="favorite" value="green"> Xanh
            <input ${
              data.favorite.includes("red") ? "checked" : false
            } type="checkbox" name="favorite" value="red"> Đỏ
            <input ${
              data.favorite.includes("yellow") ? "checked" : false
            } type="checkbox" name="favorite" value="yellow"> Vàng
          </div>
          <button type="submit" class="btn btn-primary mt-2" onclick="return checkForm()">Thêm</button>
        </form>
          `;
            const form = document.querySelector(".form");
            form.addEventListener("submit", () => {
              const username = document.querySelector("#username").value;
              const password = document.querySelector("#password").value;
              const genders = document.getElementsByName("gender");
              const gender = genders[0].checked ? "Nam" : "Nữ";
              const country = document.querySelector("#country").value;
              const bio = document.querySelector("#bio").value;
              const subject = document.querySelector("#subject").value;
              const favorites = document.getElementsByName("favorite");
              const avatar = document
                .querySelector("#image_preview")
                .getAttribute("src");
              let favorite = [];
              for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].checked) {
                  favorite.push(favorites[i].value);
                }
              }
              const dataAdd = {
                id,
                username: username,
                avatar: avatar,
                password: password,
                gender: gender,
                country: country,
                bio: bio,
                subject: subject,
                favorite: favorite,
              };
              fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataAdd),
              }).then(alert("Cập nhật thành công"));
            });
          });
      });
    }
  });
function previewFile() {
  //upload file
  // const image = document.querySelector("#image_preview").getAttribute("src"); //lấy link ảnh trong fetch
  const preview = document.querySelector("#image_preview");
  const file = document.querySelector("#image").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      preview.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
}
