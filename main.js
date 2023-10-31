let entryPoint = document.querySelector('main')
let sumbit = document.querySelector('#usernameForm')

sumbit.addEventListener('submit', (event) => {
  event.preventDefault()
  let usernameInputVal = document.querySelector('input').value

  fetch(`https://api.github.com/users/${usernameInputVal}`)
    .then(res => res.json())
    .then(data => {
      let userInfo = `<div class="userImageAndName">
                        <img src="${data['avatar_url']} class="userImage">
                        <h2 class="userName">${data['name']}</h2>
                      </div>
                      <ul class="addresses">
                        <li>Location: ${data['location']}</li>
                        <li>GitHub URL: <a href="${data['html_url']}">${data['login']}</a></li>
                        <li>GitHub username: ${data['login']}</li>
                      </ul>
                      <div class="repos">
                        <h3 class="reposTitle">GitHub Repos</h3>
                        <ul class="reposList">
                        </ul>
                      <div class="repos">`

      fetch(`https://api.github.com/users/${usernameInputVal}/repos`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          function customerToHTML(repoData) {
            return `<li><a href="${repoData['html_url']}">${repoData['name']}</a></li>`
          }

          let allRepos = data.map((repoElement) => customerToHTML(repoElement)).join('\n');

          entryPoint.innerHTML = userInfo + allRepos
        })
    })
    .catch( err => {
      console.log(err)
    })
})


//Need to do 
//append li(s) since need to attach within ul (template literal would not be a good choice here unless you append)
// css
  // add icons