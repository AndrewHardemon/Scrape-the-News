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
    data-target="#commentsSection${i}" aria-expanded="false" aria-controls="collapseExample"> Comments </button></p>
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
      </h5><button type="button" class="btn btn-danger" style="height: 30px; width: 20px">X</button>
      <h5 id="commentSection">${data.comments[i].user}: ${data.comments[i].comment}
      </div></div>
      `)
    }
    // $(".allComments").append(`<h5 id="commentSection"></h5>`)
    // if(data.comments){
    //   for(let i = 0; i < data.comments.length; i++){
    //     $("#commentSection").val(data.comments[i].comment)
    //   }
    // }
  })
});


$(document).on("click", "#submitComment", function(event) {
  event.preventDefault();
// $("#articleComments").on("click", function(){
  // $("#comments").empty();

  var thisId = $("#articleComments").attr("data-id");
  console.log(thisId)
  console.log($("#yourComment").val())
  console.log($("#yourComment").attr("data-id"))

  // $.ajax({
  //   method: "GET",
  //   url: "/gettingComments"
  // }).then(commentData => {
  // console.log(commentData)

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
    $(".allComments").empty();
  })
// })



})

// $.getJSON("/submitComment", function(data){
//   for(var i = 0; i <data.length; i++){
//     $(".allComments").append(`<p>${data[i].comment}<p>`);
//   }
