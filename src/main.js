//****Global Variables ****
var newIdea;
var ideas = [];





// **** querySelectors ****
var saveButton = document.querySelector("#saveIdeaButton");
var title = document.querySelector("#titleInput");
var body = document.querySelector("#bodyInput");
var ideaBoard = document.querySelector("#ideaBoard");



//**** Event Listeners ****
saveButton.addEventListener("click", saveIdea);
title.addEventListener("input", showSave);
body.addEventListener("input", showSave);




//**** Functions ****
function saveIdea(event) {
  event.preventDefault();
  if (!title.value || !body.value) {
    return
  }
  newIdea = new Idea(title.value, body.value);
  ideas.push(newIdea);
  localStorage.setItem("ideas", JSON.stringify(ideas));
  render();
  clearInputs();
  saveButton.classList.add('disable-save');
}

function render() {
    var markup = "";
    var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));

    for (var i = 0; i < retrievedIdeas.length; i++) {
        markup += `
        <article class="idea">
          <div class="card-top-bar">
            <input type="image" class="card-top-button" id="favoriteButton" alt="Star favorite" src="./images/star-active.svg">
            <input type="image" class="card-top-button" id="deleteButton" alt="Delete card" src="./images/delete.svg">
          </div>
          <div class="card-text">
            <h3>${retrievedIdeas[i].title}</h3>
            <p class="card-body">${retrievedIdeas[i].body}</p>
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

function clearInputs() {
  title.value = null;
  body.value = null;
}

function showSave () {
  if (title.value && body.value) {
    saveButton.classList.remove('disable-save');
  }
}
