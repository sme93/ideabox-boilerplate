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










//**** Functions **** 
function saveIdea() {
    event.preventDefault();
    newIdea = new Idea(title.value, body.value);
    ideas.push(newIdea);
    render();
}

function render() {
    var ideasToRender = "";

    for (var i = 0; i < ideas.length; i++) {
        ideasToRender += `
        <article class="idea">
          <div class="card-top-bar">
            <input type="image" class="card-top-button" id="favoriteButton" alt="Star favorite" src="./images/star-active.svg">
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

    ideaBoard.innerHTML = ideasToRender;
}
