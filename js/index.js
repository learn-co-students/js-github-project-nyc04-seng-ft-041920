const form = document.querySelector("#github-form")

form.addEventListener("submit", (event) => {
  event.preventDefault()

	//use console.dir to find this
  const userInput = event.target[0].value


  fetch(`https://api.github.com/search/users?q=${userInput}`)
  .then((response) => {
    return response.json()
  })
  .then((githubUsers) => {
      createEachUser(githubUsers)
      
    })
})

function createEachUser(githubUsers) {
  // SELECT <ul> ELEMENT FROM HTML TO APPEND USERS
  const userList = document.querySelector("#user-list")

  // SELECT <ul> ELEMENT FROM HTML TO APPEND EACH USER REPO
  const userRepoList = document.querySelector("#repos-list")

  // WE NEED TO ITERATE OVER ->> EACH USER
  githubUsers.items.forEach((user) => {

    // CREATE A NEW <li> ELEMENT FOR ->> EACH USER
    const userLi = document.createElement("li")
    // innerHTML will paste all the HTML tags and texts to the DOM 
    // and convert them to proper HTML tags and JS objects.
    userLi.innerHTML = `        
      <h1>${user.login}</h1>
      <img src=${user.avatar_url}>
      <p><a href=${user.html_url}>User Profile</a></p>
    ` 
    // APPEND ->> EACH <li> TO <ul> ELEMENT ON THE PAGE
    userList.append(userLi)

    //CLOSURE
    // WITHIN AN ->> EACH <li> (userLi) LOOK FOR A <img> TAG 
    const img = userLi.querySelector("img")
    
    img.addEventListener("click", (event) => {
      // WE ARE CLEANING UP THE <ul> FROM ALL OF THE PREVIOUS USER REPOS
      userRepoList.innerHTML = ""

      // CREATE A NEW FETCH REQUEST FOR EACH USER
      fetch(`https://api.github.com/users/${user.login}/repos`)
      .then(response => {
        return response.json()
      })
      .then(userRepos => {
        console.log(userRepos)
        
        userRepos.forEach((repo) => {
          userRepoList.innerHTML += `
            <li>
              <p>${repo.full_name}</p>
            </li>
          `
        })

      })
    })
  })
}

