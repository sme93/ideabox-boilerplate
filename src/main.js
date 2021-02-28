//****Global Variables ****
var newIdea;
//each time page refreshes, need to check local storage to populate ideas array with anything that was stored in there
var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
//ternary -- functions like an if statement. if (retrievedIdeas) is truthy and holds any value, then ideas is assigned to retrievedIdeas from local storage. if not, ideas is assigned to an empty array
var ideas = (retrievedIdeas)
// ? means if true then use retrievedIdeas
  ? retrievedIdeas
// : means if false, assign to empty array
  : [];





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
window.addEventListener("load", render(retrievedIdeas));



//**** Functions ****
function saveIdea(event) {
  event.preventDefault();
  if (!title.value || !body.value) {
    return
  }

  newIdea = new Idea(title.value, body.value, false, Date.now());
  // ideas.push(newIdea);
  // localStorage.setItem("ideas", JSON.stringify(ideas));
  newIdea.saveToStorage();
  render(ideas);
  clearInputs();
  saveButton.classList.add('disable-save');
}

function renderPage() {
  var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));

  var retrievedIdeasAsInstances = [];
  for (var i = 0; i < retrievedIdeas.length; i++) {
    newIdea = new Idea(retrievedIdeas[i].title, retrievedIdeas[i].body, retrievedIdeas[i].star, retrievedIdeas[i].id);
    retrievedIdeasAsInstances.push(newIdea);
  }
  render(retrievedIdeasAsInstances);
}

function render(arrayToRender) {
    var markup = "";

    for (var i = 0; i < arrayToRender.length; i++) {
      var imageSource = getImageSourceFromIdea(arrayToRender[i]);
        markup += `
        <article class="idea" id="${arrayToRender[i].id}">
          <div class="card-top-bar">
            <input type="image" class="card-top-button" id="favoriteButton" alt="Star favorite" src=${imageSource}>
            <input type="image" class="card-top-button" id="deleteButton" alt="Delete card" src="./images/delete.svg">
          </div>
          <div class="card-text">
            <h3>${arrayToRender[i].title}</h3>
            <p class="card-body">${arrayToRender[i].body}</p>
          </div>
          <div class="card-bottom-bar">
            <input type="image" class="comment-button" id="commentButton" alt="Add comment" src="./images/comment.svg">
            Comment
            <div class="hidden">
              <input class="comment-input inputs" id="commentInput" type="text" name="comment" value="">
              <button class="add-comment-button" id="addCommentButton">Add Comment</button>
              <p class="comments-section" id="commentsSection">${arrayToRender[i].comments}</p>
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
    var ideaId = event.target.closest("article").id;
    for (var i = 0; i < ideas.length; i++) {
      if (parseInt(ideaId) === ideas[i].id) {
        ideas[i].updateIdea();
      }
    }
    render(ideas);
  }
}

function deleteIdea(event) {
  if (event.target.id === "deleteButton") {
    var ideaId = event.target.closest("article").id;

    for (var i = 0; i < ideas.length; i++) {
      if (parseInt(ideaId) === ideas[i].id) {
        ideas.splice(i, 1);
      }
    }
    localStorage.setItem("ideas", JSON.stringify(ideas));
    render(ideas);
  }
}

function commentIdea(event) {
  if (event.target.id === "commentButton") {
    var commentInputAndButton = event.target.nextElementSibling;
    commentInputAndButton.classList.remove("hidden");
  }
}

function addComment() {
  if (event.target.id === "addCommentButton") {
    var ideaId = event.target.closest("article").id;
    var commentInput = event.target.previousElementSibling;
    var newComment = new Comment(ideaId, commentInput.value);

    for (var i = 0; i < ideas.length; i++) {
      if (parseInt(ideaId) === ideas[i].id) {
        ideas[i].comments += newComment.content;
      }
    }
    localStorage.setItem("ideas", JSON.stringify(ideas));
    render(ideas);
    //comments not rendering on browser, but storing with correct instance of idea class
  }
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
  // Get text in search box and convert to lowercase
  var searchQuery = searchBar.value.toLowerCase();
  var matchingIdeas = [];

  // Loop through each idea currently in the data model
  for (var i = 0; i < ideas.length; i++) {
    // Compare each idea's title and body to see if they include the text currently in search box
    // I'm converting all comparison values to lowercase so that search terms are not case-sensitive
    if (ideas[i].title.toLowerCase().includes(searchQuery) || ideas[i].body.toLowerCase().includes(searchQuery)) {
      // If an idea matches what is in the search box, add it to the "matchingIdeas" array
      matchingIdeas.push(ideas[i]);
    }
  }
  // Once the loop completes, render the matching ideas on the page
  render(matchingIdeas);
}
