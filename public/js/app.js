//Get the articles as a JSON
$.getJSON("/articles", function(data){
  for(var i = 0; i < data.length; i++){
    $("#articles").append(`<div class=col-md-12></div>`)
    $("#articles").append(`<div class=row></div>`)
    $("#articles").append(`<div data-id='${data[i]._id}'></div>`)
    $("#articles").append(`<h1>${data[i].headline}</h1>`)
    $("#articles").append(`<h4>${data[i].summary}</h4>`)
    $("#articles").append(`<p>https://www.nytimes.com/${data[i].link}</p>`)
    $("#articles").append(`<img src='${data[i].image}' href='https://www.nytimes.com/${data[i].link}'></img><hr>`)
    $("#articles").append(`
    <form>
      <input type="text" id="yourComment" name="comment" placeholder="Give your Opinon!">
        <button><input type="submit" id="submitComment"></button>
    </form><br>
    <p><button id="articleComments" data-id="${data[i]._id}" class="btn btn-primary" type="button" data-toggle="collapse" 
    data-target="#commentsSection${i}" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample"> Comments </button></p>
    <div class="collapse" id="commentsSection${i}" data-id="${data[i]._id}"><div class="allComments card card-body"></div></div><hr><br>
`)}
})

// // action="/submitComment" method="post"
$.getJSON("/submit", function(username){
  console.log(username)
  console.log(username[username.length-1].name)
  $("#yourComment").attr("data-id", username[username.length-1].name)
})


$(document).on("click", "#articleComments", function() {

  $(".allComments").empty();
  var thisId  = $(this).attr("data-id")
  console.log(thisId)
  
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(data => {
    console.log("see if this works")
    console.log(data)
    console.log(data.comments)
    for(let i = 0; i < data.comments.length; i++){
      $(".allComments").append(`
      <div class="col-md-12"><div class="row">
      </h5><button data-id=${data.comments[i]._id} type="button" class="btn btn-danger deleteButton" style="height: 30px; width: 20px">X</button>
      <h5 id="commentSection">${data.comments[i].user}: ${data.comments[i].comment}
      </div></div>
      `)
    }
  })
});


$(document).on("click", "#submitComment", function(event) {
  event.preventDefault();

  var thisId = $("#articleComments").attr("data-id");
  console.log(thisId)
  console.log($("#yourComment").val())
  console.log($("#yourComment").attr("data-id"))

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      comment: $("#yourComment").val(),
      user: $("#yourComment").attr("data-id")
    }
  }).then(data => {
    console.log("see if this works")
    console.log(data)
    $("#yourComment").val("");
    $('.collapse').attr("class", "collapsing")
    $(".allComments").empty();
  })

})

$(document).on("click", ".deleteButton", function() {

  var selected = $(this).attr("data-id")
  console.log(selected)

  $.ajax({
    type: "GET",
    url: "/delete/" + selected,
    success: function(response){
      $(this).parent().remove();
    }
  }).then(data => {
    console.log(data)
    $('.collapse').attr("class", "collapsing")
    $(".allComments").empty();
  })

})

