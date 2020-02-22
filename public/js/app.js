// Keeps track of current user
var currentUser = "";

//Get the articles as a JSON and display on page
$.getJSON("/articles", function(data){
  dataLength = data.length;
  for(var i = 0; i < data.length; i++){
    $("#articles").append(`<div class=col-md-12></div>`)
    $("#articles").append(`<div class=row></div>`)
    $("#articles").append(`<div data-id='${data[i]._id}'></div>`)
    $("#articles").append(`<h1 id="dataLength" data-id=${data.length}>${data[i].headline}</h1>`)
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

// Get username and put username in all articles
$.getJSON("/submit", function(username){
  // Get data length to go through all articles
  $.getJSON("/articles", function(data){
  const dataLength = data.length;
  console.log(username)
  currentUser = username[username.length-1].name;
  console.log(currentUser)
  console.log(dataLength)
  // Give each article an unique id
  for(let i = 0; i < dataLength; i++){
    $(`#yourComment${i}`).attr("data-id", currentUser)
  }
  })
})

// Click event for seeing comments
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
      </h5><button id=${data.comments[i].user} data-id=${data.comments[i]._id} type="button" class="btn btn-danger deleteButton" style="height: 30px; width: 20px">X</button>
      <h5 id="commentSection">${data.comments[i].user}: ${data.comments[i].comment}
      </div></div>
      `)
    }
  })
});

// Click event for submitting comments
$(document).on("click", "#submitComment", function(event) {
  event.preventDefault();
  var Cval = "";
  var Cdata = "";
  var Cnum = 0;

  // Find the right number for the article you're on
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

  //Add comment to Mongo and the page 
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

//Click Even for deleting comments
$(document).on("click", ".deleteButton", function() {

  var selected = $(this).attr("data-id")
  var userID = $(this).attr("id")
  console.log(selected)
  console.log(userID)
  console.log(currentUser)

  //If user is the current user
  if(userID === currentUser){

    //Delete the specific comment
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
  // Else change button to show its not yours
  } else {
    $("#articleComments").text("Not Yours")
  }

})

