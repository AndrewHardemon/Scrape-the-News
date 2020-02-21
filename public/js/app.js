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

// action="/submitComment" method="post"
$.getJSON("/submit", function(data){
  console.log(`This is the comment data:
              ${data}`)
  $("#yourComment").append(`<p id="theName" value=${data[(data.length-1)]._id}>${data[(data.length-1)].name}</p>`)
})


// $(document).on("click", "articleComments", function() {
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   }).then(data => {
//     console.log("see if this works")
//     console.log(data)
//     console.log(data.comment)
//     $("#allComments").append(`<h5>${data.comment}</h5>`)
//   })
// });


$(document).on("click", "#submitComment", function(event) {
  event.preventDefault();
// $("#articleComments").on("click", function(){
  // $("#comments").empty();

  var thisId = $("#articleComments").attr("data-id");
  console.log(thisId)
  console.log($("#yourComment").val())

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
    data: {
      comment: $("#yourComment").val(),
      commentCreated: Date.now,
      // user: "JEFF",
      article: thisId
    }
  }).then(data => {
    console.log("see if this works")
    console.log(data)


  })






})

// $.getJSON("/submitComment", function(data){
//   for(var i = 0; i <data.length; i++){
//     $(".allComments").append(`<p>${data[i].comment}<p>`);
//   }
