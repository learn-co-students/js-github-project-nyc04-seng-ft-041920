let usersArr = []
let reposArr = []
const form = document.querySelector("#github-form")
const githubContainer = document.querySelector('#github-container')
const userList = document.querySelector('#user-list')

// Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault();
  let input = e.target.search.value
  // wouldn't it be cool if you filtered it too???
  fetchHelper(input)

})

githubContainer.addEventListener('click', e => {
  e.preventDefault();
  // might be an issue here
  if (e.target.className === 'userBtn') {
    const userId = parseInt(e.target.dataset.id)
    const specificUser = usersArr.find(user => user.id === userId)
    // call a function to render that users information
    console.log(specificUser)
    renderUserData(specificUser)
  }
})

// Functions
function fetchHelper(input) {
  githubContainer.innerHTML = ""
  fetch(`https://api.github.com/search/users?q=${input}`)
    .then(r => r.json())
    .then(user => {
      usersArr = user.items
      usersArr.forEach(renderUsers)
    })
}

function renderUsers(user) {
  const userContainer = document.createElement('div')
  const userBtn = document.createElement('div')
  userBtn.className = "userBtn"
  userBtn.textContent = `${user.login}`
  userBtn.dataset.id = `${user.id}`
  githubContainer.appendChild(userBtn)
}


function renderUserData(user) {
  githubContainer.innerHTML = ""
  const card = document.createElement('section')
  card.className = "userCard"
  card.dataset.id = `${user.id}`
  card.innerHTML = `
    <div class="userBio">
      <h1 class="userLogin">${user.login}</h1>
      <img src="${user.avatar_url}" alt="${user.login} Avatar" class="userImage">
      <a href="${user.html_url}">Profile Page</a>
      <!-- what other info can you grab? -->
    </div>
    <ul class="repos">

    </ul>
  `
  githubContainer.appendChild(card)
  fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(r => r.json())
    .then(repos => {
      reposArr = repos
      reposArr.forEach(repo => {
        let repoLi = document.createElement('li')
        repoLi.textContent = `${repo.name}`
        githubContainer.querySelector('.repos').appendChild(repoLi)
      })
    })
}
