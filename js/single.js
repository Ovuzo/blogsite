function renderSingle() {
    let postSingle = localStorage.getItem('viewedPost')
    let post = JSON.parse(postSingle)
    console.log(post)

    document.getElementById('post-id').innerHTML = post.id
    document.getElementById('post-h').innerHTML = post.title
    document.getElementById('post-b').innerHTML = post.body
}

renderSingle()
