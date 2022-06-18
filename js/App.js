{/* <script>
  var form = document.getElementById('form')

  form.addEventListener('submit', function(e){
    e.preventDefault()
    var title = document.getElementById('title').value
    var body =  document.getElementById('body').body
    $.post('https://jsonplaceholder.typicode.com/posts', {'title:'title,body:body}, function(data){
      console.log(data)
    })
  })
</script>

document.getElementById("getText").addEventListener
('click', getText);

function getText() {
  fetch('update.txt')
  .then((res) => res.text())
  .then((data) => console.log(data)) 
} */}
document.getElementById("addPost").addEventListener
('submit', addPost);


let postId = new URLSearchParams(window.location.search).get('id');

function addPost(e){
  e.preventDefault();

  let title = document.getElementById('title').value;
  let body = document.getElementById('body').value;

  fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type':'application/json'
    },
    body:JSON.stringify({title:title, body:body})
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
} 
