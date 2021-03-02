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

  newIdea.saveToStorage();
  ideas.push(newIdea);
  render(ideas);
  clearInputs();
  saveButton.classList.add('disable-save');
}

function renderPage() {
  //handles error on load for null array
  var storedIdeas = JSON.parse(localStorage.getItem("ideas"));
  if (storedIdeas) {
    for (var i = 0; i < storedIdeas.length; i++) {
      //returns array as an array of instances of the idea class
      newIdea = new Idea(storedIdeas[i].title, storedIdeas[i].body, storedIdeas[i].star, storedIdeas[i].id, storedIdeas[i].comments);
      ideas.push(newIdea);
    }
  }
  localStorage.setItem("ideas", JSON.stringify(ideas));
  render(ideas);
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
              <input class="comment-input inputs" id="commentInput" type="text" name="comment" value="">
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

// function showAddComment (event) {
//   //not queried, no event listeners
//   if (inputAddComment.value) {
//     var inputId = event.target.id;
//     var commentButtons = document.querySelectorAll(".add-comment-button");
//     for (var i = 0; i < commentButtons.length; i++) {
//       if (parseInt(inputId) === commentButtons[i].id) {
//         inputId.classList.remove('disable-save');
//       }
//     }
//   }
// }

function favoriteIdea(event) {
  if (event.target.id === "favoriteButton") {
    var ideaId = event.target.closest("article").id;

  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(ideaId) === ideas[i].id) {
      ideas[i].updateIdea();
      ideas[i].saveToStorage();
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
        ideas[i].deleteFromStorage();
        ideas.splice(i, 1);
      }
    }
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
    var ideaId = event.target.closest("article").id;
    var commentInput = event.target.previousElementSibling.value;
    var newComment = new Comment(ideaId, commentInput);
    newComment.saveToStorage();
    for (var i = 0; i < ideas.length; i++) {
      if (parseInt(ideaId) === ideas[i].id) {
        ideas[i].comments.push(commentInput)
      }
    }
    render(ideas);
  }
}

function formatComments(commentArray) {
  var commentMarkup = "";
  for (var i = 0; i < commentArray.length; i++) {
    commentMarkup += `<li>${commentArray[i]}</li>`
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
