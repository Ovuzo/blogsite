<script>
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