//Get the articles as a JSON
var dataLength = 0;

$.getJSON("/articles", function(data){
  dataLength = data.length;
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
      <input type="text" id="yourComment${i}" name="comment" placeholder="Give your Opinon!">
        <button><input type="submit" data-id="${data[i]._id}" id="submitComment"></button>
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
  for(let i = 0; i < dataLength; i++){
    $(`#yourComment${i}`).attr("data-id", username[username.length-1].name)
  }
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
  var Cval = "";
  var Cdata = "";
  var Cnum = 0;

  var thisId = $(this).attr("data-id");
  console.log(thisId)
  for(let i = 0; i < dataLength; i++){
    if($(`#yourComment${i}`).val()){
      Cval = $(`#yourComment${i}`).val()
      Cdata = $(`#yourComment${i}`).attr("data-id")
      Cnum = i
      console.log(Cval)
      console.log(Cdata)
    }
  }


  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      comment: Cval,
      user: Cdata
    }
  }).then(data => {
    console.log("see if this works")
    console.log(data)
    $(`#yourComment${Cnum}`).val("");
    $('.collapse').attr("class", "collapsing")
    $(".allComments").empty();
    $("#articleComments").text("Refreshed")
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

