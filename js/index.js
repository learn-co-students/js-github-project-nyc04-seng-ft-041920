function getUsernames() {
    const form = document.querySelector('#github-form');
    form.addEventListener('submit', (e) => {
        // const username = e.target.search.value;
        e.preventDefault()
        const username = e.target.search.value;
        fetchUser(username)

    })
}

getUsernames()


function fetchUser(username) {
    url = `https://api.github.com/search/users?q=${username}`;
    fetch(url).then(resp => resp.json()).then(json => {
        renderUsers(json)
    })
}


function renderUsers(json) {
    console.log(json)
    // debugger
    const users = document.querySelector('#user-list');
    json.items.forEach(user => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const a = document.createElement('a');
        const h4 = document.createElement('h4');
        h4.innerHTML = user.login
        img.src = user.avatar_url;
        a.href = user.html_url;
        a.innerText = 'Go to profile'
        li.append(h4);
        li.append(img);
        li.append(a);
        users.append(li)
        addEvent(li)
    });

}

function addEvent(li) {
    li.addEventListener('click', (e) => {
        const user = e.target.parentElement.firstElementChild.innerText;
        fetchRepos(user)
    })
}

function fetchRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`).then(resp => resp.json())
        .then(repoObject => renderRepos(repoObject))
}

function renderRepos(repoObject) {
    console.log(repoObject)
    const repoList = document.getElementById('repos-list');
    const repoTitle = document.createElement('h4');
    repoTitle.innerText = "User Repos";
    repoList.append(repoTitle)
    repoObject.forEach(repo => {
        const li = document.createElement('li');
        li.innerText = repo.name
        repoList.append(li)
    })
}