//****Global Variables ****
var newIdea;
var ideas = [];





// **** querySelectors ****
var saveButton = document.querySelector("#saveIdeaButton");
var title = document.querySelector("#titleInput");
var body = document.querySelector("#bodyInput");
var ideaBoard = document.querySelector("#ideaBoard");




//**** Event Listeners ****
ideaBoard.addEventListener("click", function(event) {
  if (event.target.id === "deleteButton") {
    deleteIdea(event);
  };
});
saveButton.addEventListener("click", saveIdea);
ideaBoard.addEventListener("click", favoriteIdea); 











//**** Functions **** 
function saveIdea(event) {
    event.preventDefault();
    newIdea = new Idea(title.value, body.value);
    ideas.push(newIdea);
    render();
    clearInputs();
}

function render() {
    var markup = "";

    for (var i = 0; i < ideas.length; i++) {
      var imageSource = getImageSourceFromIdea(ideas[i]); 
        markup += `
        <article class="idea" id="${ideas[i].id}">
          <div class="card-top-bar">
            <input type="image" class="card-top-button" id="favoriteButton" alt="Star favorite" src=${imageSource}>
            <input type="image" class="card-top-button" id="deleteButton" alt="Delete card" src="./images/delete.svg">
          </div>
          <div class="card-text">
            <h3>${ideas[i].title}</h3>
            <p class="card-body">${ideas[i].body}</p>
          </div>
          <div class="card-bottom-bar">
            <input type="image" class="comment-button" id="commentButton" alt="Add comment" src="./images/comment.svg">
            Comment
          </div>
        </article>
        `;
    }

    ideaBoard.innerHTML = markup;
} 

function getImageSourceFromIdea(idea) {
  if (!idea.star) {
    return "./images/star.svg"
  } else {
    return "./images/star-active.svg"
  }
}

function clearInputs() {
  title.value = null;
  body.value = null;
}

function favoriteIdea(event) {
  if (event.target.id === "favoriteButton") {
    var ideaId = event.target.closest("article").id;

    for (var i = 0; i < ideas.length; i++) {
      if (parseInt(ideaId) === ideas[i].id) {
        ideas[i].star = !ideas[i].star;
        
      }
    }
    render();

  }
}    

function deleteIdea(event) {
  var ideaId = event.target.closest("article").id;

  removeFromDataModel(ideaId);
  render();
}

function removeFromDataModel(ideaId) {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(ideaId) === ideas[i].id) {
      ideas.splice(i, 1);
    }
  }
}