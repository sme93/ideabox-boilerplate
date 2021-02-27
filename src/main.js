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
ideaBoard.addEventListener("click", favoriteIdea);

toggleStarredIdeasButton.addEventListener("click", toggleStarredIdeas);
window.addEventListener("load", renderPage);



//**** Functions ****
function saveIdea(event) {
  event.preventDefault();
  if (!title.value || !body.value) {
    return
  }
  newIdea = new Idea(title.value, body.value);
  ideas.push(newIdea);
  //store ideas array as a string in local storage
  localStorage.setItem("ideas", JSON.stringify(ideas));
  render(ideas);
  clearInputs();
  saveButton.classList.add('disable-save');
}

function renderPage() {
  //get stringified ideas out of local storage and assign to variable retrievedIdeas
  //need to do this each time we render in case there were any new saved ideas or deleted ideas during current browswer session
  var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
  render(retrievedIdeas);
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
        ideas[i].star = !ideas[i].star;
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
