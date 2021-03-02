//****Global Variables ****
var newIdea;
var ideas = [];
// **** querySelectors ****
var saveButton = document.querySelector("#saveIdeaButton");
var title = document.querySelector("#titleInput");
var body = document.querySelector("#bodyInput");
var searchBar = document.querySelector("#searchInput");
var ideaBoard = document.querySelector("#ideaBoard");
var toggleStarredIdeasButton = document.querySelector("#showIdeasButton");
//**** Event Listeners ****
ideaBoard.addEventListener("click", deleteIdea);
ideaBoard.addEventListener("click", favoriteIdea);
saveButton.addEventListener("click", saveIdea);
title.addEventListener("input", showSave);
body.addEventListener("input", showSave);
searchBar.addEventListener("input", filterIdeas);
ideaBoard.addEventListener("click", commentIdea);
ideaBoard.addEventListener("click", addComment);
toggleStarredIdeasButton.addEventListener("click", toggleStarredIdeas);
window.addEventListener("load", renderPage);
//**** Functions ****
function saveIdea(event) {
  event.preventDefault();
  if (!title.value || !body.value) {
    return
  }
  newIdea = new Idea(title.value, body.value, false, Date.now());
  newIdea.saveToStorage(newIdea);
  ideas.push(newIdea);
  render(ideas);
  clearInputs();
  saveButton.classList.add('disable-save');
}
function renderPage() {
  var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
  if (retrievedIdeas) {
    for (var i = 0; i < retrievedIdeas.length; i++) {
      var currentIdea = retrievedIdeas[i];
      var storedComments = [];
      var currentIdeasComments = currentIdea.comments;
      for (var k = 0; k < currentIdeasComments.length; k++) {
        var comment = new Comment(currentIdeasComments[k].ideaId, currentIdeasComments[k].content)
        storedComments.push(comment);
      }
      newIdea = new Idea(currentIdea.title, currentIdea.body, currentIdea.star, currentIdea.id, storedComments);
      ideas.push(newIdea);
    }
  }
  render(ideas);
}
function render(arrayToRender) {
    var markup = "";
    for (var i = 0; i < arrayToRender.length; i++) {
      var imageSource = getImageSourceFromIdea(arrayToRender[i]);
        markup += `
        <article class="idea" id="${i}">
          <div class="card-top-bar">
            <input type="image" class="card-top-button" id="favoriteButton" alt="Star favorite" src=${imageSource}>
            <input type="image" class="card-top-button" id="deleteButton" alt="Delete card" src="./images/delete.svg">
          </div>
          <div class="card-text">
            <h3>${arrayToRender[i].title}</h3>
            <p class="card-body">${arrayToRender[i].body}</p>
             <p class="comments-section" id="commentsSection">
              Comments:
              <ul>
                ${formatComments(arrayToRender[i].comments)}
              </ul>
            </p>
          </div>
          <div class="card-bottom-bar">
            <input type="image" class="comment-button" id="commentButton" alt="Add comment" src="./images/comment.svg">
            Comment
            <div class="hidden">
              <input class="comment-input inputs type="text" name="comment" value="">
              <button class="add-comment-button button" id="addCommentButton">Add Comment</button>
            </div>
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
function showSave () {
  if (title.value && body.value) {
    saveButton.classList.remove('disable-save');
  }
}
function favoriteIdea(event) {
  if (event.target.id === "favoriteButton") {
    var ideaIndex = event.target.closest("article").id;
    ideas[ideaIndex].updateIdea();
    render(ideas);
  }
}
function deleteIdea(event) {
  if (event.target.id === "deleteButton") {
    var ideaIndex = event.target.closest("article").id;
    ideas[ideaIndex].deleteFromStorage();
    ideas.splice(ideaIndex, 1);
    render(ideas);
  }
}
function commentIdea(event) {
  if (event.target.id === "commentButton") {
    var commentInputAndButton = event.target.nextElementSibling;
    commentInputAndButton.classList.remove("hidden");
  }
}
function addComment(event) {
  if (event.target.id === "addCommentButton") {
    var ideaIndex = event.target.closest("article").id;
    var commentInput = event.target.previousElementSibling.value;
    var newComment = new Comment(ideas[ideaIndex].id, commentInput);
    ideas[ideaIndex].storeComment(newComment)
    render(ideas);
  }
}
function formatComments(commentArray) {
  var commentMarkup = "";
  for (var i = 0; i < commentArray.length; i++) {
    commentMarkup += `<li>${commentArray[i].content}</li>`
  }
  return commentMarkup
}
function toggleStarredIdeas(event) {
  if (event.srcElement.innerText === "Show Starred Ideas") {
    toggleStarredIdeasButton.innerHTML = "Show All Ideas";
    var starredIdeas = [];
    //loop through each idea currently in data model
    //if it has a star, add to starredIdeas
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].star) {
        starredIdeas.push(ideas[i]);
      }
    }
    //add to favorited ideas array
    //render favorited ideas
    render(starredIdeas);
  } else {
    toggleStarredIdeasButton.innerHTML = "Show Starred Ideas";
    //render all ideas to page
    render(ideas);
  }
}
function filterIdeas() {
  var searchQuery = searchBar.value.toLowerCase();
  var matchingIdeas = [];
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].title.toLowerCase().includes(searchQuery) || ideas[i].body.toLowerCase().includes(searchQuery)) {
      matchingIdeas.push(ideas[i]);
    }
  }
  render(matchingIdeas);
}
