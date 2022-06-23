function renderSingle() {
    let postSingle = localStorage.getItem('viewedPost')
    let post = JSON.parse(postSingle)
    console.log(post)

    document.getElementById('post-id').innerHTML = post.id
    document.getElementById('post-title').innerHTML = post.title
    document.getElementById('post-body').innerHTML = post.body
}

renderSingle()

(function () {
  let postSingle = localStorage.getItem('viewedPost')
  let post = JSON.parse(postSingle)
  console.log(post)

  document.getElementById('post-id').innerHTML = post.id
  document.getElementById('post-title').innerHTML = post.title
  document.getElementById('post-body').innerHTML = post.body
})();