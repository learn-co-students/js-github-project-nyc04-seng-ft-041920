const form = document.querySelector("#github-form");
const userList = document.querySelector("#user-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchValue = event.target.search.value;

  fetch(`https://api.github.com/search/users?q=${searchValue}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.items.forEach(function (user) {
        const list = document.createElement("li");
        list.innerHTML = `
          <h3>Username: ${user.login}</h3>
          <img src=${user.avatar_url}>
          <h6>Github link: ${user.url}<h6>
          `;
        userList.append(list);

        list.addEventListener("click", function (event) {
          const reposList = document.querySelector("#repos-list");
          reposList.innerHTML = "";

          fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              json.forEach(function (repo) {
                reposList.innerHTML += `<li>Repo Name: ${repo.full_name}</li>`;
              });
            });
        });
      });
    });
});

//keys:
// avatar_url
// login
// url
