var ideas = [];

var saveButton = document.querySelector("#saveIdeaButton");
var ideaBoard = document.querySelector("#ideaBoard");
var toggleStarredIdeasButton = document.querySelector("#showIdeasButton");
var searchBar = document.querySelector("#searchInput");
var title = document.querySelector("#titleInput");
var body = document.querySelector("#bodyInput");

saveButton.addEventListener("click", saveIdea);
ideaBoard.addEventListener("click", function(event) {
  if (event.target.id === "favoriteButton") { favoriteIdea(event) }
  if (event.target.id === "commentButton") { commentIdea(event) }
  if (event.target.id === "addCommentButton") { addComment(event) } 
  if (event.target.id === "deleteButton") { deleteIdea(event) } });
toggleStarredIdeasButton.addEventListener("click", toggleStarredIdeas);
searchBar.addEventListener("input", filterIdeas);
title.addEventListener("input", showSave);
body.addEventListener("input", showSave);
window.addEventListener("load", renderPage);

function saveIdea(event) {
  event.preventDefault();
  if (!title.value || !body.value) {
    return
  }
  var newIdea = new Idea(title.value, body.value, false, Date.now());
  newIdea.saveToStorage(newIdea);
  ideas.push(newIdea);
  render(ideas);
  clearInputs();
  saveButton.classList.add("disable-save");
}

function clearInputs() {
  title.value = null;
  body.value = null;
}

function favoriteIdea(event) {
  var ideaIndex = event.target.closest("article").id;
  ideas[ideaIndex].updateIdea();
  render(ideas);
}

function commentIdea(event) {
  var commentInputAndButton = event.target.nextElementSibling;
  commentInputAndButton.classList.remove("hidden");
}

function addComment(event) {
  var ideaIndex = event.target.closest("article").id;
  var commentInput = event.target.previousElementSibling.value;
  var newComment = new Comment(ideas[ideaIndex].id, commentInput);
  ideas[ideaIndex].storeComment(newComment)
  render(ideas);
}

function deleteIdea(event) {
  var ideaIndex = event.target.closest("article").id;
  ideas[ideaIndex].deleteFromStorage();
  ideas.splice(ideaIndex, 1);
  render(ideas);
}

function toggleStarredIdeas(event) {
  if (event.srcElement.innerText === "Show Starred Ideas") {
    toggleStarredIdeasButton.innerHTML = "Show All Ideas";
    var starredIdeas = [];
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].star) {
        starredIdeas.push(ideas[i]);
      }
    }
    render(starredIdeas);
  } else {
    toggleStarredIdeasButton.innerHTML = "Show Starred Ideas";
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

function showSave () {
  if (title.value && body.value) {
    saveButton.classList.remove("disable-save");
  }
}

function getCommentsFromIdea(ideaComments) {
  var comments = [];
  for (var i = 0; i < ideaComments.length; i++) {
    var comment = new Comment(ideaComments[i].ideaId, ideaComments[i].content)
    comments.push(comment);
  }
  return comments;
}

function renderPage() {
  var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
  if (retrievedIdeas) {
    for (var i = 0; i < retrievedIdeas.length; i++) {
      var currentIdea = retrievedIdeas[i];
      var storedComments = getCommentsFromIdea(currentIdea.comments);
      var newIdea = new Idea(currentIdea.title, currentIdea.body, currentIdea.star, currentIdea.id, storedComments);
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
    return "./images/star.svg";
  } else {
    return "./images/star-active.svg";
  }
}

function formatComments(commentArray) {
  var commentMarkup = "";
  for (var i = 0; i < commentArray.length; i++) {
    commentMarkup += `<li>${commentArray[i].content}</li>`
  }
  return commentMarkup;
}
