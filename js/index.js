const form = document.querySelector('#github-form')

form.addEventListener('submit', e => {
  e.preventDefault()
  const searchQuery = e.target.search.value
  getUsers(searchQuery)
})

function getUsers(searchQuery){
  const url = `https://api.github.com/search/users?q=${searchQuery}`
  fetch(url)
    .then(r => r.json())
    .then(users => {
      users.items.forEach(user => {
        renderUser(user)
        console.log(user)
      });
    })
}

function getUserRepos(username){
  const url = `https://api.github.com/users/${username}/repos`
  fetch(url)
    .then(r => r.json())
    .then(repos => {
      console.log(repos)
      repos.forEach(repo => {
        renderRepo(repo)
        
      });
    })
}

const repoList = document.querySelector('#repos-list')
function renderRepo(repo){
  const repoName = document.createElement('h2')
  const repoLink = document.createElement('a')
  repoLink.innerText = repo.name
  repoLink.href = repo.html_url
  repoName.append(repoLink)
  repoList.append(repoName)
}


const userList = document.querySelector('#user-list')
function renderUser(user){
  const li = document.createElement('li');
  li.dataset.id = user.id
  const userImg = document.createElement('img');
  const userLink = document.createElement('a');
  const userLogin = document.createElement('h2');
  userLogin.innerHTML = user.login
  userImg.src = user.avatar_url;
  userLink.href = user.html_url;
  userLink.innerText = 'Go to profile'

  li.append(userLogin, userImg, userLink)
  userList.append(li)

  li.addEventListener('click', e => {
    const username = user.login
    getUserRepos(username)
  })
}


