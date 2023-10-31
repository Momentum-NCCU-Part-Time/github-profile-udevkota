let entryPoint = document.querySelector('main')
let sumbitBtn = document.querySelector('button')

sumbitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let usernameInputVal = document.querySelector('input').value
  let githubUrl = 'https://api.github.com/users/'



  fetch(githubUrl+usernameInputVal)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      // console.log(data['name'])
      // console.log(data['avatar_url'])
      // console.log(data['location'])
      console.log(data['html_url'])
      // console.log(data['login'])

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
                      </div>`

                    
      
      fetch(`https://api.github.com/users/${usernameInputVal}/repos`)
        .then(res => res.json())
        .then(data => {
          for(let i=0; i < data.length; i++){
            let repoLi = `<span>${data[1]['html_url']}</span>
            <span>${data[1]['name']}</span>`
          }

          function repoDataToHTML(repository){
            // console.log(data[1]['name'])
            // console.log(data[1]['html_url'])
            let repoLi = `<span>${data[1]['html_url']}</span>
            <span>${data[1]['name']}</span>`
            // let repoLi = `<li><a href="${data['html_url']}">${data['name']}</a></li>`

            entryPoint.innerHTML = userInfo + repoLi
          }
          

        })
    })
    .catch( err => {
      console.log(err)
    })
})


//Need to do 
// run through array of repos and make them appear 
// fix submit button to input 
// add icons
