let postContainer = document.querySelector(".post-container")
let postForm = document.querySelector("#post-form");

let postsDB = []

postForm.addEventListener("submit", createPost)

// get posts function similar to a Read operation, the R in CRUD

function getPosts () {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    postsDB= data
    renderPosts(postsDB)
  })
}

getPosts()


function viewSinglePost(id) {

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
     .then(response => response.json())
     .then(data => {
      console.log(data)
      localStorage.setItem('viewedPost', JSON.stringify(data))
      window.location.href = `single-post.html`
     })
       
    }

    function backToHome(id) {

      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
         .then(response => response.json())
         .then(data => {
          console.log(data)
          localStorage.setItem('viewedPost', JSON.stringify(data))
          window.location.href = `index.html`
         })
           
        }

// create posts function similar to a Create operation, the C in CRUD

function createPost(e) {
    e.preventDefault();
    let postTitle = document.querySelector('#post-title')
    let description = document.querySelector('#description')
    let postNew = {
      id: postsDB.length + 1,
      title: postTitle.value,
      body: description.value,
      userId: 1
    }
    if(postTitle.value || description.value) {
        fetch('https://jsonplaceholder.typicode.com/posts',{
           method:'POST',
           body: JSON.stringify(postNew), 
           headers: {
            'Content-type': 'application/json'
           }
         })
         .then(response => response.json())
         .then(data => {
            console.log(data)
          })
          postsDB.unshift(postNew)

        postTitle.value =""
        description.value=""
        postNew = {}
        renderPosts(postsDB)
    }
}


  function updateSinglePost(id) {
    let singlePost = {}
    postsDB.forEach(post => {
      if(post.id === id) {
        singlePost = post
      }
    })
    console.log(singlePost)

    let postTitle = document.querySelector('#post-title')
    let description = document.querySelector('#description')
    let formWrapper = document.querySelector('.form-wrapper')

    postTitle.value = singlePost.title
    description.value = singlePost.body

    let postToUpdate = `
      <form action="" id="update-form">
       <div class="mb-3">
        <label for="post-title" class="form-label fs-3">Update Post</label>
        <input type="text" class="form-control" id="updatePost-title" placeholder="Post Title" value='${singlePost.title}'>
       </div>
       <div class="mb-3">
        <label for="description" class="form-label fs-3">Description</label>
        <textarea class="form-control" id="update-description" rows="3" value=''>${singlePost.body}</textarea>
       </div>
        <button type="submit" class="btn btn-lg btn-success" onclick="">UPDATE</button>
      </form>
    `
    formWrapper.innerHTML = postToUpdate;

    let updateForm = document.querySelector("#update-form");
    updateForm.addEventListener('submit', update)

    let updatePostTitle = document.querySelector('#updatePost-title')
    let updateDescription = document.querySelector('#update-description')

    function update(e) {
      e.preventDefault()
      alert(`Post ${id} updated`)
     let updateObject = {
       id: id,
       title: updatePostTitle.value,
       body: updateDescription.value,
       userId:2
     }

     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
      method:'PUT',
      body: JSON.stringify(updateObject),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
     })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      postsDB = postsDB.filter(post => post.id !==id)
     postsDB.unshift(data)
     renderPosts(postsDB)
    })
  
     updatePostTitle.value= ""
     updateDescription.value =""
     formWrapper.innerHTML = postForm.innerHTML;
    }
  }

  // delete posts function similar to a delete operation, the D in CRUD

  function deleteSinglePost(id) {
        fetch('https://jsonplaceholder.typicode.com/posts/${id}', {
          method: 'DELETE',
        })
        .then((response) => response.json())
        .then(data =>{
          console.log(data)
          postsDB =  postsDB.filter(post => post.id !== id)
          renderPosts(postsDB)
        }) 
  }

function renderPosts(arr) {
  let postBox = '';

  arr.forEach(post=> {
    postBox += `
    <div class="col-lg-4 col-md-6 mb-3">
      <div class="card p-4 mb-3 border-none h-100">
        <div class="card-body">
            <h6 class="py-3">${post.id}</h6>
            <h3>${post.title}</h3>
            <p class="py-2">
              ${post.body}
            </p>
        </div>
        <div class=" d-flex justify-content-between">
          <button class="btn btn-primary px-4" onclick="viewSinglePost(${post.id})">VIEW</button>
          <button class="btn btn-outline-success " onclick="updateSinglePost(${post.id})">UPDATE</button>
          <button class="btn btn-danger " onclick="deleteSinglePost(${post.id})">DELETE</button>
       </div>
     </div>
   </div>
    `
  })
 postContainer.innerHTML = postBox;
}
